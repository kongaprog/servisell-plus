export enum ProductCondition {
  NEW = 'Nuevo',
  USED = 'De Uso'
}

export enum DeviceType {
  MOBILE = 'Móvil',
  TABLET = 'Tablet',
  LAPTOP = 'Laptop'
}

export enum PartType {
  SCREEN = 'Pantalla',
  BATTERY = 'Batería',
  PORT = 'Puerto de Carga',
  STORAGE = 'Almacenamiento',
  RAM = 'Memoria RAM',
  OTHER = 'Otros'
}

export interface SheetProduct {
  id: string;
  nombre: string;
  descripcion: string; // <--- IMPORTANTE: Así se llama en tu Excel
  categoria: string;
  precio_pieza: string | number;
  precio_full: string | number;
  imagen: string;
  visible: string;
  estado: string;
}

export interface Product {
  id: string;
  title: string;
  description: string; // <--- IMPORTANTE: Así se usa en la App
  brand: string;
  deviceType: DeviceType;
  partType: PartType;
  condition: ProductCondition;
  pricePartOnly: number;
  priceInstalled: number;
  imageUrl: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  isInstalled: boolean;
  price: number;
  quantity: number;
}