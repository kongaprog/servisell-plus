
import { Product, ProductCondition, DeviceType, PartType, SheetProduct } from '../types';

const SHEET_API_URL = "https://opensheet.elk.sh/1WkiGcqL3r-zKYh5B0xp1nLfg-bM0owz1_fKn3143a4o/Hoja%201";

// Fallback data prevents the app from looking broken if the Sheet API fails or is private
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 'fb-1',
    title: 'Pantalla Samsung A32 (OLED Original)',
    brand: 'Samsung',
    deviceType: DeviceType.MOBILE,
    partType: PartType.SCREEN,
    condition: ProductCondition.NEW,
    pricePartOnly: 45,
    priceInstalled: 55,
    imageUrl: 'https://images.unsplash.com/photo-1610945265078-38584e10da74?w=500&q=80',
    inStock: true
  },
  {
    id: 'fb-2',
    title: 'Batería iPhone 11 Pro Max (100% Salud)',
    brand: 'Apple',
    deviceType: DeviceType.MOBILE,
    partType: PartType.BATTERY,
    condition: ProductCondition.NEW,
    pricePartOnly: 25,
    priceInstalled: 35,
    imageUrl: 'https://images.unsplash.com/photo-1619946874381-e6c5c42e6605?w=500&q=80',
    inStock: true
  },
  {
    id: 'fb-3',
    title: 'Módulo de Carga Xiaomi Redmi Note 10',
    brand: 'Xiaomi',
    deviceType: DeviceType.MOBILE,
    partType: PartType.PORT,
    condition: ProductCondition.USED,
    pricePartOnly: 12,
    priceInstalled: 20,
    imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&q=80',
    inStock: true
  },
  {
    id: 'fb-4',
    title: 'SSD Kingston 480GB SATA',
    brand: 'Kingston',
    deviceType: DeviceType.LAPTOP,
    partType: PartType.STORAGE,
    condition: ProductCondition.NEW,
    pricePartOnly: 40,
    priceInstalled: 50,
    imageUrl: 'https://images.unsplash.com/photo-1597872252721-241263d190c8?w=500&q=80',
    inStock: true
  }
];

/**
 * Helper to parse price strings that might contain '$' or ','
 */
const parsePrice = (price: string | number): number => {
  if (typeof price === 'number') return price;
  if (!price) return 0;
  // Handle cases like "$ 50.00", "50,00", etc.
  const cleaned = price.toString().replace('$', '').replace(/,/g, '').trim();
  return parseFloat(cleaned) || 0;
};

/**
 * Helper to determine Category/PartType from string
 */
const mapCategory = (cat: string): PartType => {
  const c = (cat || '').toLowerCase();
  if (c.includes('pantalla') || c.includes('display') || c.includes('lcd')) return PartType.SCREEN;
  if (c.includes('batería') || c.includes('bateria') || c.includes('battery')) return PartType.BATTERY;
  if (c.includes('carga') || c.includes('pin') || c.includes('flex')) return PartType.PORT;
  if (c.includes('disco') || c.includes('ssd') || c.includes('almacenamiento')) return PartType.STORAGE;
  if (c.includes('ram') || c.includes('memoria')) return PartType.RAM;
  return PartType.OTHER;
};

/**
 * Helper to determine Condition
 */
const mapCondition = (cond: string): ProductCondition => {
  const c = (cond || '').toLowerCase();
  if (c.includes('nuevo') || c.includes('new')) return ProductCondition.NEW;
  return ProductCondition.USED;
};

import { getProductsFromSupabase } from './supabaseService';

export const getProducts = async (): Promise<Product[]> => {
  try {
    // 1. Try Supabase (Robust DB)
    const supabaseData = await getProductsFromSupabase();
    if (supabaseData && supabaseData.length > 0) {
      return supabaseData;
    }

    // 2. Fallback to Google Sheets (Legacy)
    const response = await fetch(SHEET_API_URL);

    if (!response.ok) {
      console.warn('Google Sheet API unreachable. Using fallback data. Ensure your Google Sheet is shared as "Anyone with the link".');
      return FALLBACK_PRODUCTS;
    }

    const rawData = await response.json();

    // Basic validation of response structure
    if (!Array.isArray(rawData) || rawData.length === 0) {
      console.warn('Google Sheet returned empty data. Using fallback data.');
      return FALLBACK_PRODUCTS;
    }

    // Check if 'visible' column exists (if the sheet is empty or headers are wrong, use fallback)
    // We check the first item to see if it has expected keys roughly
    const firstItem = rawData[0];
    if (!firstItem || typeof firstItem !== 'object') {
      return FALLBACK_PRODUCTS;
    }

    // Transform logic:
    // 1. Filter visible === 'SI' (case insensitive)
    // 2. Map to internal Product interface
    const inventory: Product[] = rawData
      .filter((item: any) => {
        const val = item.visible ? item.visible.toString().toUpperCase().trim() : '';
        return val === 'SI' || val === 'TRUE';
      })
      .map((item: any) => ({
        id: item.id ? item.id.toString() : Math.random().toString(36).substr(2, 9),
        title: item.titulo || item.nombre || 'Producto sin nombre',
        brand: 'General',
        deviceType: DeviceType.MOBILE,
        partType: mapCategory(item.categoria),
        condition: mapCondition(item.estado),
        pricePartOnly: parsePrice(item.precio_pieza),
        priceInstalled: parsePrice(item.precio_full),
        imageUrl: item.imagen || '',
        inStock: true
      }));

    if (inventory.length === 0) {
      console.log("Connected to sheet, but no products were marked 'visible=SI'. Returning fallback for demo.");
      return FALLBACK_PRODUCTS;
    }

    return inventory;

  } catch (error) {
    console.error("Failed to fetch products from Google Sheets:", error);
    // Return fallback so the UI doesn't break
    return FALLBACK_PRODUCTS;
  }
};
