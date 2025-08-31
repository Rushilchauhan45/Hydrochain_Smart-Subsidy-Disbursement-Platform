import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  Clock, 
  CheckCircle, 
  ExternalLink, 
  Hash, 
  TrendingUp,
  DollarSign,
  FileText,
  PlayCircle,
  Wallet
} from 'lucide-react';
import { useWeb3 } from '@/contexts/Web3Context';
import { useToast } from '@/components/ui/use-toast';
import WalletConnection from './WalletConnection';

const BlockchainDashboard = () => {
  const { 
    isConnected, 
    transactions, 
    contracts, 
    deployContract, 
    executeTransaction 
  } = useWeb3();
  const { toast } = useToast();
  const [isDeploying, setIsDeploying] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleDeployContract = async () => {
    setIsDeploying(true);
    try {
      const address = await deployContract('SubsidyContract', 'New Hydrogen Project');
      toast({
        title: "Contract Deployment Started",
        description: `Contract deploying to ${address.slice(0, 10)}...`,
      });
    } catch (error) {
      toast({
        title: "Deployment Failed",
        description: "Failed to deploy smart contract",
        variant: "destructive"
      });
    } finally {
      setIsDeploying(false);
    }
  };

  const handleReleaseFunds = async () => {
    setIsExecuting(true);
    try {
      const txHash = await executeTransaction(
        'subsidy_release', 
        'Emergency subsidy release for milestone completion',
        '150000'
      );
      toast({
        title: "Transaction Submitted",
        description: `Transaction hash: ${txHash.slice(0, 10)}...`,
      });
    } catch (error) {
      toast({
        title: "Transaction Failed",
        description: "Failed to execute transaction",
        variant: "destructive"
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500 animate-spin" />;
      case 'failed':
        return <ExternalLink className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500 text-white';
      case 'pending': return 'bg-yellow-500 text-black';
      case 'failed': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const formatValue = (value: string) => {
    if (value === '0') return '0 ETH';
    return `${(parseInt(value) / 1000).toFixed(0)}K USDC`;
  };

  if (!isConnected) {
    return (
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="section-header">Blockchain Dashboard</h2>
          <div className="max-w-md mx-auto">
            <WalletConnection />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="section-header">Blockchain Dashboard</h2>
        
        {/* Wallet Connection Card */}
        <div className="mb-8">
          <WalletConnection />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <Card className="glass-card hover-glow">
            <CardContent className="p-4 text-center">
              <Zap className="h-8 w-8 text-primary-green mx-auto mb-2" />
              <Button 
                onClick={handleDeployContract}
                disabled={isDeploying}
                className="w-full btn-primary text-sm"
              >
                {isDeploying ? 'Deploying...' : 'Deploy Contract'}
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card hover-glow">
            <CardContent className="p-4 text-center">
              <DollarSign className="h-8 w-8 text-primary-green mx-auto mb-2" />
              <Button 
                onClick={handleReleaseFunds}
                disabled={isExecuting}
                className="w-full btn-primary text-sm"
              >
                {isExecuting ? 'Processing...' : 'Release Funds'}
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card hover-glow">
            <CardContent className="p-4 text-center">
              <FileText className="h-8 w-8 text-primary-green mx-auto mb-2" />
              <div className="text-lg font-bold text-primary-green">{contracts.length}</div>
              <div className="text-xs text-muted-foreground">Active Contracts</div>
            </CardContent>
          </Card>

          <Card className="glass-card hover-glow">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-primary-green mx-auto mb-2" />
              <div className="text-lg font-bold text-primary-green">{transactions.length}</div>
              <div className="text-xs text-muted-foreground">Total Transactions</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Smart Contracts */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center space-x-2">
                <Zap className="h-5 w-5 text-primary-green" />
                <span>Smart Contracts</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contracts.map((contract, index) => (
                <div key={index} className="p-4 border border-border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground text-sm">{contract.name}</h4>
                    <Badge className={getStatusColor(contract.status)}>
                      {contract.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Hash className="h-3 w-3 text-muted-foreground" />
                      <code className="text-xs font-mono text-muted-foreground">
                        {contract.address}
                      </code>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Balance: {formatValue(contract.balance)}</span>
                      <span>Deployed: {contract.deployedAt.toLocaleDateString()}</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`https://etherscan.io/address/${contract.address}`, '_blank')}
                    className="w-full text-xs"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View on Explorer
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary-green" />
                <span>Recent Transactions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {transactions.slice(0, 5).map((tx, index) => (
                <div key={index} className="p-4 border border-border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(tx.status)}
                      <span className="text-sm font-medium text-foreground">
                        {tx.type.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {formatValue(tx.value)}
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground">{tx.description}</p>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Hash className="h-3 w-3 text-muted-foreground" />
                      <code className="text-xs font-mono text-muted-foreground truncate">
                        {tx.hash}
                      </code>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{tx.timestamp.toLocaleTimeString()}</span>
                      {tx.blockNumber && <span>Block #{tx.blockNumber}</span>}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`https://etherscan.io/tx/${tx.hash}`, '_blank')}
                    className="w-full text-xs"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View Transaction
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Blockchain Stats */}
        <Card className="glass-card mt-8">
          <CardHeader>
            <CardTitle className="text-foreground">Live Blockchain Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-primary-green">2.3M</div>
                <div className="text-xs text-muted-foreground">Total Gas Saved</div>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-primary-green">99.9%</div>
                <div className="text-xs text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-primary-green">15s</div>
                <div className="text-xs text-muted-foreground">Avg Block Time</div>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-primary-green">$0.02</div>
                <div className="text-xs text-muted-foreground">Avg Gas Fee</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BlockchainDashboard;
