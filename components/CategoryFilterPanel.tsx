"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { FilterIcon } from "lucide-react";
import { CategoryPageWithProducts, ProductsWithCategoryAndUser } from "@/types";

interface FilterPanelProps {
  products: ProductsWithCategoryAndUser[];
  Category: CategoryPageWithProducts;
  selectedCategories: string[];
  selectedSizes: string[];
  selectedColors: string[];
  handleCategoryChange: (categoryId: string) => void;
  handleSizeChange: (size: string) => void;
  handleColorChange: (color: string) => void;
}

export const CategoryFilterPanel = ({
  products,
  Category,
  selectedCategories,
  selectedSizes,
  selectedColors,
  handleCategoryChange,
  handleSizeChange,
  handleColorChange,
}: FilterPanelProps) => {
  const isMediumDevice = useMediaQuery("(min-width: 768px)");
  console.log(products);
  const isCategorySelected = (category: CategoryPageWithProducts): boolean => {
    if (selectedCategories.includes(category.id)) return true;
    if (category.children) {
      return category.children.some((child: any) => isCategorySelected(child));
    }
    return false;
  };

  const renderCategory = (category: CategoryPageWithProducts) => {
    const hasChildren = category.children && category.children.length > 0;
    const isSelected = isCategorySelected(category);
    const isParent = category.children === null;
    return (
      <li key={category.id}>
        <div className="flex items-center gap-2">
          {!isParent && (
            <>
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => {
                  handleCategoryChange(category.id);
                }}
              />
              <Label className="text-sm cursor-pointer capitalize">
                {category.name}
              </Label>
            </>
          )}
        </div>
        {hasChildren && (
          <ul className="ml-4 mt-2 space-y-1">
            {category.children.map((child: any) => renderCategory(child))}
          </ul>
        )}
      </li>
    );
  };

  const uniqueSizes = Array.from(
    new Set(
      products.flatMap((product) =>
        product.variants.map((variant) => variant.size.value)
      )
    )
  );

  const uniqueColors = Array.from(
    new Set(
      products.flatMap((product) =>
        product.variants.map((variant) => variant.color.value)
      )
    )
  );

  const FilterContent = () => (
    <div className="py-4 space-y-8">
      {/* Category Filter */}
      {Category.children === null && (
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium">Category</h3>
          <ul className="space-y-1">{renderCategory(Category)}</ul>
        </div>
      )}

      {/* Size Filter */}
      <div className="flex flex-col gap-4">
        <h3 className="text-base font-medium">Sizes</h3>
        <div className="grid gap-2">
          {uniqueSizes.map((size, key) => (
            <div className="flex items-center gap-2" key={key}>
              <Checkbox
                checked={selectedSizes.includes(size)}
                onCheckedChange={() => handleSizeChange(size)}
              />
              <Label className="text-sm cursor-pointer capitalize">
                {size}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div className="flex flex-col gap-4">
        <h3 className="text-base font-medium">Colors</h3>
        <div className="grid gap-2">
          {uniqueColors.map((color, key) => (
            <div className="flex items-center gap-2" key={key}>
              <Checkbox
                checked={selectedColors.includes(color)}
                onCheckedChange={() => handleColorChange(color)}
              />
              <div
                className="rounded-full h-5 w-5 border border-gray-300"
                style={{ backgroundColor: color }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return isMediumDevice ? (
    <div className="w-52 flex-shrink-0">
      <div className="sticky top-[68px] py-4 rounded-md space-y-8">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <FilterContent />
      </div>
    </div>
  ) : (
    <Drawer>
      <DrawerTrigger className="fixed bottom-4 right-4 z-10 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90">
        <FilterIcon className="h-6 w-6" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <h2 className="text-lg font-semibold">Filters</h2>
        </DrawerHeader>
        <FilterContent />
        <DrawerClose className="absolute top-4 right-4">
          <button className="p-2 rounded-md hover:bg-accent">
            <span className="sr-only">Close</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};
