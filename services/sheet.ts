import Papa from 'papaparse';
import { Product, ProductCondition, DeviceType, PartType, SheetProduct } from '../types';

// 👇 AQUÍ YA PUSE TU ENLACE REAL PARA QUE FUNCIONE DIRECTO 👇
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT01W_TfP1z_gUn95GLHFegpkwunvCL_Ckw-LA46VOoOQOmBb5z6Mgnws4z8F4ZGXdSASeHocUZHcp8/pub?gid=0&single=true&output=csv';

// Helper para mapear valores de categería a PartType
const mapCategoryToPartType = (category: string): PartType => {
  const categoryLower = category?.toLowerCase().trim() || '';
  const partTypeMap: Record<string, PartType> = {
    'pantalla': PartType.SCREEN,
    'batería': PartType.BATTERY,
    'puerto': PartType.PORT,
    'almacenamiento': PartType.STORAGE,
    'memoria': PartType.RAM,
    'ram': PartType.RAM,
  };
  return partTypeMap[categoryLower] || PartType.OTHER;
};

// Helper para mapear valores a DeviceType
const mapCategoryToDeviceType = (category: string): DeviceType => {
  const categoryLower = category?.toLowerCase().trim() || '';
  if (categoryLower.includes('móvil') || categoryLower.includes('mobile')) return DeviceType.MOBILE;
  if (categoryLower.includes('tablet')) return DeviceType.TABLET;
  if (categoryLower.includes('laptop') || categoryLower.includes('computadora')) return DeviceType.LAPTOP;
  return DeviceType.MOBILE; // default
};

// Helper para verificar si está visible (más flexible)
const isVisibleProduct = (visible: string | undefined): boolean => {
  if (!visible) return false;
  const visibleStr = String(visible).toLowerCase().trim();
  return visibleStr === 'true' || visibleStr === 'verdadero' || visibleStr === 'sí' || visibleStr === 'si';
};

export const getProductsFromSheet = async (): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(SHEET_CSV_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rawData = results.data as SheetProduct[];
        
        console.log("🔍 Total de filas recibidas:", rawData.length);
        console.log("🔍 PRIMER PRODUCTO RECIBIDO:", rawData[0]); 

        const products: Product[] = rawData
          .filter(item => {
            // Verifica que tenga id y que esté visible
            if (!item.id || !isVisibleProduct(item.visible)) {
              console.warn("⚠️ Producto filtrado:", { id: item.id, visible: item.visible });
              return false;
            }
            return true;
          })
          .map(item => {
            try {
              return {
                id: item.id?.trim() || `prod_${Date.now()}`,
                title: item.nombre?.trim() || 'Sin título',
                description: item.descripcion?.trim() || 'Consultar detalles en tienda.',
                brand: item.categoria?.trim() || 'N/A',
                deviceType: mapCategoryToDeviceType(item.categoria),
                partType: mapCategoryToPartType(item.categoria),
                condition: item.estado?.toLowerCase().includes('nuevo') ? ProductCondition.NEW : ProductCondition.USED,
                pricePartOnly: Number(item.precio_pieza) || 0,
                priceInstalled: Number(item.precio_full) || 0,
                imageUrl: item.imagen?.trim() || 'https://via.placeholder.com/150',
                inStock: true
              };
            } catch (err) {
              console.error("❌ Error mapeando producto:", item, err);
              return null;
            }
          })
          .filter((product): product is Product => product !== null);

        console.log("✅ Total productos cargados:", products.length);
        if (products.length === 0) {
          console.warn("⚠️ ADVERTENCIA: No se cargaron productos. Revisa que la columna 'visible' tenga valores 'TRUE' o 'VERDADERO'");
        }
        resolve(products);
      },
      error: (err) => {
        console.error('❌ Error de conexión:', err);
        reject(err);
      }
    });
  });
};