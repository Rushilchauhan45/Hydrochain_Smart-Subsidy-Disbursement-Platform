import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  LogOut, 
  Copy, 
  ExternalLink, 
  Zap, 
  Shield,
  Network,
  Coins
} from 'lucide-react';
import { useWeb3 } from '@/contexts/Web3Context';
import { useToast } from '@/components/ui/use-toast';

const WalletConnection = () => {
  const { 
    account, 
    chainId, 
    isConnected, 
    isConnecting, 
    balance, 
    connectWallet, 
    disconnectWallet,
    switchNetwork 
  } = useWeb3();
  const { toast } = useToast();

  const getNetworkName = (chainId: number | null) => {
    switch (chainId) {
      case 1: return 'Ethereum Mainnet';
      case 11155111: return 'Sepolia Testnet';
      case 137: return 'Polygon Mainnet';
      case 80001: return 'Mumbai Testnet';
      default: return 'Unknown Network';
    }
  };

  const getNetworkColor = (chainId: number | null) => {
    switch (chainId) {
      case 1: return 'bg-blue-500';
      case 11155111: return 'bg-purple-500';
      case 137: return 'bg-violet-500';
      case 80001: return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const handleSwitchToPolygon = () => {
    switchNetwork(80001); // Mumbai testnet
    toast({
      title: "Network Switch",
      description: "Switching to Polygon Mumbai testnet...",
    });
  };

  if (!isConnected) {
    return (
      <Card className="glass-card">
        <CardContent className="p-6 text-center">
          <Wallet className="h-12 w-12 text-primary-green mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Connect Your Wallet
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Connect your wallet to interact with blockchain features
          </p>
          <Button 
            onClick={connectWallet} 
            disabled={isConnecting}
            className="btn-primary w-full"
          >
            {isConnecting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="mr-2 h-4 w-4" />
                Connect MetaMask
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            Make sure you have MetaMask installed
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-foreground flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary-green" />
            <span>Wallet Connected</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={disconnectWallet}
            className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Wallet Address */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Wallet Address</label>
          <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
            <code className="text-sm font-mono text-foreground flex-1 truncate">
              {account}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyAddress}
              className="h-8 w-8 p-0"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Network Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Network</label>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${getNetworkColor(chainId)}`}></div>
              <span className="text-sm text-foreground">{getNetworkName(chainId)}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Balance</label>
            <div className="flex items-center space-x-1">
              <Coins className="h-4 w-4 text-primary-green" />
              <span className="text-sm font-medium text-foreground">{balance} ETH</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSwitchToPolygon}
            className="flex-1 text-xs"
          >
            <Network className="h-3 w-3 mr-1" />
            Switch to Polygon
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(`https://etherscan.io/address/${account}`, '_blank')}
            className="flex-1 text-xs"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            View on Explorer
          </Button>
        </div>

        {/* Connection Status */}
        <div className="flex items-center justify-center space-x-2 pt-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground">Connected & Ready</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletConnection;
