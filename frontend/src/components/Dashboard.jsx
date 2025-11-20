import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Users,
  Package,
  AlertTriangle
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Today\'s Sales',
      value: '฿12,450',
      change: '+12%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Orders',
      value: '89',
      change: '+8%',
      icon: ShoppingBag,
      color: 'text-blue-600'
    },
    {
      title: 'Customers',
      value: '156',
      change: '+15%',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Low Stock Items',
      value: '7',
      change: '-2',
      icon: AlertTriangle,
      color: 'text-red-600'
    }
  ];

  const recentOrders = [
    { id: '#001', table: 'Table 5', amount: '฿450', status: 'Completed', time: '14:30' },
    { id: '#002', table: 'Table 2', amount: '฿320', status: 'Preparing', time: '14:25' },
    { id: '#003', table: 'Table 8', amount: '฿680', status: 'Served', time: '14:20' },
    { id: '#004', table: 'Table 1', amount: '฿290', status: 'Completed', time: '14:15' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome to Restaurant POS Back Office System</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.color} flex items-center mt-1`}>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change} from yesterday
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div>
                      <p className="font-medium">{order.id} - {order.table}</p>
                      <p className="text-sm text-muted-foreground">{order.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.amount}</p>
                    <p className={`text-xs ${
                      order.status === 'Completed' ? 'text-green-600' :
                      order.status === 'Preparing' ? 'text-yellow-600' :
                      'text-blue-600'
                    }`}>
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                <Package className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Check Inventory</span>
              </button>
              <button className="p-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors">
                <Users className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Staff Schedule</span>
              </button>
              <button className="p-4 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors">
                <TrendingUp className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Sales Report</span>
              </button>
              <button className="p-4 bg-muted text-muted-foreground rounded-lg hover:bg-muted/90 transition-colors">
                <DollarSign className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Daily Summary</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
