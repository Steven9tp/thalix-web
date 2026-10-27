export type View = 'landing' | 'fashion' | 'mdf' | 'systems' | 'gaming' | 'about' | 'profile' | 'personalized' | 'contact';

export interface FashionColorOption {
  name: string;
  hex: string;
  stock: number;
  image?: string;
}

export interface FashionSizeOption {
  size: string;
  colors: FashionColorOption[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images?: string[]; // Multiple images for auto-cycling
  description: string;
  category: 'fashion' | 'mdf' | 'systems' | 'gaming';
  rating?: number;
  reviews?: string;
  longDescription?: string;
  stock?: number;
  deliveryDays?: number;
  sizes?: FashionSizeOption[]; // For Fashion: sizes with respective colors and variant stocks
  options?: {
    name: string;
    image?: string;
    priceModifier?: number;
  }[]; // For MDF colors/finishes with specific images and prices
  plans?: {
    name: string;
    price: number;
    period: 'monthly' | 'yearly';
  }[]; // For Systems
}

export interface CartItem extends Product {
  cartItemId?: string;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  selectedOption?: string;
  selectedPlan?: string;
  isReservation?: boolean;
  reservationAmount?: number;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  items: string[];
  status: 'pending' | 'completed' | 'cancelled';
  shippingMethod?: 'pickup' | 'delivery';
  isReservation?: boolean;
  reservationAmount?: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  totalSpent: number;
  purchaseHistory: Order[];
}
