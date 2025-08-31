
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Shield, 
  Clock, 
  Lock, 
  Leaf,
  TrendingUp,
  Users,
  Globe,
  Zap
} from 'lucide-react';

const ImpactSection = () => {
  const impactMetrics = [
    {
      icon: <Shield className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Transparency",
      description: "100% transparent subsidy allocation and disbursement",
      metric: "99.9%",
      label: "Audit Success Rate"
    },
    {
      icon: <Clock className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Speed",
      description: "Automated milestone verification and instant payments",
      metric: "10x",
      label: "Faster Processing"
    },
    {
      icon: <Lock className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Fraud Prevention",
      description: "Immutable blockchain records prevent manipulation",
      metric: "$0",
      label: "Fraudulent Claims"
    },
    {
      icon: <Leaf className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Green Hydrogen Growth",
      description: "Accelerating clean energy transition worldwide",
      metric: "147",
      label: "Active Projects"
    }
  ];

  const globalStats = [
    { label: "Countries Using Platform", value: "12", icon: <Globe className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { label: "Carbon Emissions Reduced", value: "2.3M tons", icon: <Leaf className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { label: "Jobs Created", value: "8,500+", icon: <Users className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { label: "Energy Generated", value: "1.2 TWh", icon: <Zap className="h-4 w-4 sm:h-5 sm:w-5" /> }
  ];

  return (
    <section id="impact" className="py-12 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="section-header">Platform Impact</h2>
        
        {/* Main Impact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {impactMetrics.map((item, index) => (
            <Card key={index} className="glass-card hover-glow group">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="text-primary-green mb-3 sm:mb-4 flex justify-center group-hover:animate-pulse">
                  {item.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{item.description}</p>
                <div className="space-y-1">
                  <div className="text-xl sm:text-2xl font-bold text-primary-green">{item.metric}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Global Impact Stats */}
        <Card className="glass-card mb-8 sm:mb-12">
          <CardHeader>
            <CardTitle className="text-foreground text-center text-base sm:text-lg">Global Impact Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {globalStats.map((stat, index) => (
                <div key={index} className="text-center p-3 sm:p-4 glass-card hover-glow">
                  <div className="text-primary-green mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-primary-green mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <Card className="glass-card hover-glow">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-neon-green" />
                <span>For Governments</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-neon-green rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-foreground">Reduced Administrative Burden</h4>
                  <p className="text-sm text-muted-foreground">Automated verification and disbursement cuts processing time by 90%</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-neon-green rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-foreground">Enhanced Accountability</h4>
                  <p className="text-sm text-muted-foreground">Real-time tracking of fund utilization and project progress</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-neon-green rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-foreground">Policy Impact Analysis</h4>
                  <p className="text-sm text-muted-foreground">Data-driven insights for better policy decisions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover-glow">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center space-x-2">
                <Users className="h-5 w-5 text-neon-green" />
                <span>For Producers</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-neon-green rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-foreground">Faster Fund Access</h4>
                  <p className="text-sm text-muted-foreground">Immediate subsidy release upon milestone completion</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-neon-green rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-foreground">Clear Milestone Tracking</h4>
                  <p className="text-sm text-muted-foreground">Transparent progress monitoring and requirements</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-neon-green rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-foreground">Reduced Compliance Costs</h4>
                  <p className="text-sm text-muted-foreground">Automated compliance checking and reporting</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
