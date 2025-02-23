export type ShoppingItem = {
    name: string;
    cost: number;
    quantity: number;
    unit: "KG" | "Liter" | "Gram";
  };
  
export  type ShoppingList = {
    date: string;
    items: ShoppingItem[];
  };
  