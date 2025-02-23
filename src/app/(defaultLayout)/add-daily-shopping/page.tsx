import { ShoppingListForm } from "@/components/addDailyShopping/ShoppingListForm";

export default async function ShoppingListPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Todays List</h1>
      <ShoppingListForm />
    </div>
  );
}
