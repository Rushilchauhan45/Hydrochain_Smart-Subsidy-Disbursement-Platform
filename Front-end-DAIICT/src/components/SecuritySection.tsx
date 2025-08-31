
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Lock, 
  Key, 
  Database,
  Server,
  Smartphone,
  ArrowRight,
  CheckCircle,
  Zap
} from 'lucide-react';

const SecuritySection = () => {
  const securityFeatures = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Blockchain Immutability",
      description: "All transactions recorded on immutable blockchain ledger",
      tech: "Ethereum + Polygon"
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "End-to-End Encryption",
      description: "AES-256 encryption for all sensitive data transmission",
      tech: "AES-256 + TLS 1.3"
    },
    {
      icon: <Key className="h-8 w-8" />,
      title: "Multi-Signature Security",
      description: "Multi-party approval required for large transactions",
      tech: "MultiSig Wallets"
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Decentralized Storage",
      description: "Distributed data storage across multiple nodes",
      tech: "IPFS + Filecoin"
    }
  ];

  const techStack = [
    { category: "Blockchain", items: ["Ethereum", "Polygon", "Chainlink Oracles"] },
    { category: "Smart Contracts", items: ["Solidity", "OpenZeppelin", "Hardhat"] },
    { category: "Backend", items: ["Node.js", "GraphQL", "PostgreSQL"] },
    { category: "Frontend", items: ["React", "TypeScript", "Web3.js"] },
    { category: "Security", items: ["Multi-Sig", "Hardware Security Modules", "Zero-Knowledge Proofs"] }
  ];

  const dataFlow = [
    { step: "Government", icon: <Server className="h-6 w-6" />, description: "Initiates subsidy program" },
    { step: "Smart Contract", icon: <Zap className="h-6 w-6" />, description: "Deploys automated rules" },
    { step: "Producers", icon: <Smartphone className="h-6 w-6" />, description: "Submit milestone proofs" },
    { step: "Banks", icon: <Database className="h-6 w-6" />, description: "Receive payment instructions" }
  ];

  return (
    <section id="security" className="py-12 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="section-header">Security & Technology</h2>
        
        {/* Security Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {securityFeatures.map((feature, index) => (
            <Card key={index} className="glass-card hover-glow group">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="text-neon-green mb-3 sm:mb-4 flex justify-center group-hover:animate-pulse">
                  {feature.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{feature.description}</p>
                <Badge className="bg-neon-green/20 text-neon-green border-neon-green text-xs">
                  {feature.tech}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Data Flow Diagram */}
        <Card className="glass-card mb-8 sm:mb-12">
          <CardHeader>
            <CardTitle className="text-foreground text-center text-base sm:text-lg">System Architecture Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4">
              {dataFlow.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center space-y-2 p-3 sm:p-4 glass-card hover-glow min-w-[120px] sm:min-w-[140px] w-full sm:w-auto">
                    <div className="text-neon-green">
                      {item.icon}
                    </div>
                    <h4 className="font-medium text-foreground text-center text-sm sm:text-base">{item.step}</h4>
                    <p className="text-xs text-muted-foreground text-center">{item.description}</p>
                  </div>
                  
                  {index < dataFlow.length - 1 && (
                    <div className="text-neon-green hidden sm:block">
                      <ArrowRight className="h-4 w-4 sm:h-6 sm:w-6" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-foreground text-base sm:text-lg">Technology Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {techStack.map((stack, index) => (
                <div key={index} className="space-y-3">
                  <h4 className="font-semibold text-neon-green flex items-center space-x-2 text-sm sm:text-base">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{stack.category}</span>
                  </h4>
                  <div className="space-y-2">
                    {stack.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-neon-green rounded-full flex-shrink-0"></div>
                        <span className="text-xs sm:text-sm text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Certifications */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
          <Card className="glass-card hover-glow text-center">
            <CardContent className="p-4 sm:p-6">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-neon-green mx-auto mb-2 sm:mb-3" />
              <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">SOC 2 Compliant</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">Audited security controls</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card hover-glow text-center">
            <CardContent className="p-4 sm:p-6">
              <Lock className="h-6 w-6 sm:h-8 sm:w-8 text-neon-green mx-auto mb-2 sm:mb-3" />
              <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">ISO 27001</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">Information security management</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card hover-glow text-center">
            <CardContent className="p-4 sm:p-6">
              <Key className="h-6 w-6 sm:h-8 sm:w-8 text-neon-green mx-auto mb-2 sm:mb-3" />
              <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Smart Contract Audits</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">Verified by leading security firms</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
