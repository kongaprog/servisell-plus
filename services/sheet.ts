import Papa from 'papaparse';
import { Product, ProductCondition, DeviceType, PartType, SheetProduct } from '../types';

// 👇 ASEGÚRATE DE QUE ESTE ENLACE SEA EL DE TU HOJA DE CÁLCULO PUBLICADA 👇
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT01W_TfP1z_gUn95GLHFegpkwunvCL_Ckw-LA46VOoOQOmBb5z6Mgnws4z8F4ZGXdSASeHocUZHcp8/pub?gid=0&single=true&output=csv';

// Helper inteligente: Busca la columna aunque tenga mayúsculas o espacios (ej: "Imagen ", "IMAGEN", "foto")
const getCol = (item: any, colNames: string[]): string => {
  if (!item) return '';
  const keys = Object.keys(item);
  
  // Busca alguna coincidencia entre las posibles columnas
  for (const col of colNames) {
    const foundKey = keys.find(k => k.toLowerCase().trim() === col.toLowerCase().trim());
    if (foundKey) return item[foundKey];
  }
  return '';
};

// Helper para mapear valores de categoría
const mapCategoryToPartType = (category: string): PartType => {
  const cat = category?.toLowerCase().trim() || '';
  if (cat.includes('pantalla') || cat.includes('display')) return PartType.SCREEN;
  if (cat.includes('batería') || cat.includes('bateria')) return PartType.BATTERY;
  if (cat.includes('puerto') || cat.includes('carga')) return PartType.PORT;
  if (cat.includes('almacenamiento') || cat.includes('disco')) return PartType.STORAGE;
  if (cat.includes('ram') || cat.includes('memoria')) return PartType.RAM;
  return PartType.OTHER;
};

// Helper para mapear valores a DeviceType
const mapCategoryToDeviceType = (category: string): DeviceType => {
  const cat = category?.toLowerCase().trim() || '';
  if (cat.includes('móvil') || cat.includes('movil') || cat.includes('celular') || cat.includes('iphone') || cat.includes('samsung')) return DeviceType.MOBILE;
  if (cat.includes('tablet') || cat.includes('ipad')) return DeviceType.TABLET;
  if (cat.includes('laptop') || cat.includes('pc') || cat.includes('macbook')) return DeviceType.LAPTOP;
  return DeviceType.MOBILE; // default
};

export const getProductsFromSheet = async (): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(SHEET_CSV_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rawData = results.data as any[];
        
        console.log("🔍 DIAGNÓSTICO DE IMÁGENES:");
        if (rawData.length > 0) {
           console.log("📋 Columnas detectadas en tu Excel:", Object.keys(rawData[0]));
           console.log("📸 Ejemplo de dato crudo fila 1:", rawData[0]);
        }

        const products: Product[] = rawData
          .filter(item => {
            // Usamos el helper para encontrar 'id' y 'visible' sin importar mayúsculas
            const id = getCol(item, ['id', 'codigo', 'sku']);
            const visible = getCol(item, ['visible', 'mostrar', 'publicado']);
            
            if (!id || !visible) return false;
            
            const visibleStr = String(visible).toLowerCase().trim();
            return visibleStr === 'true' || visibleStr === 'verdadero' || visibleStr === 'sí' || visibleStr === 'si' || visibleStr === 'yes';
          })
          .map(item => {
            try {
              // Buscamos la imagen en varias columnas posibles
              const rawImg = getCol(item, ['imagen', 'image', 'img', 'foto', 'url']);
              const nombre = getCol(item, ['nombre', 'producto', 'titulo', 'title']);
              const descripcion = getCol(item, ['descripcion', 'descripción', 'detalles']);
              const categoria = getCol(item, ['categoria', 'cat', 'marca']);
              const estado = getCol(item, ['estado', 'condicion', 'condition']);
              const precioPieza = getCol(item, ['precio_pieza', 'precio', 'costo']);
              const precioFull = getCol(item, ['precio_full', 'precio_instalado', 'full']);

              // Si la imagen viene vacía o da error, usamos un placeholder más fiable
              const validImg = rawImg && rawImg.trim().length > 5 ? rawImg.trim() : 'https://placehold.co/400x300/1e293b/d4af37?text=Sin+Foto';

              return {
                id: getCol(item, ['id', 'sku']).trim() || `prod_${Date.now()}`,
                title: nombre?.trim() || 'Producto Sin Nombre',
                description: descripcion?.trim() || 'Detalles en tienda.',
                brand: categoria?.trim() || 'Genérico',
                deviceType: mapCategoryToDeviceType(categoria),
                partType: mapCategoryToPartType(categoria),
                condition: estado?.toLowerCase().includes('nuevo') ? ProductCondition.NEW : ProductCondition.USED,
                pricePartOnly: Number(precioPieza) || 0,
                priceInstalled: Number(precioFull) || 0,
                imageUrl: validImg,
                inStock: true
              };
            } catch (err) {
              console.error("❌ Error procesando fila:", err);
              return null;
            }
          })
          .filter((product): product is Product => product !== null);

        console.log(`✅ ${products.length} productos procesados correctamente.`);
        resolve(products);
      },
      error: (err) => {
        console.error('❌ Error descargando Excel:', err);
        reject(err);
      }
    });
  });
};