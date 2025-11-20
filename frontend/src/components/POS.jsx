import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Search, 
  CreditCard,
  Banknote,
  QrCode,
  Trash2,
  Calculator,
  Receipt,
  Users,
  Clock,
  Check
} from 'lucide-react';

const POS = () => {
  const [selectedTable, setSelectedTable] = useState(1);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const menuItems = [
    { id: 1, name: 'ผัดไทย', category: 'Main Course', price: 120, image: '🍜' },
    { id: 2, name: 'ต้มยำกุ้ง', category: 'Soup', price: 180, image: '🍲' },
    { id: 3, name: 'ส้มตำไทย', category: 'Salad', price: 80, image: '🥗' },
    { id: 4, name: 'แกงเขียวหวานไก่', category: 'Curry', price: 150, image: '🍛' },
    { id: 5, name: 'ข้าวผัดกุ้ง', category: 'Main Course', price: 140, image: '🍚' },
    { id: 6, name: 'ลาบหมู', category: 'Salad', price: 100, image: '🥙' },
    { id: 7, name: 'น้ำมะนาว', category: 'Beverage', price: 40, image: '🥤' },
    { id: 8, name: 'ไอศกรีมกะทิ', category: 'Dessert', price: 60, image: '🍨' },
  ];

  const categories = ['All', 'Main Course', 'Soup', 'Salad', 'Curry', 'Beverage', 'Dessert'];

  const tables = [
    { id: 1, name: 'Table 1', status: 'available', customers: 0 },
    { id: 2, name: 'Table 2', status: 'occupied', customers: 4 },
    { id: 3, name: 'Table 3', status: 'available', customers: 0 },
    { id: 4, name: 'Table 4', status: 'occupied', customers: 2 },
    { id: 5, name: 'Table 5', status: 'reserved', customers: 6 },
    { id: 6, name: 'Table 6', status: 'available', customers: 0 },
  ];

  const filteredMenuItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTableStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'occupied':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const processPayment = () => {
    if (cart.length === 0) return;
    
    // Simulate payment processing
    alert(`Payment of ฿${getTotalAmount()} processed successfully via ${paymentMethod}!`);
    clearCart();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Point of Sale System</h1>
        <p className="text-muted-foreground mt-2">Process orders and manage payments</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Menu Items */}
        <div className="lg:col-span-2 space-y-4">
          {/* Table Selection */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Table Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {tables.map((table) => (
                  <button
                    key={table.id}
                    onClick={() => setSelectedTable(table.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedTable === table.id
                        ? 'border-primary bg-primary text-primary-foreground'
                        : `border-border hover:border-primary ${getTableStatusColor(table.status)}`
                    }`}
                  >
                    <div className="text-sm font-medium">{table.name}</div>
                    {table.customers > 0 && (
                      <div className="text-xs flex items-center justify-center mt-1">
                        <Users size={12} className="mr-1" />
                        {table.customers}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Menu Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredMenuItems.map((item) => (
              <Card 
                key={item.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => addToCart(item)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{item.image}</div>
                  <h3 className="font-medium text-sm mb-1">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{item.category}</p>
                  <p className="text-lg font-bold text-primary">฿{item.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Panel - Cart & Payment */}
        <div className="space-y-4">
          {/* Current Order */}
          <Card className="h-fit">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">
                  Order - Table {selectedTable}
                </CardTitle>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock size={14} />
                  <span>{new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <ShoppingCart size={48} className="mx-auto mb-2 opacity-50" />
                  <p>No items in cart</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{item.name}</div>
                          <div className="text-xs text-muted-foreground">฿{item.price} each</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-muted rounded"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-muted rounded"
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 hover:bg-muted rounded text-red-600"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-3 space-y-2">
                    <div className="flex justify-between">
                      <span>Items:</span>
                      <span>{getTotalItems()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>฿{getTotalAmount()}</span>
                    </div>
                  </div>

                  <Button 
                    onClick={clearCart}
                    variant="outline" 
                    className="w-full"
                  >
                    Clear All
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Payment Methods */}
          {cart.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      paymentMethod === 'cash'
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    <Banknote size={20} className="mx-auto mb-1" />
                    <div className="text-xs">Cash</div>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    <CreditCard size={20} className="mx-auto mb-1" />
                    <div className="text-xs">Card</div>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('qr')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      paymentMethod === 'qr'
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    <QrCode size={20} className="mx-auto mb-1" />
                    <div className="text-xs">QR Code</div>
                  </button>
                </div>

                <div className="space-y-2">
                  <Button 
                    onClick={processPayment}
                    className="w-full"
                    size="lg"
                  >
                    <Check size={16} className="mr-2" />
                    Process Payment (฿{getTotalAmount()})
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                  >
                    <Receipt size={16} className="mr-2" />
                    Print Receipt
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default POS;
