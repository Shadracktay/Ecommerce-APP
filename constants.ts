import { Product, Order, User, Role } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Neon Cyber Headset',
    price: 299,
    category: 'Electronics',
    image: 'https://picsum.photos/400/400?random=1',
    rating: 4.8,
    reviews: 124,
    stock: 15,
    sellerId: 'u2', // Sarah Seller
    description: 'High-fidelity audio with active noise cancellation and RGB neon accents.'
  },
  {
    id: '2',
    name: 'Glass Mechanical Keyboard',
    price: 189,
    category: 'Electronics',
    image: 'https://picsum.photos/400/400?random=2',
    rating: 4.9,
    reviews: 89,
    stock: 42,
    sellerId: 'u2', // Sarah Seller
    description: 'Transparent chassis mechanical keyboard with custom linear switches.'
  },
  {
    id: '3',
    name: 'Minimalist Smart Watch',
    price: 450,
    category: 'Wearables',
    image: 'https://picsum.photos/400/400?random=3',
    rating: 4.5,
    reviews: 210,
    stock: 8,
    sellerId: 's2',
    description: 'Sleek design, 7-day battery life, and comprehensive health tracking.'
  },
  {
    id: '4',
    name: 'Holographic Backpack',
    price: 120,
    category: 'Fashion',
    image: 'https://picsum.photos/400/400?random=4',
    rating: 4.2,
    reviews: 56,
    stock: 100,
    sellerId: 's2',
    description: 'Reflective material that changes color based on viewing angle.'
  },
  {
    id: '5',
    name: 'Levitating Plant Pot',
    price: 85,
    category: 'Home',
    image: 'https://picsum.photos/400/400?random=5',
    rating: 4.7,
    reviews: 340,
    stock: 5,
    sellerId: 'u2', // Sarah Seller
    description: 'Magnetic levitation technology for a futuristic home garden.'
  },
  {
    id: '6',
    name: 'Ergonomic Mesh Chair',
    price: 599,
    category: 'Furniture',
    image: 'https://picsum.photos/400/400?random=6',
    rating: 4.6,
    reviews: 112,
    stock: 12,
    sellerId: 's3',
    description: 'Breathable mesh with 4D armrests and lumbar support.'
  },
  {
    id: '7',
    name: 'Organic Quantum Berries',
    price: 15,
    category: 'Food & Groceries',
    image: 'https://images.unsplash.com/photo-1615485925694-a6dd90a1d785?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    reviews: 42,
    stock: 50,
    sellerId: 'u2',
    description: 'Genetically enhanced berries that glow in the dark and provide 100% daily vitamins.'
  },
  {
    id: '8',
    name: 'Synthetic Wagyu Steak',
    price: 85,
    category: 'Food & Groceries',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
    reviews: 18,
    stock: 20,
    sellerId: 's2',
    description: 'Lab-grown premium wagyu beef, identical molecular structure, zero suffering.'
  },
  {
    id: '9',
    name: 'Neon Energy Drink',
    price: 5,
    category: 'Food & Groceries',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400',
    rating: 4.5,
    reviews: 156,
    stock: 200,
    sellerId: 's3',
    description: 'Electrolyte-infused sparkling water with bioluminescent properties.'
  }
];

export const MOCK_ORDERS: Order[] = [
  { id: '#ORD-7721', customerName: 'Alice Freeman', date: '2023-10-24', total: 450, status: 'Delivered', items: 2 },
  { id: '#ORD-7722', customerName: 'Bob Smith', date: '2023-10-25', total: 120, status: 'Shipped', items: 1 },
  { id: '#ORD-7723', customerName: 'Charlie Davis', date: '2023-10-25', total: 1200, status: 'Pending', items: 4 },
  { id: '#ORD-7724', customerName: 'Diana Prince', date: '2023-10-26', total: 299, status: 'Processing', items: 1 },
];

export const USERS: User[] = [
  { id: 'u1', name: 'Alex Buyer', email: 'alex@lumina.com', role: Role.BUYER, avatar: 'https://picsum.photos/100/100?random=10' },
  { id: 'u2', name: 'Sarah Seller', email: 'sarah@lumina.com', role: Role.SELLER, balance: 12540.50, avatar: 'https://picsum.photos/100/100?random=11' },
  { id: 'u3', name: 'Max Admin', email: 'admin@lumina.com', role: Role.ADMIN, avatar: 'https://picsum.photos/100/100?random=12' },
];