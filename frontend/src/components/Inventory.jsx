import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  Plus, 
  Search, 
  Filter,
  AlertTriangle,
  TrendingDown,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const inventoryItems = [
    {
      id: 1,
      name: 'Rice',
      category: 'Grains',
      currentStock: 50,
      minStock: 20,
      unit: 'kg',
      costPerUnit: 25,
      supplier: 'Thai Rice Co.',
      lastUpdated: '2025-09-18',
      status: 'In Stock'
    },
    {
      id: 2,
      name: 'Chicken Breast',
      category: 'Meat',
      currentStock: 8,
      minStock: 15,
      unit: 'kg',
      costPerUnit: 180,
      supplier: 'Fresh Meat Ltd.',
      lastUpdated: '2025-09-17',
      status: 'Low Stock'
    },
    {
      id: 3,
      name: 'Tomatoes',
      category: 'Vegetables',
      currentStock: 25,
      minStock: 10,
      unit: 'kg',
      costPerUnit: 40,
      supplier: 'Green Farm',
      lastUpdated: '2025-09-18',
      status: 'In Stock'
    },
    {
      id: 4,
      name: 'Cooking Oil',
      category: 'Condiments',
      currentStock: 3,
      minStock: 5,
      unit: 'L',
      costPerUnit: 120,
      supplier: 'Oil Supply Co.',
      lastUpdated: '2025-09-16',
      status: 'Low Stock'
    },
    {
      id: 5,
      name: 'Onions',
      category: 'Vegetables',
      currentStock: 30,
      minStock: 15,
      unit: 'kg',
      costPerUnit: 35,
      supplier: 'Green Farm',
      lastUpdated: '2025-09-18',
      status: 'In Stock'
    }
  ];

  const categories = ['all', 'Grains', 'Meat', 'Vegetables', 'Condiments'];

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockItems = inventoryItems.filter(item => item.currentStock <= item.minStock);
  const totalValue = inventoryItems.reduce((sum, item) => sum + (item.currentStock * item.costPerUnit), 0);

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock':
        return 'text-green-600 bg-green-100';
      case 'Low Stock':
        return 'text-red-600 bg-red-100';
      case 'Out of Stock':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground mt-2">Manage your restaurant's inventory and stock levels</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus size={16} />
          <span>Add New Item</span>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Items
            </CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryItems.length}</div>
            <p className="text-xs text-muted-foreground">Active inventory items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Low Stock Alerts
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{lowStockItems.length}</div>
            <p className="text-xs text-muted-foreground">Items need restocking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Value
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">฿{totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Current inventory value</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-medium text-muted-foreground">Item Name</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Category</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Current Stock</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Min Stock</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Cost/Unit</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className="border-b border-border hover:bg-muted/50">
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">Supplier: {item.supplier}</div>
                      </div>
                    </td>
                    <td className="p-3 text-muted-foreground">{item.category}</td>
                    <td className="p-3">
                      <span className={`font-medium ${item.currentStock <= item.minStock ? 'text-red-600' : ''}`}>
                        {item.currentStock} {item.unit}
                      </span>
                    </td>
                    <td className="p-3 text-muted-foreground">{item.minStock} {item.unit}</td>
                    <td className="p-3 text-muted-foreground">฿{item.costPerUnit}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3">
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
};

export default Inventory;
