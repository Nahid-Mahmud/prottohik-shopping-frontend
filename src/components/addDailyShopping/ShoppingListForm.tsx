"use client";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type ShoppingItem = {
  name: string;
  cost: number;
  quantity: number;
  unit: "KG" | "Liter" | "Gram" | "N/A";
  group: string;
};

type ShoppingList = {
  date: string;
  items: ShoppingItem[];
  groups: string[];
  newGroup?: string;
};

export function ShoppingListForm() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ShoppingList>({
    defaultValues: {
      items: [{ name: "", cost: 0, quantity: 1, unit: "KG", group: "Group 1" }],
      groups: ["Group 1"],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const appendGroup = (group: string) => {
    setValue("groups", [...watchGroups, group]);
  };

  const onSubmit = async (data: ShoppingList) => {
    const groupedData = data.items.reduce((acc, item) => {
      const group = acc[item.group] || [];
      group.push(item);
      acc[item.group] = group;
      return acc;
    }, {} as Record<string, ShoppingList["items"]>);
    console.log(groupedData);
  };

  const watchItems = watch("items");
  const watchGroups = watch("groups");

  const totalCost = watchItems.reduce((sum, item) => sum + item.cost * item.quantity, 0);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Label htmlFor="date">Date</Label>
        <Input className="w-fit" type="date" id="date" {...register("date", { required: "Date is required" })} />
        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
      </div>

      {watchGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-nowrap">Group {groupIndex + 1}:</h2>
            <Input
              {...register(`groups.${groupIndex}` as const, { required: "Group name is required" })}
              defaultValue={group}
            />
          </div>
          <div className="flex flex-col gap-4">
            {fields
              .filter((field) => field.group === group)
              .map((field, index) => (
                <Card key={field.id} className="shadow-none border-none">
                  <CardHeader>
                    <CardTitle>Item {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      <Label htmlFor={`items.${fields.findIndex((f) => f.id === field.id)}.name`}>Item Name</Label>
                      <Input
                        {...register(`items.${fields.findIndex((f) => f.id === field.id)}.name` as const, {
                          required: "Item name is required",
                        })}
                      />
                      {errors.items?.[fields.findIndex((f) => f.id === field.id)]?.name && (
                        <p className="text-red-500 text-sm">
                          {errors.items[fields.findIndex((f) => f.id === field.id)]?.name?.message}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`items.${fields.findIndex((f) => f.id === field.id)}.cost`}>Cost</Label>
                        <Input
                          type="number"
                          step="0.01"
                          {...register(`items.${fields.findIndex((f) => f.id === field.id)}.cost` as const, {
                            required: "Cost is required",
                            min: { value: 0, message: "Cost must be positive" },
                          })}
                        />
                        {errors.items?.[fields.findIndex((f) => f.id === field.id)]?.cost && (
                          <p className="text-red-500 text-sm">
                            {errors.items[fields.findIndex((f) => f.id === field.id)]?.cost?.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor={`items.${fields.findIndex((f) => f.id === field.id)}.quantity`}>Quantity</Label>
                        <Input
                          type="number"
                          {...register(`items.${fields.findIndex((f) => f.id === field.id)}.quantity` as const, {
                            required: "Quantity is required",
                            min: { value: 1, message: "Quantity must be at least 1" },
                          })}
                        />
                        {errors.items?.[fields.findIndex((f) => f.id === field.id)]?.quantity && (
                          <p className="text-red-500 text-sm">
                            {errors.items[fields.findIndex((f) => f.id === field.id)]?.quantity?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor={`items.${fields.findIndex((f) => f.id === field.id)}.unit`}>Unit</Label>
                      <Select
                        onValueChange={(value) =>
                          setValue(
                            `items.${fields.findIndex((f) => f.id === field.id)}.unit`,
                            value as "KG" | "Liter" | "Gram" | "N/A"
                          )
                        }
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
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => remove(fields.findIndex((f) => f.id === field.id))}
                        className="mt-4"
                      >
                        Remove Item
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
          <Button type="button" onClick={() => append({ name: "", cost: 0, quantity: 1, unit: "KG", group })}>
            Add Item to {group}
          </Button>
        </div>
      ))}

      <div>
        <Label htmlFor="newGroup">New Group Name</Label>
        <Input id="newGroup" {...register("newGroup", { required: "Group name is required" })} />
        {errors.newGroup && <p className="text-red-500 text-sm">{errors.newGroup.message}</p>}
      </div>
      <Button
        type="button"
        onClick={() => {
          const newGroup = watch("newGroup");
          if (newGroup) {
            appendGroup(newGroup);
            append({ name: "", cost: 0, quantity: 1, unit: "KG", group: newGroup });
            setValue("newGroup", ""); // Clear the input field
          }
        }}
      >
        Add New Group
      </Button>

      <div className="text-xl font-bold">Total Cost: ${totalCost.toFixed(2)}</div>

      <Button type="button" onClick={handleSubmit(onSubmit)}>
        Save Shopping List
      </Button>
    </div>
  );
}
