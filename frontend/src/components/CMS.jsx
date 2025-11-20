import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Eye,
  Image,
  Tag,
  Calendar,
  Star,
  Clock,
  Users,
  Megaphone
} from 'lucide-react';

const CMS = () => {
  const [activeTab, setActiveTab] = useState('menu');
  const [searchTerm, setSearchTerm] = useState('');

  const menuItems = [
    {
      id: 1,
      name: 'ผัดไทย',
      category: 'Main Course',
      price: 120,
      description: 'ผัดไทยแท้รสชาติดั้งเดิม เส้นเหนียวนุ่ม ผัดกับกุ้งสด ถั่วงอก และไข่',
      image: '🍜',
      status: 'Active',
      popularity: 95,
      lastUpdated: '2025-09-18'
    },
    {
      id: 2,
      name: 'ต้มยำกุ้ง',
      category: 'Soup',
      price: 180,
      description: 'ต้มยำกุ้งน้ำใส รสเปรี้ยวเผ็ด กุ้งสดใหญ่ เห็ดฟาง ใบมะกรูด',
      image: '🍲',
      status: 'Active',
      popularity: 88,
      lastUpdated: '2025-09-17'
    },
    {
      id: 3,
      name: 'ส้มตำไทย',
      category: 'Salad',
      price: 80,
      description: 'ส้มตำไทยแท้ มะละกอสด มะเขือเทศ ถั่วฝักยาว รสเปรี้ยวหวานเผ็ด',
      image: '🥗',
      status: 'Active',
      popularity: 92,
      lastUpdated: '2025-09-18'
    },
    {
      id: 4,
      name: 'แกงเขียวหวานไก่',
      category: 'Curry',
      price: 150,
      description: 'แกงเขียวหวานไก่ เนื้อไก่นุ่ม มะเขือพวง ใบโหระพา',
      image: '🍛',
      status: 'Inactive',
      popularity: 75,
      lastUpdated: '2025-09-15'
    }
  ];

  const promotions = [
    {
      id: 1,
      title: 'Happy Hour 50% Off',
      description: 'ลดราคา 50% สำหรับเครื่องดื่มทุกชนิด ในช่วงเวลา 14:00-17:00',
      startDate: '2025-09-15',
      endDate: '2025-09-30',
      status: 'Active',
      type: 'Discount',
      image: '🍹'
    },
    {
      id: 2,
      title: 'Set Lunch Special',
      description: 'เซ็ตอาหารกลางวันพิเศษ ราคาเพียง 199 บาท',
      startDate: '2025-09-01',
      endDate: '2025-09-30',
      status: 'Active',
      type: 'Set Menu',
      image: '🍽️'
    },
    {
      id: 3,
      title: 'Weekend Family Deal',
      description: 'สั่งอาหาร 4 จาน รับฟรีน้ำผลไม้ 2 แก้ว (เฉพาะวันเสาร์-อาทิตย์)',
      startDate: '2025-09-01',
      endDate: '2025-09-30',
      status: 'Active',
      type: 'Bundle',
      image: '👨‍👩‍👧‍👦'
    }
  ];

  const news = [
    {
      id: 1,
      title: 'เปิดสาขาใหม่ที่เซ็นทรัลเวิลด์',
      content: 'ร้านอาหารของเราเปิดสาขาใหม่ที่เซ็นทรัลเวิลด์แล้ว มาลิ้มลองรสชาติดั้งเดิมในสถานที่ใหม่',
      publishDate: '2025-09-18',
      status: 'Published',
      author: 'Admin',
      views: 1250
    },
    {
      id: 2,
      title: 'เมนูใหม่ประจำเดือนกันยายน',
      content: 'เพิ่มเมนูใหม่ 5 รายการ รสชาติเด็ด ราคาสุดคุ้ม เริ่มวันที่ 20 กันยายน',
      publishDate: '2025-09-15',
      status: 'Published',
      author: 'Chef Manager',
      views: 890
    },
    {
      id: 3,
      title: 'ปรับปรุงระบบสั่งอาหารออนไลน์',
      content: 'ระบบสั่งอาหารออนไลน์ใหม่ รวดเร็วกว่าเดิม พร้อมระบบติดตามออเดอร์แบบเรียลไทม์',
      publishDate: '2025-09-10',
      status: 'Draft',
      author: 'IT Manager',
      views: 0
    }
  ];

  const categories = ['All', 'Main Course', 'Soup', 'Salad', 'Curry', 'Dessert', 'Beverage'];

  const filteredMenuItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
      case 'Published':
        return 'text-green-600 bg-green-100';
      case 'Inactive':
      case 'Draft':
        return 'text-gray-600 bg-gray-100';
      case 'Expired':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const renderMenu = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex-1 relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <Button className="flex items-center space-x-2">
          <Plus size={16} />
          <span>Add Menu Item</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMenuItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{item.image}</div>
                  <div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold text-primary">฿{item.price}</div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{item.popularity}%</span>
                </div>
              </div>
              <div className="flex space-x-2 pt-3">
                <button className="flex-1 p-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
                  <Eye size={16} className="mx-auto" />
                </button>
                <button className="flex-1 p-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90 transition-colors">
                  <Edit size={16} className="mx-auto" />
                </button>
                <button className="flex-1 p-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90 transition-colors">
                  <Trash2 size={16} className="mx-auto" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderPromotions = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Promotions & Offers</h3>
        <Button className="flex items-center space-x-2">
          <Plus size={16} />
          <span>Create Promotion</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {promotions.map((promo) => (
          <Card key={promo.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{promo.image}</div>
                  <div>
                    <CardTitle className="text-lg">{promo.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{promo.type}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(promo.status)}`}>
                  {promo.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{promo.description}</p>
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-muted-foreground">Start Date</p>
                  <p className="font-medium">{promo.startDate}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">End Date</p>
                  <p className="font-medium">{promo.endDate}</p>
                </div>
              </div>
              <div className="flex space-x-2 pt-3">
                <button className="flex-1 p-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
                  <Edit size={16} className="mx-auto" />
                </button>
                <button className="flex-1 p-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90 transition-colors">
                  <Trash2 size={16} className="mx-auto" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderNews = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">News & Announcements</h3>
        <Button className="flex items-center space-x-2">
          <Plus size={16} />
          <span>Create Article</span>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 font-medium">Title</th>
                  <th className="text-left p-4 font-medium">Author</th>
                  <th className="text-left p-4 font-medium">Publish Date</th>
                  <th className="text-left p-4 font-medium">Views</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {news.map((article) => (
                  <tr key={article.id} className="border-b border-border hover:bg-muted/50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{article.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-2">
                          {article.content}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">{article.author}</td>
                    <td className="p-4 text-muted-foreground">{article.publishDate}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-1">
                        <Eye size={14} className="text-muted-foreground" />
                        <span>{article.views}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(article.status)}`}>
                        {article.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button className="p-1 hover:bg-muted rounded">
                          <Eye size={16} className="text-muted-foreground" />
                        </button>
                        <button className="p-1 hover:bg-muted rounded">
                          <Edit size={16} className="text-muted-foreground" />
                        </button>
                        <button className="p-1 hover:bg-muted rounded">
                          <Trash2 size={16} className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Content Management System</h1>
        <p className="text-muted-foreground mt-2">Manage menus, promotions, and restaurant content</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Menu Items
            </CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{menuItems.length}</div>
            <p className="text-xs text-muted-foreground">Active menu items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Promotions
            </CardTitle>
            <Megaphone className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{promotions.filter(p => p.status === 'Active').length}</div>
            <p className="text-xs text-muted-foreground">Running promotions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Published Articles
            </CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{news.filter(n => n.status === 'Published').length}</div>
            <p className="text-xs text-muted-foreground">Live articles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Views
            </CardTitle>
            <Eye className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{news.reduce((sum, n) => sum + n.views, 0)}</div>
            <p className="text-xs text-muted-foreground">Article views</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {[
            { id: 'menu', label: 'Menu Management', icon: FileText },
            { id: 'promotions', label: 'Promotions', icon: Megaphone },
            { id: 'news', label: 'News & Articles', icon: Users },
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
        {activeTab === 'menu' && renderMenu()}
        {activeTab === 'promotions' && renderPromotions()}
        {activeTab === 'news' && renderNews()}
      </div>
    </div>
  );
};

export default CMS;
