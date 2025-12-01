import React from 'react';

export enum Role {
  GUEST = 'GUEST',
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  password?: string; // For mock auth
  avatar?: string;
  balance?: number; // For Seller/Admin context
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  stock: number;
  sellerId: string;
  description: string;
}

export interface Order {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Processing';
  items: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface NavItem {
  label: string;
  icon: React.ReactNode;
  view: string;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'order' | 'system' | 'alert';
}