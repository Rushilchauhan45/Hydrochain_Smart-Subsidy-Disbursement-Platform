
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  Hash, 
  Calendar,
  DollarSign,
  Zap,
  Shield,
  ExternalLink,
  Wallet
} from 'lucide-react';
import { useWeb3 } from '@/contexts/Web3Context';

const SmartContractVisualization = () => {
  const [selectedContract, setSelectedContract] = useState(0);
  const { contracts: web3Contracts, isConnected, connectWallet } = useWeb3();

  const mockContracts = [
    {
      id: 1,
      name: "HydroPower Station Alpha",
      address: "0x742d35Cc2e4e3B6B81F22c7B6b2e",
      status: "Active",
      totalSubsidy: "$2M",
      releasedAmount: "$1.2M",
      milestones: [
        { 
          id: 1, 
          title: "Site Preparation", 
          status: "completed", 
          amount: "$400K",
          timestamp: "2024-03-15 14:30",
          txHash: "0x1a2b3c4d...ef56",
          blockNumber: 18942156
        },
        { 
          id: 2, 
          title: "Equipment Installation", 
          status: "completed", 
          amount: "$600K",
          timestamp: "2024-06-22 09:15",
          txHash: "0x7g8h9i0j...kl12",
          blockNumber: 19123789
        },
        { 
          id: 3, 
          title: "Initial Production", 
          status: "completed", 
          amount: "$200K",
          timestamp: "2024-08-10 16:45",
          txHash: "0x3m4n5o6p...qr78",
          blockNumber: 19245632
        },
        { 
          id: 4, 
          title: "Full Operation", 
          status: "pending", 
          amount: "$800K",
          timestamp: "Expected: 2024-12-01",
          txHash: "Pending...",
          blockNumber: null
        }
      ]
    },
    {
      id: 2,
      name: "GreenH2 Manufacturing Hub",
      address: "0x8c3f42Aa1e7F9B5C92D11e6F89",
      status: "Active",
      totalSubsidy: "$1.5M",
      releasedAmount: "$750K",
      milestones: [
        { 
          id: 1, 
          title: "Site Preparation", 
          status: "completed", 
          amount: "$300K",
          timestamp: "2024-04-20 11:20",
          txHash: "0x9s8t7u6v...wx45",
          blockNumber: 19045123
        },
        { 
          id: 2, 
          title: "Equipment Installation", 
          status: "completed", 
          amount: "$450K",
          timestamp: "2024-07-18 14:30",
          txHash: "0x5y4z3a2b...cd89",
          blockNumber: 19167894
        },
        { 
          id: 3, 
          title: "Initial Production", 
          status: "in-progress", 
          amount: "$400K",
          timestamp: "In progress...",
          txHash: "Pending...",
          blockNumber: null
        },
        { 
          id: 4, 
          title: "Full Operation", 
          status: "pending", 
          amount: "$350K",
          timestamp: "Expected: 2025-02-15",
          txHash: "Pending...",
          blockNumber: null
        }
      ]
    }
  ];

  // Use Web3 contracts if connected, otherwise use mock data
  const contracts = isConnected && web3Contracts.length > 0 ? 
    web3Contracts.map(contract => ({
      id: 1,
      name: contract.name,
      address: contract.address,
      status: "Active",
      totalSubsidy: `$${(parseInt(contract.balance) / 1000).toFixed(0)}K`,
      releasedAmount: `$${(parseInt(contract.balance) * 0.6 / 1000).toFixed(0)}K`,
      milestones: [
        { 
          id: 1, 
          title: "Site Preparation", 
          status: "completed", 
          amount: `$${(parseInt(contract.balance) * 0.2 / 1000).toFixed(0)}K`,
          timestamp: contract.deployedAt.toLocaleString(),
          txHash: contract.address.slice(0, 20) + "...ef56",
          blockNumber: 18942156
        },
        { 
          id: 2, 
          title: "Equipment Installation", 
          status: "completed", 
          amount: `$${(parseInt(contract.balance) * 0.3 / 1000).toFixed(0)}K`,
          timestamp: new Date().toLocaleString(),
          txHash: contract.address.slice(0, 20) + "...kl12",
          blockNumber: 19123789
        },
        { 
          id: 3, 
          title: "Initial Production", 
          status: "in-progress", 
          amount: `$${(parseInt(contract.balance) * 0.3 / 1000).toFixed(0)}K`,
          timestamp: "In progress...",
          txHash: "Pending...",
          blockNumber: null
        },
        { 
          id: 4, 
          title: "Full Operation", 
          status: "pending", 
          amount: `$${(parseInt(contract.balance) * 0.2 / 1000).toFixed(0)}K`,
          timestamp: "Expected: 2025-02-01",
          txHash: "Pending...",
          blockNumber: null
        }
      ]
    })) : mockContracts;

  const currentContract = contracts[selectedContract];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-primary-green text-primary-foreground';
      case 'in-progress': return 'bg-blue-500 text-white';
      case 'pending': return 'border-muted-foreground text-muted-foreground';
      default: return 'border-muted-foreground text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4 animate-spin" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <section id="smart-contracts" className="py-12 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="section-header">Smart Contract Visualization</h2>
        
        {!isConnected && (
          <div className="text-center mb-8">
            <Card className="glass-card max-w-md mx-auto">
              <CardContent className="p-6">
                <Wallet className="h-12 w-12 text-primary-green mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Connect for Live Data</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect your wallet to see real blockchain contracts
                </p>
                <Button onClick={connectWallet} className="btn-primary">
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Contract Selector */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6 sm:mb-8">
          {contracts.map((contract, index) => (
            <Button
              key={index}
              variant={selectedContract === index ? "default" : "outline"}
              onClick={() => setSelectedContract(index)}
              className={`w-full sm:w-auto ${selectedContract === index ? 
                "bg-primary-green text-primary-foreground" : 
                "border-primary-green text-primary-green hover:bg-primary-green hover:text-primary-foreground"
              }`}
            >
              {contract.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Contract Overview */}
          <Card className="glass-card hover-glow">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary-green" />
                <span className="text-sm sm:text-base">Contract Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Contract Name</label>
                <div className="text-foreground font-medium text-sm sm:text-base">{currentContract.name}</div>
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground">Address</label>
                <div className="text-xs font-mono text-primary-green flex items-center space-x-1 break-all">
                  <Hash className="h-3 w-3 flex-shrink-0" />
                  <span>{currentContract.address}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Total Subsidy</label>
                  <div className="text-base sm:text-lg font-bold text-primary-green">{currentContract.totalSubsidy}</div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Released</label>
                  <div className="text-base sm:text-lg font-bold text-primary-green">{currentContract.releasedAmount}</div>
                </div>
              </div>
              
              <Badge className="w-full justify-center bg-primary-green text-primary-foreground">
                <Zap className="h-3 w-3 mr-1" />
                {currentContract.status}
              </Badge>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="lg:col-span-2 glass-card">
            <CardHeader>
              <CardTitle className="text-foreground">Milestone Timeline & Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {currentContract.milestones.map((milestone, index) => (
                  <div key={milestone.id} className="relative">
                    {/* Timeline Line */}
                    {index < currentContract.milestones.length - 1 && (
                      <div className="absolute left-6 top-12 w-px h-16 bg-border"></div>
                    )}
                    
                    <div className="flex items-start space-x-4">
                      {/* Timeline Dot */}
                      <div className={`
                        w-12 h-12 rounded-full border-2 flex items-center justify-center
                        ${milestone.status === 'completed' ? 'bg-neon-green border-neon-green' : 
                          milestone.status === 'in-progress' ? 'bg-cyber-blue border-cyber-blue' : 
                          'border-muted-foreground'}
                      `}>
                        {getStatusIcon(milestone.status)}
                      </div>
                      
                      {/* Milestone Content */}
                      <div className="flex-1 min-w-0">
                        <Card className="glass-card hover-glow">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-foreground">{milestone.title}</h4>
                              <Badge 
                                variant="outline" 
                                className={getStatusColor(milestone.status)}
                              >
                                {milestone.status}
                              </Badge>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <DollarSign className="h-3 w-3 text-neon-green" />
                                  <span className="text-neon-green font-medium">{milestone.amount}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  <span>{milestone.timestamp}</span>
                                </div>
                              </div>
                              
                              <div className="space-y-1">
                                <div className="text-muted-foreground">Transaction Hash:</div>
                                <div className="font-mono text-xs text-neon-green break-all">
                                  {milestone.txHash}
                                </div>
                                {milestone.blockNumber && (
                                  <div className="text-muted-foreground text-xs">
                                    Block: #{milestone.blockNumber}
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SmartContractVisualization;
