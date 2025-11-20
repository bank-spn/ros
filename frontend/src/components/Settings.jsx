import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield,
  Database,
  Printer,
  Wifi,
  Monitor,
  Save,
  RefreshCw
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    restaurantName: 'Restaurant POS',
    address: '123 Main Street, Bangkok, Thailand',
    phone: '02-123-4567',
    email: 'info@restaurant.com',
    currency: 'THB',
    timezone: 'Asia/Bangkok',
    language: 'th',
    notifications: {
      lowStock: true,
      newOrders: true,
      paymentReceived: false,
      systemUpdates: true
    },
    printer: {
      receiptPrinter: 'EPSON TM-T88V',
      kitchenPrinter: 'EPSON TM-T20II',
      autoprint: true
    },
    security: {
      sessionTimeout: 30,
      requirePassword: true,
      twoFactorAuth: false
    }
  });

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const updateDirectSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const renderGeneral = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Restaurant Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Restaurant Name</label>
              <input
                type="text"
                value={settings.restaurantName}
                onChange={(e) => updateDirectSetting('restaurantName', e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => updateDirectSetting('phone', e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Address</label>
              <textarea
                value={settings.address}
                onChange={(e) => updateDirectSetting('address', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => updateDirectSetting('email', e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Currency</label>
              <select
                value={settings.currency}
                onChange={(e) => updateDirectSetting('currency', e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="THB">Thai Baht (THB)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Timezone</label>
              <select
                value={settings.timezone}
                onChange={(e) => updateDirectSetting('timezone', e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="Asia/Bangkok">Asia/Bangkok</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">America/New_York</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <select
                value={settings.language}
                onChange={(e) => updateDirectSetting('language', e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="th">ไทย (Thai)</option>
                <option value="en">English</option>
                <option value="zh">中文 (Chinese)</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotifications = () => (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(settings.notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <div className="font-medium capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className="text-sm text-muted-foreground">
                {key === 'lowStock' && 'Get notified when inventory items are running low'}
                {key === 'newOrders' && 'Receive alerts for new customer orders'}
                {key === 'paymentReceived' && 'Notifications when payments are processed'}
                {key === 'systemUpdates' && 'Updates about system maintenance and features'}
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => updateSetting('notifications', key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const renderSecurity = () => (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Session Timeout (minutes)</label>
            <input
              type="number"
              value={settings.security.sessionTimeout}
              onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              min="5"
              max="120"
            />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <div className="font-medium">Require Password for Admin Actions</div>
              <div className="text-sm text-muted-foreground">
                Require password confirmation for sensitive operations
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.security.requirePassword}
                onChange={(e) => updateSetting('security', 'requirePassword', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <div className="font-medium">Two-Factor Authentication</div>
              <div className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.security.twoFactorAuth}
                onChange={(e) => updateSetting('security', 'twoFactorAuth', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderSystem = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Printer Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Receipt Printer</label>
              <select
                value={settings.printer.receiptPrinter}
                onChange={(e) => updateSetting('printer', 'receiptPrinter', e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="EPSON TM-T88V">EPSON TM-T88V</option>
                <option value="EPSON TM-T20II">EPSON TM-T20II</option>
                <option value="Star TSP143III">Star TSP143III</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Kitchen Printer</label>
              <select
                value={settings.printer.kitchenPrinter}
                onChange={(e) => updateSetting('printer', 'kitchenPrinter', e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="EPSON TM-T20II">EPSON TM-T20II</option>
                <option value="EPSON TM-T88V">EPSON TM-T88V</option>
                <option value="Star TSP143III">Star TSP143III</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <div className="font-medium">Auto-print Receipts</div>
              <div className="text-sm text-muted-foreground">
                Automatically print receipts after payment
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.printer.autoprint}
                onChange={(e) => updateSetting('printer', 'autoprint', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Maintenance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="flex items-center space-x-2">
              <Database size={16} />
              <span>Backup Database</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <RefreshCw size={16} />
              <span>Clear Cache</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Printer size={16} />
              <span>Test Printers</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Wifi size={16} />
              <span>Network Status</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Configure system settings and preferences</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {[
            { id: 'general', label: 'General', icon: SettingsIcon },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'system', label: 'System', icon: Monitor },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'general' && renderGeneral()}
        {activeTab === 'notifications' && renderNotifications()}
        {activeTab === 'security' && renderSecurity()}
        {activeTab === 'system' && renderSystem()}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="flex items-center space-x-2">
          <Save size={16} />
          <span>Save Settings</span>
        </Button>
      </div>
    </div>
  );
};

export default Settings;
