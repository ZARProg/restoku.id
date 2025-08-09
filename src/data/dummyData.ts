import { MenuItem, Order, Transaction, DailyStats, RestaurantInfo, User } from '../types';

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Nasi Goreng Spesial',
    price: 25000,
    category: 'makanan',
    image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=800',
    available: true,
    description: 'Nasi goreng dengan telur, ayam, dan sayuran segar'
  },
  {
    id: '2',
    name: 'Ayam Bakar Madu',
    price: 35000,
    category: 'makanan',
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800',
    available: true,
    description: 'Ayam bakar dengan bumbu madu spesial'
  },
  {
    id: '3',
    name: 'Sate Ayam',
    price: 30000,
    category: 'makanan',
    image: 'https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg?auto=compress&cs=tinysrgb&w=800',
    available: false,
    description: '10 tusuk sate ayam dengan bumbu kacang'
  },
  {
    id: '4',
    name: 'Es Teh Manis',
    price: 8000,
    category: 'minuman',
    image: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=800',
    available: true,
    description: 'Es teh manis segar'
  },
  {
    id: '5',
    name: 'Jus Jeruk',
    price: 15000,
    category: 'minuman',
    image: 'https://images.pexels.com/photos/1553978/pexels-photo-1553978.jpeg?auto=compress&cs=tinysrgb&w=800',
    available: true,
    description: 'Jus jeruk segar tanpa pengawet'
  },
  {
    id: '6',
    name: 'Kopi Hitam',
    price: 12000,
    category: 'minuman',
    image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800',
    available: true,
    description: 'Kopi hitam arabika premium'
  }
];

export const orders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-001',
    tableNumber: 5,
    items: [
      { menuId: '1', name: 'Nasi Goreng Spesial', quantity: 2, price: 25000 },
      { menuId: '4', name: 'Es Teh Manis', quantity: 2, price: 8000 }
    ],
    status: 'dimasak',
    total: 66000,
    timestamp: new Date('2025-01-15T10:30:00')
  },
  {
    id: '2',
    orderNumber: 'ORD-002',
    tableNumber: 3,
    items: [
      { menuId: '2', name: 'Ayam Bakar Madu', quantity: 1, price: 35000 },
      { menuId: '5', name: 'Jus Jeruk', quantity: 1, price: 15000 }
    ],
    status: 'siap',
    total: 50000,
    timestamp: new Date('2025-01-15T11:15:00')
  },
  {
    id: '3',
    orderNumber: 'ORD-003',
    tableNumber: 8,
    items: [
      { menuId: '1', name: 'Nasi Goreng Spesial', quantity: 1, price: 25000 },
      { menuId: '6', name: 'Kopi Hitam', quantity: 1, price: 12000 }
    ],
    status: 'menunggu',
    total: 37000,
    timestamp: new Date('2025-01-15T12:00:00')
  },
  {
    id: '4',
    orderNumber: 'ORD-004',
    tableNumber: 12,
    items: [
      { menuId: '2', name: 'Ayam Bakar Madu', quantity: 2, price: 35000 },
      { menuId: '4', name: 'Es Teh Manis', quantity: 2, price: 8000 }
    ],
    status: 'selesai',
    total: 86000,
    timestamp: new Date('2025-01-15T09:45:00')
  }
];

export const dailyStats: DailyStats = {
  totalRevenue: 1250000,
  totalOrders: 28,
  averageOrder: 44642
};

export const transactions: Transaction[] = [
  {
    id: '1',
    timestamp: new Date('2025-01-15T09:45:00'),
    items: 'Ayam Bakar Madu x2, Es Teh Manis x2',
    quantity: 4,
    total: 86000
  },
  {
    id: '2',
    timestamp: new Date('2025-01-15T10:30:00'),
    items: 'Nasi Goreng Spesial x2, Es Teh Manis x2',
    quantity: 4,
    total: 66000
  },
  {
    id: '3',
    timestamp: new Date('2025-01-15T11:15:00'),
    items: 'Ayam Bakar Madu x1, Jus Jeruk x1',
    quantity: 2,
    total: 50000
  }
];

export const restaurantInfo: RestaurantInfo = {
  name: 'Warung Bahagia',
  address: 'Jl. Merdeka No. 123, Jakarta',
  phone: '021-12345678',
  email: 'info@warungbahagia.com'
};

export const users: User[] = [
  {
    id: '1',
    username: 'admin',
    role: 'admin',
    email: 'admin@warungbahagia.com'
  },
  {
    id: '2',
    username: 'staff1',
    role: 'staff',
    email: 'staff1@warungbahagia.com'
  }
];

export const revenueData = [
  { day: 'Senin', revenue: 850000 },
  { day: 'Selasa', revenue: 920000 },
  { day: 'Rabu', revenue: 780000 },
  { day: 'Kamis', revenue: 1100000 },
  { day: 'Jumat', revenue: 1350000 },
  { day: 'Sabtu', revenue: 1600000 },
  { day: 'Minggu', revenue: 1450000 }
];