export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'makanan' | 'minuman';
  image: string;
  available: boolean;
  description: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  tableNumber: number;
  items: OrderItem[];
  status: 'menunggu' | 'dimasak' | 'siap' | 'selesai';
  total: number;
  timestamp: Date;
}

export interface OrderItem {
  menuId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface DailyStats {
  totalRevenue: number;
  totalOrders: number;
  averageOrder: number;
}

export interface Transaction {
  id: string;
  timestamp: Date;
  items: string;
  quantity: number;
  total: number;
}

export interface RestaurantInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'staff';
  email: string;
}