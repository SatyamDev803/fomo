import productsData from "@/data/products.json";
import { Product, Category, Occasion } from "@/types";

const products: Product[] = productsData as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function getPopularProducts(): Product[] {
  return products.filter((p) => p.isPopular);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function filterProducts(
  category?: Category,
  maxPrice?: number,
  occasion?: Occasion,
  sortBy?: "popular" | "price-asc" | "price-desc"
): Product[] {
  let filtered = category ? getProductsByCategory(category) : [...products];

  if (maxPrice) {
    filtered = filtered.filter((p) => p.price <= maxPrice);
  }

  if (occasion) {
    filtered = filtered.filter((p) => p.occasion.includes(occasion));
  }

  if (sortBy === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  return filtered;
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}
