import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Plus, 
  Search, 
  Calendar,
  Clock,
  DollarSign,
  UserCheck,
  UserX,
  Edit,
  Trash2,
  Eye,
  Award
} from 'lucide-react';

const HRM = () => {
  const [activeTab, setActiveTab] = useState('employees');
  const [searchTerm, setSearchTerm] = useState('');

  const employees = [
    {
      id: 1,
      name: 'สมชาย ใจดี',
      position: 'Chef',
      department: 'Kitchen',
      salary: 25000,
      startDate: '2024-01-15',
      status: 'Active',
      phone: '081-234-5678',
      email: 'somchai@restaurant.com',
      workingHours: '08:00-17:00',
      avatar: '👨‍🍳'
    },
    {
      id: 2,
      name: 'สมหญิง รักงาน',
      position: 'Waitress',
      department: 'Service',
      salary: 18000,
      startDate: '2024-03-01',
      status: 'Active',
      phone: '082-345-6789',
      email: 'somying@restaurant.com',
      workingHours: '10:00-19:00',
      avatar: '👩‍💼'
    },
    {
      id: 3,
      name: 'วิชัย ขยัน',
      position: 'Cashier',
      department: 'Front Office',
      salary: 20000,
      startDate: '2024-02-10',
      status: 'Active',
      phone: '083-456-7890',
      email: 'wichai@restaurant.com',
      workingHours: '09:00-18:00',
      avatar: '👨‍💻'
    },
    {
      id: 4,
      name: 'มาลี สุภาพ',
      position: 'Manager',
      department: 'Management',
      salary: 35000,
      startDate: '2023-11-01',
      status: 'Active',
      phone: '084-567-8901',
      email: 'malee@restaurant.com',
      workingHours: '08:00-18:00',
      avatar: '👩‍💼'
    },
    {
      id: 5,
      name: 'สุรชัย หยุดงาน',
      position: 'Waiter',
      department: 'Service',
      salary: 18000,
      startDate: '2024-01-20',
      status: 'On Leave',
      phone: 'N/A',
      email: 'N/A',
      workingHours: 'N/A',
      avatar: '👨‍💼'
    }
  ];

  const schedules = [
    { id: 1, employeeName: 'สมชาย ใจดี', date: '2025-09-18', shift: 'Morning', time: '08:00-17:00', status: 'Scheduled' },
    { id: 2, employeeName: 'สมหญิง รักงาน', date: '2025-09-18', shift: 'Evening', time: '10:00-19:00', status: 'Scheduled' },
    { id: 3, employeeName: 'วิชัย ขยัน', date: '2025-09-18', shift: 'Day', time: '09:00-18:00', status: 'Scheduled' },
    { id: 4, employeeName: 'มาลี สุภาพ', date: '2025-09-18', shift: 'Full Day', time: '08:00-18:00', status: 'Scheduled' },
  ];

  const attendance = [
    { id: 1, employeeName: 'สมชาย ใจดี', date: '2025-09-18', checkIn: '08:05', checkOut: '17:02', status: 'Present', hours: 8.95 },
    { id: 2, employeeName: 'สมหญิง รักงาน', date: '2025-09-18', checkIn: '10:00', checkOut: '-', status: 'Working', hours: 0 },
    { id: 3, employeeName: 'วิชัย ขยัน', date: '2025-09-17', checkIn: '09:15', checkOut: '18:00', status: 'Late', hours: 8.75 },
    { id: 4, employeeName: 'มาลี สุภาพ', date: '2025-09-17', checkIn: '08:00', checkOut: '18:30', status: 'Overtime', hours: 10.5 },
  ];

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeEmployees = employees.filter(emp => emp.status === 'Active').length;
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const onLeaveEmployees = employees.filter(emp => emp.status === 'On Leave').length;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'text-green-600 bg-green-100';
      case 'On Leave':
        return 'text-yellow-600 bg-yellow-100';
      case 'Terminated':
        return 'text-red-600 bg-red-100';
      case 'Present':
        return 'text-green-600 bg-green-100';
      case 'Late':
        return 'text-yellow-600 bg-yellow-100';
      case 'Working':
        return 'text-blue-600 bg-blue-100';
      case 'Overtime':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const renderEmployees = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex-1 relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <Button className="flex items-center space-x-2">
          <Plus size={16} />
          <span>Add Employee</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{employee.avatar}</div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{employee.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{employee.position}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                  {employee.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Department</p>
                  <p className="font-medium">{employee.department}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Salary</p>
                  <p className="font-medium">฿{employee.salary.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Start Date</p>
                  <p className="font-medium">{employee.startDate}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Working Hours</p>
                  <p className="font-medium">{employee.workingHours}</p>
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

  const renderSchedules = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Work Schedules</h3>
        <Button className="flex items-center space-x-2">
          <Calendar size={16} />
          <span>Create Schedule</span>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 font-medium">Employee</th>
                  <th className="text-left p-4 font-medium">Date</th>
                  <th className="text-left p-4 font-medium">Shift</th>
                  <th className="text-left p-4 font-medium">Time</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((schedule) => (
                  <tr key={schedule.id} className="border-b border-border hover:bg-muted/50">
                    <td className="p-4 font-medium">{schedule.employeeName}</td>
                    <td className="p-4 text-muted-foreground">{schedule.date}</td>
                    <td className="p-4">{schedule.shift}</td>
                    <td className="p-4">{schedule.time}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(schedule.status)}`}>
                        {schedule.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
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

  const renderAttendance = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Attendance Records</h3>
        <Button className="flex items-center space-x-2">
          <Clock size={16} />
          <span>Mark Attendance</span>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 font-medium">Employee</th>
                  <th className="text-left p-4 font-medium">Date</th>
                  <th className="text-left p-4 font-medium">Check In</th>
                  <th className="text-left p-4 font-medium">Check Out</th>
                  <th className="text-left p-4 font-medium">Hours</th>
                  <th className="text-left p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record) => (
                  <tr key={record.id} className="border-b border-border hover:bg-muted/50">
                    <td className="p-4 font-medium">{record.employeeName}</td>
                    <td className="p-4 text-muted-foreground">{record.date}</td>
                    <td className="p-4">{record.checkIn}</td>
                    <td className="p-4">{record.checkOut}</td>
                    <td className="p-4">{record.hours > 0 ? `${record.hours}h` : '-'}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
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
        <h1 className="text-3xl font-bold text-foreground">Human Resource Management</h1>
        <p className="text-muted-foreground mt-2">Manage staff schedules, payroll, and employee information</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Employees
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeEmployees}</div>
            <p className="text-xs text-muted-foreground">Currently working</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              On Leave
            </CardTitle>
            <UserX className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{onLeaveEmployees}</div>
            <p className="text-xs text-muted-foreground">Employees on leave</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Payroll
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">฿{totalSalary.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Monthly salary cost</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Attendance Rate
            </CardTitle>
            <UserCheck className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {[
            { id: 'employees', label: 'Employees', icon: Users },
            { id: 'schedules', label: 'Schedules', icon: Calendar },
            { id: 'attendance', label: 'Attendance', icon: Clock },
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
        {activeTab === 'employees' && renderEmployees()}
        {activeTab === 'schedules' && renderSchedules()}
        {activeTab === 'attendance' && renderAttendance()}
      </div>
    </div>
  );
};

export default HRM;
