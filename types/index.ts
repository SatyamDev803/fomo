export type Category = "her" | "him" | "family" | "kids" | "handmade" | "general";

export type Occasion =
  | "birthday"
  | "anniversary"
  | "wedding"
  | "congratulations"
  | "justbecause";

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: Category;
  occasion: Occasion[];
  images: string[];
  description: string;
  inStock: boolean;
  isPopular: boolean;
  isFeatured: boolean;
  tags: string[];
}

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: Category;
  giftMessage?: string;
  giftWrapping?: boolean;
}

export interface Order {
  orderId: string;
  customerName: string;
  phone: string;
  email: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pinCode: string;
  };
  items: CartItem[];
  subtotal: number;
  giftWrappingTotal: number;
  deliveryCharge: number;
  total: number;
  paymentStatus: "pending" | "paid" | "failed";
  orderStatus: "pending" | "packed" | "shipped" | "delivered";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: string;
}

export interface CategoryConfig {
  label: string;
  color: string;
  shade: number;
  emoji: string;
  bg: string;
  border: string;
  text: string;
}
