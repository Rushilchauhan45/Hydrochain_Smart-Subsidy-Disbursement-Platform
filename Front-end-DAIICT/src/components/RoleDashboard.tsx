import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Building, 
  Factory, 
  Shield, 
  TrendingUp, 
  Users, 
  DollarSign,
  CheckCircle,
  Clock,
  FileText,
  Banknote
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const RoleDashboard = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return (
      <div className="pt-20 sm:pt-24 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <Card className="glass-card">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Please login to access your dashboard</h2>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const getRoleInfo = () => {
    switch (currentUser.role) {
      case 'government':
        return {
          title: 'Government Dashboard',
          description: 'Monitor subsidy allocation and project oversight',
          icon: <Building className="h-8 w-8 text-blue-500" />,
          color: 'border-blue-500'
        };
      case 'producer':
        return {
          title: 'Producer Dashboard', 
          description: 'Track your project milestones and subsidy status',
          icon: <Factory className="h-8 w-8 text-green-500" />,
          color: 'border-green-500'
        };
      case 'auditor':
        return {
          title: 'Auditor Dashboard',
          description: 'Verify project compliance and milestone completion',
          icon: <Shield className="h-8 w-8 text-purple-500" />,
          color: 'border-purple-500'
        };
      case 'bank':
        return {
          title: 'Bank Dashboard',
          description: 'Manage subsidy disbursements and financial oversight', 
          icon: <Banknote className="h-8 w-8 text-yellow-500" />,
          color: 'border-yellow-500'
        };
      default:
        return {
          title: 'User Dashboard',
          description: 'Welcome to Hydrochain Platform',
          icon: <Users className="h-8 w-8 text-primary-green" />,
          color: 'border-primary-green'
        };
    }
  };

  const roleInfo = getRoleInfo();

  const renderGovernmentDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="glass-card hover-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Allocated</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-blue-500">$2.5B</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Building className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-blue-500">247</div>
            <p className="text-xs text-muted-foreground">+18 new this month</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-blue-500">94.5%</div>
            <p className="text-xs text-muted-foreground">+2.1% improvement</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Updates Section */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Recent Policy Updates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 bg-surface-elevated rounded-lg">
              <div className="flex-1">
                <p className="font-medium">New Renewable Energy Incentives</p>
                <p className="text-sm text-muted-foreground">Updated subsidy rates for solar and hydro projects</p>
              </div>
              <Badge variant="outline">Active</Badge>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 bg-surface-elevated rounded-lg">
              <div className="flex-1">
                <p className="font-medium">Environmental Compliance Standards</p>
                <p className="text-sm text-muted-foreground">Enhanced monitoring requirements</p>
              </div>
              <Badge variant="outline">Pending</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProducerDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="glass-card hover-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Project Status</CardTitle>
            <Factory className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-green-500">Active</div>
            <p className="text-xs text-muted-foreground">Hydro Power Station Alpha</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subsidy Received</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-green-500">$1.2M</div>
            <p className="text-xs text-muted-foreground">65% of total allocation</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Milestone</CardTitle>
            <Clock className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-green-500">15 days</div>
            <p className="text-xs text-muted-foreground">Equipment testing phase</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Project Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { title: 'Site Preparation', progress: 100, status: 'completed' },
              { title: 'Equipment Installation', progress: 85, status: 'in-progress' },
              { title: 'Initial Production', progress: 30, status: 'in-progress' },
              { title: 'Full Operation', progress: 0, status: 'pending' }
            ].map((milestone, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{milestone.title}</span>
                  <Badge variant={milestone.status === 'completed' ? 'default' : 'outline'}>
                    {milestone.status}
                  </Badge>
                </div>
                <Progress value={milestone.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAuditorDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="glass-card hover-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <FileText className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-purple-500">12</div>
            <p className="text-xs text-muted-foreground">3 high priority</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Audits</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-purple-500">89</div>
            <p className="text-xs text-muted-foreground">This quarter</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <Shield className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">97.2%</div>
            <p className="text-xs text-muted-foreground">Above target</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Recent Audit Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { project: 'Solar Farm Beta', action: 'Milestone Verified', time: '2 hours ago', status: 'approved' },
              { project: 'Wind Project Gamma', action: 'Compliance Check', time: '1 day ago', status: 'under-review' },
              { project: 'Hydro Station Alpha', action: 'Final Inspection', time: '2 days ago', status: 'approved' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-surface-elevated rounded-lg">
                <div>
                  <p className="font-medium">{activity.project}</p>
                  <p className="text-sm text-muted-foreground">{activity.action} • {activity.time}</p>
                </div>
                <Badge variant={activity.status === 'approved' ? 'default' : 'outline'}>
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBankDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="glass-card hover-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Disbursed</CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-yellow-500">$1.8B</div>
            <p className="text-xs text-muted-foreground">72% of allocated funds</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Transfers</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-yellow-500">8</div>
            <p className="text-xs text-muted-foreground">$45M in queue</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-yellow-500">99.8%</div>
            <p className="text-xs text-muted-foreground">Transaction success</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { recipient: 'Hydro Power Station Alpha', amount: '$500K', time: '1 hour ago', status: 'completed' },
              { recipient: 'Solar Farm Beta', amount: '$750K', time: '4 hours ago', status: 'completed' },
              { recipient: 'Wind Project Gamma', amount: '$300K', time: '1 day ago', status: 'pending' }
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-surface-elevated rounded-lg">
                <div>
                  <p className="font-medium">{transaction.recipient}</p>
                  <p className="text-sm text-muted-foreground">{transaction.amount} • {transaction.time}</p>
                </div>
                <Badge variant={transaction.status === 'completed' ? 'default' : 'outline'}>
                  {transaction.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDashboardContent = () => {
    switch (currentUser.role) {
      case 'government':
        return renderGovernmentDashboard();
      case 'producer':
        return renderProducerDashboard();
      case 'auditor':
        return renderAuditorDashboard();
      case 'bank':
        return renderBankDashboard();
      default:
        return (
          <Card className="glass-card">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold mb-4">Welcome to Hydrochain!</h3>
              <p className="text-muted-foreground">Your dashboard will be customized based on your role.</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="pt-20 sm:pt-24 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className={`mb-8 p-6 rounded-lg border-2 ${roleInfo.color} bg-surface-elevated`}>
          <div className="flex items-center gap-4">
            {roleInfo.icon}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{roleInfo.title}</h1>
              <p className="text-muted-foreground">{roleInfo.description}</p>
              <div className="mt-2">
                <Badge variant="outline">
                  Welcome, {currentUser.fullName}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="space-y-6">
          {renderDashboardContent()}
        </div>
      </div>
    </div>
  );
};

export default RoleDashboard;
