// Archivo: services/productService.ts

import { Product, ProductCondition, DeviceType, PartType } from '../types';
import { getProductsFromSupabase } from './supabaseService';

const SHEET_API_URL = "https://opensheet.elk.sh/1WkiGcqL3r-zKYh5B0xp1nLfg-bM0owz1_fKn3143a4o/Hoja%201";

// Datos de respaldo por si falla la conexión
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 'fb-1',
    title: 'Pantalla Samsung A32 (OLED Original)',
    description: 'Pantalla de alta calidad con garantía.',
    brand: 'Samsung',
    deviceType: DeviceType.MOBILE,
    partType: PartType.SCREEN,
    condition: ProductCondition.NEW,
    pricePartOnly: 45,
    priceInstalled: 55,
    imageUrl: 'https://images.unsplash.com/photo-1610945265078-38584e10da74?w=500&q=80',
    inStock: true
  },
  // ... puedes dejar tus otros fallbacks aquí
];

const parsePrice = (price: string | number): number => {
  if (typeof price === 'number') return price;
  if (!price) return 0;
  const cleaned = price.toString().replace('$', '').replace(/,/g, '').trim();
  return parseFloat(cleaned) || 0;
};

// MEJORA: Busca en todo el texto (nombre + categoria) para detectar qué pieza es
const mapCategory = (text: string): PartType => {
  const c = (text || '').toLowerCase();
  if (c.includes('pantalla') || c.includes('display') || c.includes('lcd')) return PartType.SCREEN;
  if (c.includes('batería') || c.includes('bateria') || c.includes('battery')) return PartType.BATTERY;
  if (c.includes('carga') || c.includes('pin') || c.includes('flex')) return PartType.PORT;
  if (c.includes('disco') || c.includes('ssd') || c.includes('almacenamiento')) return PartType.STORAGE;
  if (c.includes('ram') || c.includes('memoria')) return PartType.RAM;
  return PartType.OTHER;
};

const mapCondition = (cond: string): ProductCondition => {
  const c = (cond || '').toLowerCase();
  if (c.includes('nuevo') || c.includes('new')) return ProductCondition.NEW;
  return ProductCondition.USED;
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    // 1. Intentar Supabase primero
    const supabaseData = await getProductsFromSupabase();
    if (supabaseData && supabaseData.length > 0) {
      return supabaseData;
    }

    // 2. Fallback a Google Sheets
    const response = await fetch(SHEET_API_URL);

    if (!response.ok) {
      console.warn('Google Sheet API no responde. Usando datos de ejemplo.');
      return FALLBACK_PRODUCTS;
    }

    const rawData = await response.json();

    if (!Array.isArray(rawData) || rawData.length === 0) {
      return FALLBACK_PRODUCTS;
    }

    // MAPEO CORREGIDO
    const inventory: Product[] = rawData
      .filter((item: any) => {
        const val = item.visible ? item.visible.toString().toUpperCase().trim() : '';
        return val === 'SI' || val === 'TRUE';
      })
      .map((item: any) => {
        // Combinamos nombre y categoria para detectar mejor el tipo de pieza
        const fullTextForDetection = (item.nombre || '') + ' ' + (item.categoria || '') + ' ' + (item.descripcion || '');
        
        return {
          id: item.id ? item.id.toString() : Math.random().toString(36).substr(2, 9),
          title: item.titulo || item.nombre || 'Producto sin nombre',
          description: item.descripcion || '', // ¡Agregado! Faltaba mapear esto
          brand: item.categoria || 'Genérico', // ¡Corregido! Ahora usa la columna categoria como Marca
          deviceType: DeviceType.MOBILE, 
          partType: mapCategory(fullTextForDetection), // ¡Mejorado! Detecta mejor si es pantalla/bateria
          condition: mapCondition(item.estado),
          pricePartOnly: parsePrice(item.precio_pieza),
          priceInstalled: parsePrice(item.precio_full),
          imageUrl: item.imagen || '',
          inStock: true
        };
      });

    return inventory.length > 0 ? inventory : FALLBACK_PRODUCTS;

  } catch (error) {
    console.error("Error al obtener productos:", error);
    return FALLBACK_PRODUCTS;
  }
};