import { Product } from "../types";

export const STORE_INFO = {
  address: "Av. Amazonas y Naciones Unidas, Quito, Ecuador",
  shippingCost: 5.00,
  reservationPercentage: 0.25,
  cancellationPenaltyPercentage: 0.15,
};

export const BANK_INFO = {
  bank: "Deuna! (Banco Pichincha)",
  accountType: "Digital",
  accountNumber: "thalix.hub",
  owner: "Thalix S.A.",
  id: "179XXXXXXX001",
  phone: "+593987654321",
  deunaUser: "thalix.hub",
  qrType: "Deuna Pay"
};

export const FASHION_PRODUCTS: Product[] = [
  { 
    id: 'f1', 
    name: 'Camiseta Oversize Noir', 
    price: 35, 
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800', 
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Algodón premium con corte arquitectónico.', 
    category: 'fashion', 
    rating: 5.0, 
    reviews: '1.2k Reviews', 
    stock: 50, 
    deliveryDays: 3,
    sizes: [
      {
        size: 'S',
        colors: [
          { name: 'Negro Noir', hex: '#18181b', stock: 12, image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800' },
          { name: 'Blanco Ártico', hex: '#f4f4f5', stock: 8, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800' },
          { name: 'Gris Carbón', hex: '#52525b', stock: 5, image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800' }
        ]
      },
      {
        size: 'M',
        colors: [
          { name: 'Negro Noir', hex: '#18181b', stock: 18, image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800' },
          { name: 'Blanco Ártico', hex: '#f4f4f5', stock: 15, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800' },
          { name: 'Gris Carbón', hex: '#52525b', stock: 9, image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800' },
          { name: 'Beige Arena', hex: '#d4b996', stock: 6, image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800' }
        ]
      },
      {
        size: 'L',
        colors: [
          { name: 'Negro Noir', hex: '#18181b', stock: 14, image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800' },
          { name: 'Blanco Ártico', hex: '#f4f4f5', stock: 0, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800' },
          { name: 'Gris Carbón', hex: '#52525b', stock: 7, image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800' }
        ]
      },
      {
        size: 'XL',
        colors: [
          { name: 'Negro Noir', hex: '#18181b', stock: 6, image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800' },
          { name: 'Blanco Ártico', hex: '#f4f4f5', stock: 4, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800' },
          { name: 'Gris Carbón', hex: '#52525b', stock: 0, image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800' }
        ]
      },
      {
        size: 'XXL',
        colors: [
          { name: 'Negro Noir', hex: '#18181b', stock: 3, image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800' },
          { name: 'Blanco Ártico', hex: '#f4f4f5', stock: 2, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800' }
        ]
      }
    ]
  },
  { 
    id: 'f2', 
    name: 'Hoodie Tech-Minimal', 
    price: 65, 
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800', 
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1556821840-410d37eac146?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Tejido técnico repelente al agua y diseño futurista.', 
    category: 'fashion', 
    rating: 4.8, 
    reviews: '850 Reviews', 
    stock: 20, 
    deliveryDays: 3,
    sizes: [
      {
        size: 'S',
        colors: [
          { name: 'Negro Obsidian', hex: '#09090b', stock: 5, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800' },
          { name: 'Gris Cemento', hex: '#71717a', stock: 4, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800' }
        ]
      },
      {
        size: 'M',
        colors: [
          { name: 'Negro Obsidian', hex: '#09090b', stock: 8, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800' },
          { name: 'Gris Cemento', hex: '#71717a', stock: 6, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800' },
          { name: 'Oliva Táctico', hex: '#3f483b', stock: 3, image: 'https://images.unsplash.com/photo-1556821840-410d37eac146?auto=format&fit=crop&q=80&w=800' }
        ]
      },
      {
        size: 'L',
        colors: [
          { name: 'Negro Obsidian', hex: '#09090b', stock: 6, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800' },
          { name: 'Gris Cemento', hex: '#71717a', stock: 0, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800' },
          { name: 'Oliva Táctico', hex: '#3f483b', stock: 5, image: 'https://images.unsplash.com/photo-1556821840-410d37eac146?auto=format&fit=crop&q=80&w=800' }
        ]
      },
      {
        size: 'XL',
        colors: [
          { name: 'Negro Obsidian', hex: '#09090b', stock: 3, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800' },
          { name: 'Oliva Táctico', hex: '#3f483b', stock: 2, image: 'https://images.unsplash.com/photo-1556821840-410d37eac146?auto=format&fit=crop&q=80&w=800' }
        ]
      }
    ]
  },
  { 
    id: 'f3', 
    name: 'Pantalón Cargo Stealth', 
    price: 85, 
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800', 
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Múltiples bolsillos ocultos y silueta ajustada.', 
    category: 'fashion', 
    rating: 4.9, 
    reviews: '2.1k Reviews', 
    stock: 15, 
    deliveryDays: 3,
    sizes: [
      {
        size: '28',
        colors: [
          { name: 'Negro Táctico', hex: '#18181b', stock: 4, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800' },
          { name: 'Verde Militar', hex: '#3f483b', stock: 2, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800' }
        ]
      },
      {
        size: '30',
        colors: [
          { name: 'Negro Táctico', hex: '#18181b', stock: 8, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800' },
          { name: 'Verde Militar', hex: '#3f483b', stock: 5, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800' },
          { name: 'Beige Desierto', hex: '#b89f80', stock: 3, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800' }
        ]
      },
      {
        size: '32',
        colors: [
          { name: 'Negro Táctico', hex: '#18181b', stock: 10, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800' },
          { name: 'Verde Militar', hex: '#3f483b', stock: 6, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800' },
          { name: 'Beige Desierto', hex: '#b89f80', stock: 4, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800' }
        ]
      },
      {
        size: '34',
        colors: [
          { name: 'Negro Táctico', hex: '#18181b', stock: 5, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800' },
          { name: 'Verde Militar', hex: '#3f483b', stock: 0, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800' }
        ]
      }
    ]
  },
  { 
    id: 'f4', 
    name: 'Chaqueta Cyber-Shell', 
    price: 125, 
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800', 
    images: [
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Protección total con estética urbana avanzada.', 
    category: 'fashion', 
    rating: 5.0, 
    reviews: '420 Reviews', 
    stock: 10, 
    deliveryDays: 3,
    sizes: [
      {
        size: 'S',
        colors: [
          { name: 'Negro Matte', hex: '#000000', stock: 3, image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800' },
          { name: 'Plata Reflectivo', hex: '#cbd5e1', stock: 2, image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=800' }
        ]
      },
      {
        size: 'M',
        colors: [
          { name: 'Negro Matte', hex: '#000000', stock: 5, image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800' },
          { name: 'Plata Reflectivo', hex: '#cbd5e1', stock: 4, image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=800' },
          { name: 'Azul Medianoche', hex: '#0f172a', stock: 3, image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800' }
        ]
      },
      {
        size: 'L',
        colors: [
          { name: 'Negro Matte', hex: '#000000', stock: 4, image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800' },
          { name: 'Plata Reflectivo', hex: '#cbd5e1', stock: 0, image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=800' }
        ]
      }
    ]
  },
  { 
    id: 'f5', 
    name: 'Gorra Matrix-Grid', 
    price: 25, 
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=800', 
    images: [
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1534215754734-18e55d13ce35?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Accesorio esencial con patrón reflectante.', 
    category: 'fashion', 
    rating: 4.7, 
    reviews: '1.5k Reviews', 
    stock: 100, 
    deliveryDays: 3,
    sizes: [
      {
        size: 'Unitalla',
        colors: [
          { name: 'Negro Matrix', hex: '#18181b', stock: 45, image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=800' },
          { name: 'Blanco Ártico', hex: '#f8fafc', stock: 35, image: 'https://images.unsplash.com/photo-1534215754734-18e55d13ce35?auto=format&fit=crop&q=80&w=800' },
          { name: 'Gris Carbón', hex: '#52525b', stock: 20, image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=800' }
        ]
      }
    ]
  },
  { 
    id: 'f6', 
    name: 'Botas Exo-Stride', 
    price: 185, 
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800', 
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Calzado ergonómico con suela de tracción extrema.', 
    category: 'fashion', 
    rating: 4.9, 
    reviews: '600 Reviews', 
    stock: 5, 
    deliveryDays: 3,
    sizes: [
      {
        size: '39',
        colors: [
          { name: 'Negro Carbón', hex: '#18181b', stock: 2, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800' },
          { name: 'Gris Militar', hex: '#475569', stock: 1, image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800' }
        ]
      },
      {
        size: '40',
        colors: [
          { name: 'Negro Carbón', hex: '#18181b', stock: 3, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800' },
          { name: 'Gris Militar', hex: '#475569', stock: 0, image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800' }
        ]
      },
      {
        size: '41',
        colors: [
          { name: 'Negro Carbón', hex: '#18181b', stock: 4, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800' },
          { name: 'Gris Militar', hex: '#475569', stock: 2, image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800' }
        ]
      },
      {
        size: '42',
        colors: [
          { name: 'Negro Carbón', hex: '#18181b', stock: 5, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800' },
          { name: 'Gris Militar', hex: '#475569', stock: 3, image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800' }
        ]
      },
      {
        size: '43',
        colors: [
          { name: 'Negro Carbón', hex: '#18181b', stock: 2, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800' },
          { name: 'Gris Militar', hex: '#475569', stock: 1, image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800' }
        ]
      }
    ]
  }
];

export const MDF_PRODUCTS: Product[] = [
  { 
    id: 'm1', 
    name: 'Panel Decorativo Hexa', 
    price: 45, 
    image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&q=80&w=800', 
    images: [
      'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Diseño geométrico moderno en MDF de 6mm.', 
    category: 'mdf', 
    rating: 4.7, 
    reviews: '420 Reviews',
    stock: 12,
    deliveryDays: 3,
    longDescription: 'Panel de pared modular con patrón hexagonal. Ideal para oficinas o salas de estar. Fabricado con MDF de alta densidad y corte láser de precisión.',
    options: [
      { name: 'Natural', image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&q=80&w=800', priceModifier: 0 },
      { name: 'Negro Mate', image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&q=80&w=800', priceModifier: 5.00 },
      { name: 'Blanco Ártico', image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800', priceModifier: 5.00 },
      { name: 'Roble', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800', priceModifier: 8.00 },
      { name: 'Nogal', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800', priceModifier: 10.00 }
    ]
  },
  { 
    id: 'm2', 
    name: 'Lámpara Minimal Wood', 
    price: 35, 
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800', 
    description: 'Iluminación ambiental con patrones de corte láser.', 
    category: 'mdf', 
    rating: 4.9, 
    reviews: '310 Reviews',
    stock: 8,
    deliveryDays: 3,
    longDescription: 'Lámpara de mesa desmontable. Los patrones proyectan sombras artísticas en las paredes. Incluye kit eléctrico básico.',
    options: [
      { name: 'Natural', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800', priceModifier: 0 },
      { name: 'Negro', image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&q=80&w=800', priceModifier: 4.00 },
      { name: 'Rojo Cereza', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800', priceModifier: 6.00 }
    ]
  },
  { 
    id: 'm3', 
    name: 'Organizador Zen Pro', 
    price: 25, 
    image: 'https://images.unsplash.com/photo-1581447100595-3773d52d302f?auto=format&fit=crop&q=80&w=800', 
    description: 'Escritorio limpio y organizado con estilo.', 
    category: 'mdf', 
    rating: 5.0, 
    reviews: '150 Reviews',
    stock: 0, // Out of stock to test reservation
    deliveryDays: 3,
    longDescription: 'Organizador de escritorio compacto con compartimentos para smartphone, bolígrafos y notas. Acabado suave al tacto.',
    options: [
      { name: 'Natural', image: 'https://images.unsplash.com/photo-1581447100595-3773d52d302f?auto=format&fit=crop&q=80&w=800', priceModifier: 0 },
      { name: 'Gris Espacial', image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&q=80&w=800', priceModifier: 3.00 },
      { name: 'Azul Cobalto', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800', priceModifier: 5.00 }
    ]
  },
  { 
    id: 'm4', 
    name: 'Reloj de Pared Fractal', 
    price: 55, 
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&q=80&w=800', 
    description: 'Arte cinético en madera para tu hogar.', 
    category: 'mdf', 
    rating: 4.8, 
    reviews: '200 Reviews',
    stock: 5,
    deliveryDays: 3,
    longDescription: 'Reloj de pared con diseño fractal complejo. Mecanismo silencioso de alta calidad.',
    options: [
      { name: 'Natural', image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&q=80&w=800', priceModifier: 0 },
      { name: 'Dorado', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=800', priceModifier: 12.00 },
      { name: 'Plata', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=800', priceModifier: 10.00 }
    ]
  },
  { 
    id: 'm5', 
    name: 'Soporte Laptop Ergo', 
    price: 30, 
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800', 
    description: 'Mejora tu postura con diseño artesanal.', 
    category: 'mdf', 
    rating: 4.6, 
    reviews: '550 Reviews',
    stock: 25,
    deliveryDays: 3,
    longDescription: 'Soporte para laptop desmontable y ligero. Mejora la ventilación y la ergonomía.',
    options: [
      { name: 'Natural', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800', priceModifier: 0 },
      { name: 'Wengué', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800', priceModifier: 5.00 }
    ]
  },
  { 
    id: 'm6', 
    name: 'Cuadro Mapa Mundi', 
    price: 120, 
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=800', 
    description: 'Mapa del mundo detallado en relieve.', 
    category: 'mdf', 
    rating: 5.0, 
    reviews: '80 Reviews',
    stock: 2,
    deliveryDays: 3,
    longDescription: 'Mapa mundi de gran formato en capas de MDF. Una pieza central impresionante para cualquier habitación.',
    options: [
      { name: 'Natural', image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=800', priceModifier: 0 },
      { name: 'Multicolor', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=800', priceModifier: 25.00 }
    ]
  }
];

export const INSPIRED_MDF_GALLERY = [
  {
    id: 'insp-1',
    title: 'Retratos Grabados',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    description: 'Tus fotos favoritas grabadas con precisión láser sobre madera real.'
  },
  {
    id: 'insp-2',
    title: 'Logos Corporativos',
    image: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&q=80&w=800',
    description: 'Identidad visual en relieve para oficinas y recepciones.'
  },
  {
    id: 'insp-3',
    title: 'Mapas Estelares',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800',
    description: 'El cielo de una noche especial capturado para siempre.'
  },
  {
    id: 'insp-4',
    title: 'Nombres en 3D',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800',
    description: 'Letras volumétricas personalizadas para eventos y decoración infantil.'
  },
  {
    id: 'insp-5',
    title: 'Trofeos Únicos',
    image: 'https://images.unsplash.com/photo-1578262825743-a4e402caab76?auto=format&fit=crop&q=80&w=800',
    description: 'Reconocimientos diseñados desde cero para momentos inolvidables.'
  },
  {
    id: 'insp-6',
    title: 'Maquetas Detalladas',
    image: 'https://images.unsplash.com/photo-1503387762-592dee58292b?auto=format&fit=crop&q=80&w=800',
    description: 'Proyectos arquitectónicos y diseños industriales a escala.'
  }
];

export const SYSTEMS_PRODUCTS: Product[] = [
  { 
    id: 's1', 
    name: 'Thalix ERP Básico', 
    price: 29, 
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', 
    description: 'Gestión esencial para pequeñas empresas.', 
    category: 'systems', 
    rating: 4.8, 
    reviews: '120 Reviews',
    stock: 999,
    deliveryDays: 0,
    longDescription: 'Sistema de planificación de recursos empresariales. Incluye módulos de facturación, compras y reportes básicos.',
    plans: [
      { name: 'Mensual', price: 29, period: 'monthly' },
      { name: 'Anual', price: 299, period: 'yearly' }
    ]
  },
  { 
    id: 's2', 
    name: 'Analytics Pro', 
    price: 59, 
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800', 
    description: 'Visualización de datos avanzada y reportes.', 
    category: 'systems', 
    rating: 5.0, 
    reviews: '85 Reviews',
    stock: 999,
    deliveryDays: 0,
    longDescription: 'Herramienta de Business Intelligence con dashboards en tiempo real e integración con múltiples fuentes de datos.',
    plans: [
      { name: 'Mensual', price: 59, period: 'monthly' },
      { name: 'Anual', price: 599, period: 'yearly' }
    ]
  },
  { 
    id: 's3', 
    name: 'Inventory Cloud', 
    price: 39, 
    image: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&q=80&w=800', 
    description: 'Control de stock en tiempo real multi-sede.', 
    category: 'systems', 
    rating: 4.9, 
    reviews: '210 Reviews',
    stock: 999,
    deliveryDays: 0,
    longDescription: 'Gestión de inventario en la nube. Sincronización automática entre almacenes y alertas de stock bajo.',
    plans: [
      { name: 'Mensual', price: 39, period: 'monthly' },
      { name: 'Anual', price: 399, period: 'yearly' }
    ]
  },
  { 
    id: 's4', 
    name: 'CRM Connect', 
    price: 49, 
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800', 
    description: 'Fideliza a tus clientes con herramientas inteligentes.', 
    category: 'systems', 
    rating: 4.7, 
    reviews: '150 Reviews',
    stock: 999,
    deliveryDays: 0,
    longDescription: 'Gestión de relaciones con clientes. Automatización de marketing y seguimiento de ventas.',
    plans: [
      { name: 'Mensual', price: 49, period: 'monthly' },
      { name: 'Anual', price: 499, period: 'yearly' }
    ]
  }
];

export const GAMING_PRODUCTS: Product[] = [
  { id: 'g1', name: 'Cyber Samurai', price: 120, image: 'https://images.unsplash.com/photo-1614726365930-627c75da663e?auto=format&fit=crop&q=80&w=800', description: 'Avatar legendario para el metaverso.', category: 'gaming', rating: 5.0, reviews: '3.2k Reviews', stock: 100, deliveryDays: 0 },
  { id: 'g2', name: 'Neon District', price: 450, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800', description: 'Terreno virtual en zona comercial prime.', category: 'gaming', rating: 4.9, reviews: '1.1k Reviews', stock: 50, deliveryDays: 0 },
  { id: 'g3', name: 'Void Blade', price: 85, image: 'https://images.unsplash.com/photo-1614726365612-6c1429d14c27?auto=format&fit=crop&q=80&w=800', description: 'Arma mítica con efectos visuales únicos.', category: 'gaming', rating: 4.8, reviews: '2.4k Reviews', stock: 200, deliveryDays: 0 },
  { id: 'g4', name: 'Mech Pilot', price: 150, image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800', description: 'Skin de piloto avanzado con animaciones.', category: 'gaming', rating: 5.0, reviews: '900 Reviews', stock: 75, deliveryDays: 0 },
  { id: 'g5', name: 'Star Cruiser', price: 800, image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800', description: 'Nave espacial de lujo para exploración.', category: 'gaming', rating: 4.9, reviews: '150 Reviews', stock: 10, deliveryDays: 0 }
];
