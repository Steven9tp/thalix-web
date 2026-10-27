import { Product, FashionSizeOption, CartItem } from '../types';
import { 
  FASHION_PRODUCTS, 
  MDF_PRODUCTS, 
  SYSTEMS_PRODUCTS, 
  GAMING_PRODUCTS 
} from '../constants';

const WC_URL = import.meta.env.VITE_WC_URL || 'https://proyectoxg2.site';
const WC_KEY = import.meta.env.VITE_WC_CONSUMER_KEY || 'ck_2b15472aa13af93ec558f673d4465f93d0a293b5';
const WC_SECRET = import.meta.env.VITE_WC_CONSUMER_SECRET || 'cs_e574332b7e2b7226e976ca7f928f045368802d45';

export interface WCProductRaw {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  price: string;
  regular_price: string;
  sale_price: string;
  description: string;
  short_description: string;
  stock_quantity: number | null;
  in_stock?: boolean;
  stock_status?: string;
  average_rating: string;
  rating_count: number;
  categories: { id: number; name: string; slug: string }[];
  images: { id: number; src: string; name: string; alt: string }[];
  attributes: { id: number; name: string; options: string[] }[];
}

/**
 * Strip HTML tags from WooCommerce rich descriptions
 */
function cleanHtml(html: string): string {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

/**
 * Normalize WooCommerce category slugs to our internal category types
 */
function mapCategory(categories: { slug: string; name: string }[]): 'fashion' | 'mdf' | 'systems' | 'gaming' {
  const slugs = categories.map(c => (c.slug + ' ' + c.name).toLowerCase());
  
  for (const item of slugs) {
    if (item.includes('mdf') || item.includes('madera') || item.includes('laser') || item.includes('mueble')) {
      return 'mdf';
    }
    if (item.includes('sys') || item.includes('sistem') || item.includes('soft') || item.includes('tech')) {
      return 'systems';
    }
    if (item.includes('gam') || item.includes('juego') || item.includes('consola')) {
      return 'gaming';
    }
    if (item.includes('fash') || item.includes('moda') || item.includes('ropa') || item.includes('textil')) {
      return 'fashion';
    }
  }
  return 'fashion';
}

/**
 * Map raw WooCommerce product object to our application Product interface
 */
export function mapWCProduct(wc: WCProductRaw): Product {
  const category = mapCategory(wc.categories || []);
  const cleanedDesc = cleanHtml(wc.short_description) || cleanHtml(wc.description) || 'Producto de alta calidad Thalix.';
  const cleanedLongDesc = cleanHtml(wc.description) || cleanedDesc;
  
  const allImages = (wc.images && wc.images.length > 0)
    ? wc.images.map(img => img.src)
    : ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800'];

  const mainImage = allImages[0];
  const price = parseFloat(wc.price || wc.regular_price || '0') || 0;
  const rating = parseFloat(wc.average_rating) || 5.0;
  const reviews = wc.rating_count ? `${wc.rating_count} Reviews` : 'Verificado';
  const stock = wc.stock_quantity ?? (wc.stock_status === 'instock' ? 50 : 0);

  // Extract attributes (Sizes / Colors / Plans / Options)
  let sizes: FashionSizeOption[] | undefined = undefined;
  let options: { name: string; image?: string; priceModifier?: number }[] | undefined = undefined;
  let plans: { name: string; price: number; period: 'monthly' | 'yearly' }[] | undefined = undefined;

  const sizeAttr = wc.attributes?.find(a => a.name.toLowerCase().includes('talla') || a.name.toLowerCase().includes('size'));
  const colorAttr = wc.attributes?.find(a => a.name.toLowerCase().includes('color'));
  const optionAttr = wc.attributes?.find(a => a.name.toLowerCase().includes('opcion') || a.name.toLowerCase().includes('acabado') || a.name.toLowerCase().includes('material'));

  if (category === 'fashion') {
    const sizeList = sizeAttr?.options || ['S', 'M', 'L', 'XL'];
    const colorList = colorAttr?.options || ['Negro Noir', 'Blanco Ártico'];
    
    sizes = sizeList.map(s => ({
      size: s,
      colors: colorList.map((c, idx) => ({
        name: c,
        hex: c.toLowerCase().includes('blanco') ? '#f4f4f5' : (c.toLowerCase().includes('gris') ? '#52525b' : '#18181b'),
        stock: Math.max(1, Math.floor(stock / (sizeList.length * colorList.length)) || 5),
        image: allImages[idx % allImages.length]
      }))
    }));
  } else if (category === 'mdf') {
    if (optionAttr?.options && optionAttr.options.length > 0) {
      options = optionAttr.options.map((opt, idx) => ({
        name: opt,
        image: allImages[idx % allImages.length],
        priceModifier: 0
      }));
    } else {
      options = [
        { name: 'Natural', image: mainImage, priceModifier: 0 },
        { name: 'Lacado Negro', image: mainImage, priceModifier: 5 }
      ];
    }
  } else if (category === 'systems') {
    plans = [
      { name: 'Mensual', price: price, period: 'monthly' },
      { name: 'Anual (Ahorro 20%)', price: Math.round(price * 10), period: 'yearly' }
    ];
  }

  return {
    id: String(wc.id),
    name: wc.name,
    price,
    image: mainImage,
    images: allImages,
    description: cleanedDesc,
    category,
    rating,
    reviews,
    longDescription: cleanedLongDesc,
    stock,
    deliveryDays: 3,
    sizes,
    options,
    plans
  };
}

/**
 * Fetch products from WooCommerce API
 */
export async function fetchWooCommerceProducts(): Promise<{
  all: Product[];
  fashion: Product[];
  mdf: Product[];
  systems: Product[];
  gaming: Product[];
}> {
  try {
    const authHeader = 'Basic ' + btoa(`${WC_KEY}:${WC_SECRET}`);
    const endpoint = `${WC_URL}/wp-json/wc/v3/products?per_page=100&status=publish`;

    const response = await fetch(endpoint, {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.warn(`[WooCommerce] API responded with status ${response.status}. Using fallback products.`);
      return getFallbackProducts();
    }

    const data: WCProductRaw[] = await response.json();
    
    if (!Array.isArray(data) || data.length === 0) {
      console.info('[WooCommerce] No products found in store yet. Using initial catalog.');
      return getFallbackProducts();
    }

    const mappedProducts = data.map(mapWCProduct);

    const fashion = mappedProducts.filter(p => p.category === 'fashion');
    const mdf = mappedProducts.filter(p => p.category === 'mdf');
    const systems = mappedProducts.filter(p => p.category === 'systems');
    const gaming = mappedProducts.filter(p => p.category === 'gaming');

    return {
      all: mappedProducts,
      fashion: fashion.length > 0 ? fashion : FASHION_PRODUCTS,
      mdf: mdf.length > 0 ? mdf : MDF_PRODUCTS,
      systems: systems.length > 0 ? systems : SYSTEMS_PRODUCTS,
      gaming: gaming.length > 0 ? gaming : GAMING_PRODUCTS
    };
  } catch (error) {
    console.error('[WooCommerce] Error fetching products:', error);
    return getFallbackProducts();
  }
}

/**
 * Create an order in WooCommerce
 */
export async function createWooCommerceOrder(orderPayload: {
  customer?: { name: string; email: string; phone?: string };
  items: CartItem[];
  shippingMethod: 'pickup' | 'delivery';
  shippingCost: number;
  total: number;
  paymentMethodTitle?: string;
}): Promise<any> {
  try {
    const authHeader = 'Basic ' + btoa(`${WC_KEY}:${WC_SECRET}`);
    const endpoint = `${WC_URL}/wp-json/wc/v3/orders`;

    const nameParts = (orderPayload.customer?.name || 'Cliente').trim().split(' ');
    const firstName = nameParts[0] || 'Cliente';
    const lastName = nameParts.slice(1).join(' ') || 'Web';

    const line_items = orderPayload.items.map(item => {
      const isNumericId = !isNaN(Number(item.id));
      const lineItem: any = {
        name: item.name + (item.selectedSize ? ` [Talla: ${item.selectedSize}]` : '') + (item.selectedColor ? ` [Color: ${item.selectedColor}]` : '') + (item.selectedOption ? ` [Opción: ${item.selectedOption}]` : ''),
        quantity: item.quantity,
        total: String((item.price * item.quantity).toFixed(2))
      };
      if (isNumericId) {
        lineItem.product_id = Number(item.id);
      }
      return lineItem;
    });

    const body = {
      payment_method: 'deuna_qr',
      payment_method_title: orderPayload.paymentMethodTitle || 'Deuna! / Banco Pichincha QR',
      set_paid: true,
      status: 'processing',
      billing: {
        first_name: firstName,
        last_name: lastName,
        email: orderPayload.customer?.email || 'cliente@proyectoxg2.site',
        phone: orderPayload.customer?.phone || '+593987654321',
        address_1: orderPayload.shippingMethod === 'pickup' ? 'Retiro en Tienda' : 'Entrega a Domicilio',
        country: 'EC'
      },
      shipping: {
        first_name: firstName,
        last_name: lastName,
        address_1: orderPayload.shippingMethod === 'pickup' ? 'Retiro en Tienda' : 'Entrega a Domicilio',
        country: 'EC'
      },
      line_items,
      shipping_lines: [
        {
          method_id: orderPayload.shippingMethod === 'pickup' ? 'local_pickup' : 'flat_rate',
          method_title: orderPayload.shippingMethod === 'pickup' ? 'Retiro en Tienda' : 'Envío a Domicilio',
          total: String(orderPayload.shippingCost.toFixed(2))
        }
      ]
    };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (res.ok) {
      const data = await res.json();
      console.log('[WooCommerce] Order created in WordPress with ID:', data.id);
      return data;
    } else {
      console.warn('[WooCommerce] Failed to create order in WordPress:', res.status);
    }
  } catch (err) {
    console.error('[WooCommerce] Error sending order to WordPress:', err);
  }
  return null;
}

/**
 * Default fallback products from constants
 */
export function getFallbackProducts() {
  return {
    all: [...FASHION_PRODUCTS, ...MDF_PRODUCTS, ...SYSTEMS_PRODUCTS, ...GAMING_PRODUCTS],
    fashion: FASHION_PRODUCTS,
    mdf: MDF_PRODUCTS,
    systems: SYSTEMS_PRODUCTS,
    gaming: GAMING_PRODUCTS
  };
}
