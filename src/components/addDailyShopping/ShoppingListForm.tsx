"use client";
import { ShoppingList } from "@/types/shopoing.type";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { baseUrl } from "@/config/configs";
import { useEffect, useState } from "react";

export function ShoppingListForm() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ShoppingList>({
    defaultValues: {
      items: [{ name: "", cost: 0, quantity: 1, unit: "KG" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = async (data: ShoppingList) => {
    console.log(data);
    console.log(baseUrl);
  };

  const watchItems = watch("items");
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const cost = watchItems.reduce((sum, item) => sum + item.cost * item.quantity, 0);
    setTotalCost(cost);
  }, [watchItems]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="date">Date</Label>
        <Input className="w-fit" type="date" id="date" {...register("date", { required: "Date is required" })} />
        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
      </div>

      {fields.map((field, index) => (
        <Card key={field.id}>
          <CardHeader>
            <CardTitle>Item {index + 1}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor={`items.${index}.name`}>Item Name</Label>
              <Input {...register(`items.${index}.name` as const, { required: "Item name is required" })} />
              {errors.items?.[index]?.name && (
                <p className="text-red-500 text-sm">{errors.items[index]?.name?.message}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`items.${index}.cost`}>Cost</Label>
                <Input
                  type="number"
                  step="0.01"
                  {...register(`items.${index}.cost` as const, {
                    required: "Cost is required",
                    min: { value: 0, message: "Cost must be positive" },
                  })}
                />
                {errors.items?.[index]?.cost && (
                  <p className="text-red-500 text-sm">{errors.items[index]?.cost?.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor={`items.${index}.quantity`}>Quantity</Label>
                <Input
                  type="number"
                  {...register(`items.${index}.quantity` as const, {
                    required: "Quantity is required",
                    min: { value: 1, message: "Quantity must be at least 1" },
                  })}
                />
                {errors.items?.[index]?.quantity && (
                  <p className="text-red-500 text-sm">{errors.items[index]?.quantity?.message}</p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor={`items.${index}.unit`}>Unit</Label>
              <Select
                onValueChange={(value) => {
                  const event = {
                    target: { value, name: `items.${index}.unit` },
                  };
                  register(`items.${index}.unit` as const).onChange(event);
                }}
                defaultValue={field.unit}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="N/A">N/A</SelectItem>
                  <SelectItem value="KG">KG</SelectItem>
                  <SelectItem value="Liter">Liter</SelectItem>
                  <SelectItem value="Gram">Gram</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {index > 0 && (
              <Button type="button" variant="destructive" onClick={() => remove(index)}>
                Remove Item
              </Button>
            )}
          </CardContent>
        </Card>
      ))}

      <Button type="button" onClick={() => append({ name: "", cost: 0, quantity: 1, unit: "KG" })}>
        Add Item
      </Button>

      <div className="text-xl font-bold">Total Cost: ${totalCost.toFixed(2)}</div>

      <Button type="submit">Save Shopping List</Button>
    </form>
  );
}
