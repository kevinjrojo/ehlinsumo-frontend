export interface CategoryItem {
  name: string;
  subcategories: string[];
}

export const categories: CategoryItem[] = [
  {
    name: "Ferretería/Herramientas",
    subcategories: [
      "Destornilladores",
      "Taladros",
      "Llaves",
      "Cintas métricas",
    ],
  },
  {
    name: "Repuestos/Accesorios",
    subcategories: ["Pilas", "Enchufes", "Lámparas", "Accesorios"],
  },
  {
    name: "Hogar/Electro",
    subcategories: ["Heladeras", "Mesas", "Camas", "Electrodomésticos"],
  },
];
