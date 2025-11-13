// src/Pages/Admin/AdminDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/logo-2.jpeg'
import { 
  FiHome, FiUsers, FiPackage, FiStar, FiLogOut, FiSettings, 
  FiBarChart2, FiBell, FiSearch, FiMessageSquare, FiDollarSign 
} from 'react-icons/fi';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  // Color constants
  const primaryColor = '#708238';  // Olive green
  const secondaryColor = '#FFA500'; // Orange
  const primaryHover = '#5a6a2c';  // Darker olive green
  const secondaryHover = '#e69500'; // Darker orange
  const lightPrimary = 'rgba(112, 130, 56, 0.1)';
  const lightSecondary = 'rgba(255, 165, 0, 0.1)';

  // Sample data
  const users = [
    { id: 1, name: 'Abdul Raziq', type: 'Seller', status: 'Verified', location: 'Karachi', joinDate: '2025-01-15', revenue: '$8,420' },
    { id: 2, name: 'Sarah Johnson', type: 'Buyer', status: 'Verified', location: 'New York', joinDate: '2025-03-22', revenue: '$2,150' },
    { id: 3, name: 'Michael Chen', type: 'Buyer', status: 'Pending', location: 'Singapore', joinDate: '2025-07-10', revenue: '$0' },
    { id: 4, name: 'ERP Solutions', type: 'Seller', status: 'Verified', location: 'London', joinDate: '2024-11-05', revenue: '$15,230' },
    { id: 5, name: 'Tech Innovators', type: 'Buyer', status: 'Verified', location: 'San Francisco', joinDate: '2025-05-18', revenue: '$5,780' }
  ];

  const orders = [
    { id: 'ORD-1001', service: 'Inventory Dashboard', buyer: 'Sarah Johnson', seller: 'Abdul Raziq', status: 'In Progress', amount: '$250', date: '2025-07-25' },
    { id: 'ORD-1002', service: 'CRM Setup', buyer: 'Michael Chen', seller: 'ERP Solutions', status: 'Completed', amount: '$180', date: '2025-07-20' },
    { id: 'ORD-1003', service: 'Data Migration', buyer: 'Tech Innovators', seller: 'Abdul Raziq', status: 'Pending', amount: '$320', date: '2025-07-28' },
    { id: 'ORD-1004', service: 'Financial Module', buyer: 'Global Retail', seller: 'ERP Solutions', status: 'In Progress', amount: '$210', date: '2025-07-26' },
    { id: 'ORD-1005', service: 'HR System Integration', buyer: 'Tech Innovators', seller: 'ERP Solutions', status: 'Completed', amount: '$290', date: '2025-07-22' }
  ];

  const performance = [
    { name: 'Abdul Raziq', rating: 4.9, level: 'Top Rated', orders: 45, completionRate: '98%', responseTime: '2h' },
    { name: 'ERP Solutions', rating: 4.7, level: 'Level 3', orders: 32, completionRate: '95%', responseTime: '3h' },
    { name: 'Data Experts', rating: 4.5, level: 'Level 2', orders: 28, completionRate: '92%', responseTime: '5h' },
    { name: 'Cloud Migrators', rating: 4.6, level: 'Level 2', orders: 19, completionRate: '94%', responseTime: '4h' }
  ];

  const stats = {
    totalUsers: 248,
    activeSellers: 87,
    activeBuyers: 161,
    activeOrders: 42,
    pendingOrders: 8,
    completedOrders: 156,
    platformRevenue: 12580,
    commissionRate: '15%'
  };

  // Status badge component with updated colors
  const StatusBadge = ({ status }) => {
    const statusStyles = {
      Verified: { bg: 'bg-green-100', text: 'text-green-800', icon: '✓' },
      Pending: { 
        bg: `bg-[${lightSecondary}]`, 
        text: `text-[${secondaryColor}]`, 
        icon: '⏱' 
      },
      Completed: { bg: 'bg-blue-100', text: 'text-blue-800', icon: '✓' },
      'In Progress': { 
        bg: `bg-[${lightPrimary}]`, 
        text: `text-[${primaryColor}]`, 
        icon: '🔄' 
      },
      'Top Rated': { 
        bg: `bg-[${lightSecondary}]`, 
        text: `text-[${secondaryColor}]`, 
        icon: '⭐' 
      },
      'Level 3': { bg: 'bg-green-100', text: 'text-green-800', icon: '🏆' },
      'Level 2': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '🔹' }
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${statusStyles[status].bg} ${statusStyles[status].text}`}>
        <span className="mr-1">{statusStyles[status].icon}</span>
        {status}
      </span>
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin/login');
  };

  // Filter data based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    order.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Tab content renderer
  const renderContent = () => {
    switch(activeTab) {
      case 'users':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
            <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-xl font-bold text-gray-800">User Management</h2>
              <div className="relative w-full md:w-64">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#708238] focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-[#f0f4e4] rounded-full flex items-center justify-center text-[#708238] font-medium">
                            {user.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">ID: {user.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm px-3 py-1 rounded-full ${user.type === 'Seller' ? 'bg-[#f0f4e4] text-[#708238]' : 'bg-blue-100 text-blue-800'}`}>
                          {user.type}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.joinDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {user.revenue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">248</span> users
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'orders':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
            <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-xl font-bold text-gray-800">Orders & Projects</h2>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative w-full sm:w-64">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#708238] focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#708238] focus:border-transparent">
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer/Seller</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#708238] hover:text-[#5a6a2c] cursor-pointer">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.service}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.buyer}</div>
                        <div className="text-sm text-gray-500">{order.seller}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {order.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">42</span> orders
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'performance':
        return (
          <div className="space-y-6 mt-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">Top Sellers</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {performance.map(perf => (
                      <tr key={perf.name} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-[#f0f4e4] rounded-full flex items-center justify-center text-[#708238] font-medium">
                              {perf.name.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{perf.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={`text-lg ${i < Math.floor(perf.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                              ))}
                            </div>
                            <span className="ml-1 text-sm text-gray-500">{perf.rating}/5</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={perf.level} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {perf.orders}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-green-500 h-2.5 rounded-full" 
                              style={{ width: perf.completionRate }}
                            ></div>
                          </div>
                          <span className="text-xs mt-1 block">{perf.completionRate}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {perf.responseTime}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-4">Performance Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-gray-600 text-sm">Average Seller Rating</p>
                      <p className="text-2xl font-bold">4.7/5</p>
                    </div>
                    <div className="bg-[#f0f4e4] p-3 rounded-full">
                      <FiStar className="text-[#708238] text-xl" />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-gray-600 text-sm">Average Order Completion</p>
                      <p className="text-2xl font-bold">96%</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <FiBarChart2 className="text-green-600 text-xl" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-4">Recent Reviews</h3>
                <div className="space-y-3">
                  <div className="border-b pb-3">
                    <div className="flex items-center mb-1">
                      <div className="flex text-yellow-400 mr-2">
                        ★★★★★
                      </div>
                      <span className="text-sm text-gray-500">by Sarah Johnson</span>
                    </div>
                    <p className="text-sm text-gray-700">"Abdul delivered an excellent inventory dashboard ahead of schedule!"</p>
                  </div>
                  
                  <div className="border-b pb-3">
                    <div className="flex items-center mb-1">
                      <div className="flex text-yellow-400 mr-2">
                        ★★★★☆
                      </div>
                      <span className="text-sm text-gray-500">by Tech Innovators</span>
                    </div>
                    <p className="text-sm text-gray-700">"Good data migration service, would recommend with minor improvements."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default: // Dashboard view
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Card 1 */}
  <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-[#708238] transition-all duration-300 hover:bg-[#FFA500] hover:text-white cursor-pointer">
    <div className="flex justify-between">
      <div>
        <p className="text-gray-600 text-sm group-hover:text-white">Total Users</p>
        <p className="text-2xl font-bold">{stats.totalUsers}</p>
        <p className="text-xs text-green-500 mt-1 group-hover:text-white">↑ 12% from last month</p>
      </div>
      <div className="bg-[#f0f4e4] p-3 rounded-full h-fit">
        <FiUsers className="text-[#708238] text-xl" />
      </div>
    </div>
  </div>

  {/* Card 2 */}
  <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-[#708238] transition-all duration-300 hover:bg-[#FFA500] hover:text-white cursor-pointer">
    <div className="flex justify-between">
      <div>
        <p className="text-gray-600 text-sm">Active Orders</p>
        <p className="text-2xl font-bold">{stats.activeOrders}</p>
        <p className="text-xs text-green-500 mt-1">↑ 8% from last week</p>
      </div>
      <div className="bg-[#fff0cc] p-3 rounded-full h-fit">
        <FiPackage className="text-[#FFA500] text-xl" />
      </div>
    </div>
  </div>

  {/* Card 3 */}
  <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-[#708238] transition-all duration-300 hover:bg-[#FFA500] hover:text-white cursor-pointer">
    <div className="flex justify-between">
      <div>
        <p className="text-gray-600 text-sm">Platform Revenue</p>
        <p className="text-2xl font-bold">
          ${stats.platformRevenue.toLocaleString()}
        </p>
        <p className="text-xs text-green-500 mt-1">↑ 15% from last month</p>
      </div>
      <div className="bg-blue-100 p-3 rounded-full h-fit">
        <FiDollarSign className="text-blue-600 text-xl" />
      </div>
    </div>
  </div>

  {/* Card 4 */}
  <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-[#708238] transition-all duration-300 hover:bg-[#FFA500] hover:text-white cursor-pointer">
    <div className="flex justify-between">
      <div>
        <p className="text-gray-600 text-sm">Commission Rate</p>
        <p className="text-2xl font-bold">{stats.commissionRate}</p>
        <p className="text-xs text-gray-500 mt-1">Current rate</p>
      </div>
      <div className="bg-[#f0f4e4] p-3 rounded-full h-fit">
        <FiMessageSquare className="text-[#708238] text-xl" />
      </div>
    </div>
  </div>
</div>





            
            {/* Charts and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div
  className="bg-white p-5 rounded-xl border border-gray-100 lg:col-span-2"
  style={{
    boxShadow: "0 0 20px rgba(255, 165, 0, 0.7)", // orange glow shadow
  }}
>
  <h3 className="font-bold text-lg mb-4">Order Analytics</h3>
  <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center h-64">
    <p className="text-gray-400">Order volume chart would be displayed here</p>
  </div>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
  {/* Box 1 – Olive border */}
  <div className="bg-[#f0f4e4] p-3 rounded-lg text-center border-2 border-[#708238] shadow-md">
    <p className="text-sm text-[#708238]">Active Sellers</p>
    <p className="font-bold text-lg">{stats.activeSellers}</p>
  </div>

  {/* Box 2 – Orange border */}
  <div className="bg-green-50 p-3 rounded-lg text-center border-2 border-[#FFA500] shadow-md">
    <p className="text-sm text-[#FFA500]">Active Buyers</p>
    <p className="font-bold text-lg">{stats.activeBuyers}</p>
  </div>

  {/* Box 3 – Olive border again */}
  <div className="bg-blue-50 p-3 rounded-lg text-center border-2 border-[#708238] shadow-md">
    <p className="text-sm text-[#708238]">Completed Orders</p>
    <p className="font-bold text-lg">{stats.completedOrders}</p>
  </div>
</div>

</div>

              
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-[#f0f4e4] p-2 rounded-full mr-3">
                      <FiPackage className="text-[#708238]" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">New order placed</p>
                      <p className="text-xs text-gray-500">Inventory Dashboard Setup by Sarah Johnson</p>
                      <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#fff0cc] p-2 rounded-full mr-3">
                      <FiStar className="text-[#FFA500]" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Seller level upgraded</p>
                      <p className="text-xs text-gray-500">Abdul Raziq reached Top Rated status</p>
                      <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <FiUsers className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">New user registered</p>
                      <p className="text-xs text-gray-500">Michael Chen joined as a buyer</p>
                      <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#f0f4e4] p-2 rounded-full mr-3">
                      <FiMessageSquare className="text-[#708238]" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">New review received</p>
                      <p className="text-xs text-gray-500">5-star review for ERP Solutions</p>
                      <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Orders */}
           <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
  <h3 className="font-bold text-lg mb-4">Recent Orders</h3>
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Order ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Service
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Amount
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {orders.slice(0, 3).map((order) => (
          <tr
            key={order.id}
            className="hover:bg-[#b4c56c] hover:text-white transition-colors duration-300"
          >
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#708238]">
              {order.id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {order.service}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <StatusBadge status={order.status} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              {order.amount}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {order.date}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
    <header className="bg-white shadow-sm border-b border-gray-200">
  {/* Gradient Background Bar */}
  <div className="bg-gradient-to-r from-[#FFA500] via-[#d4a72b] via-40% to-[#708238] flex justify-between items-center px-4 sm:px-6 py-4">
    {/* Left Section */}
    <div className="flex items-center">
      <img
        src={logo}
        alt="JustERPs Logo"
        className="w-48 rounded-lg mr-4 sm:mr-10 object-cover"
      />

      <div className="hidden md:flex items-center justify-between p-4 space-x-6">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-white tracking-wide drop-shadow-lg">
          ADMIN DASHBOARD
        </h1>

        {/* Search Box */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-[#FFA500] focus:border-transparent"
          />
        </div>
      </div>
    </div>

    {/* Right Section */}
    <div className="flex items-center space-x-3 sm:space-x-4">
  {/* Notification Icon */}
  <button className="p-2 rounded-full bg-gradient-to-br from-[#FFA500] to-[#708238] hover:opacity-90 relative transition shadow-md">
    <FiBell className="text-white text-lg" />
    <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
  </button>

  {/* Profile Icon */}
  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#FFA500] to-[#708238] text-white flex items-center justify-center font-semibold cursor-pointer hover:opacity-90 shadow-md">
    A
  </div>
</div>

  </div>
</header>




      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
    <nav className="w-64 bg-[#708238] shadow-sm text-white border-r border-gray-200 flex-shrink-0 hidden md:block relative overflow-hidden">
  {/* Animated Background Elements - More Visible */}
  <div className="absolute top-0 left-0 w-40 h-40 bg-[#FFA500] rounded-full -translate-y-20 -translate-x-20 opacity-25 animate-float-slow"></div>
  <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#FFA500] rounded-full translate-y-24 translate-x-24 opacity-25 animate-bounce-slow"></div>
  
  <div className="relative z-10">
    <div className="p-4">
      <ul className="space-y-1">
        <li>
          <button
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${
              activeTab === 'dashboard' 
                ? `bg-white/30 text-white shadow-lg backdrop-blur-sm border border-white/20` 
                : 'text-white hover:bg-white/25 hover:shadow-md hover:scale-[1.02] backdrop-blur-sm border border-transparent'
            }`}
            onClick={() => setActiveTab('dashboard')}
          >
            <FiHome className="mr-3" />
            Dashboard
          </button>
        </li>
        <li>
          <button
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${
              activeTab === 'users' 
                ? `bg-white/30 text-white shadow-lg backdrop-blur-sm border border-white/20` 
                : 'text-white hover:bg-white/25 hover:shadow-md hover:scale-[1.02] backdrop-blur-sm border border-transparent'
            }`}
            onClick={() => setActiveTab('users')}
          >
            <FiUsers className="mr-3" />
            User Management
          </button>
        </li>
        <li>
          <button
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${
              activeTab === 'orders' 
                ? `bg-white/30 text-white shadow-lg backdrop-blur-sm border border-white/20` 
                : 'text-white hover:bg-white/25 hover:shadow-md hover:scale-[1.02] backdrop-blur-sm border border-transparent'
            }`}
            onClick={() => setActiveTab('orders')}
          >
            <FiPackage className="mr-3" />
            Orders & Projects
          </button>
        </li>
        <li>
          <button
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${
              activeTab === 'performance' 
                ? `bg-white/30 text-white shadow-lg backdrop-blur-sm border border-white/20` 
                : 'text-white hover:bg-white/25 hover:shadow-md hover:scale-[1.02] backdrop-blur-sm border border-transparent'
            }`}
            onClick={() => setActiveTab('performance')}
          >
            <FiStar className="mr-3" />
            Seller Performance
          </button>
        </li>
      </ul>
      
      <div className="mt-8">
        <div className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-4 backdrop-blur-sm">
          ADMIN
        </div>
        <ul className="space-y-1">
          <li>
            <button className="w-full flex items-center px-4 py-3 rounded-lg text-white hover:bg-white/25 hover:shadow-md hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm border border-transparent">
              <FiSettings className="mr-3" />
              Settings
            </button>
          </li>
        </ul>
      </div>
    </div>
    
    <div className="p-4 border-t border-white/20 mt-auto backdrop-blur-sm bg-white/10">
      <div className="text-center text-xs text-white/90">
        <div className="flex items-center justify-center mb-1">
          <span className="h-2 w-2 rounded-full bg-green-400 mr-2 shadow-lg"></span>
          Platform Status: Operational
        </div>
        <div>v2.1.0</div>
      </div>
    </div>
  </div>

  {/* Custom Animation Styles */}
  <style>
    {`
      @keyframes float-slow {
        0%, 100% {
          transform: translateY(0) translateX(0);
        }
        50% {
          transform: translateY(-15px) translateX(-15px);
        }
      }
      @keyframes bounce-slow {
        0%, 100% {
          transform: translateY(0) translateX(0);
        }
        50% {
          transform: translateY(20px) translateX(20px);
        }
      }
      .animate-float-slow {
        animation: float-slow 8s ease-in-out infinite;
      }
      .animate-bounce-slow {
        animation: bounce-slow 7s ease-in-out infinite;
      }
    `}
  </style>
</nav>


        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
          <button
            className={`flex flex-col items-center p-2 ${activeTab === 'dashboard' ? `text-[${primaryColor}]` : 'text-gray-600'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <FiHome className="text-lg" />
            <span className="text-xs mt-1">Dashboard</span>
          </button>
          <button
            className={`flex flex-col items-center p-2 ${activeTab === 'users' ? `text-[${primaryColor}]` : 'text-gray-600'}`}
            onClick={() => setActiveTab('users')}
          >
            <FiUsers className="text-lg" />
            <span className="text-xs mt-1">Users</span>
          </button>
          <button
            className={`flex flex-col items-center p-2 ${activeTab === 'orders' ? `text-[${primaryColor}]` : 'text-gray-600'}`}
            onClick={() => setActiveTab('orders')}
          >
            <FiPackage className="text-lg" />
            <span className="text-xs mt-1">Orders</span>
          </button>
          <button
            className={`flex flex-col items-center p-2 ${activeTab === 'performance' ? `text-[${primaryColor}]` : 'text-gray-600'}`}
            onClick={() => setActiveTab('performance')}
          >
            <FiStar className="text-lg" />
            <span className="text-xs mt-1">Performance</span>
          </button>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20 md:pb-6">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {activeTab === 'dashboard' && 'Dashboard Overview'}
                  {activeTab === 'users' && 'User Management'}
                  {activeTab === 'orders' && 'Orders & Projects'}
                  {activeTab === 'performance' && 'Seller Performance'}
                </h2>
                <p className="text-gray-600 mt-1">
                  {activeTab === 'dashboard' && 'Summary of platform activity and metrics'}
                  {activeTab === 'users' && 'Manage all buyers and sellers on the platform'}
                  {activeTab === 'orders' && 'Track and manage all active orders and projects'}
                  {activeTab === 'performance' && 'Monitor seller ratings and performance metrics'}
                </p>
              </div>
              <button 
                className={`bg-[${primaryColor}] text-white px-4 py-2 rounded-lg hover:bg-[#FFA500] hidden md:block transition-colors`}
              >
                Generate Report
              </button>
            </div>
          </div>

          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;