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
import { useStore } from "@/hooks/store/use-store";
import { CategoryWithBillboardAndUser } from "@/types";

interface FilterPanelProps {
  selectedCategories: string[];
  selectedSizes: string[];
  selectedColors: string[];
  handleCategoryChange: (categoryId: string) => void;
  handleSizeChange: (size: string) => void;
  handleColorChange: (color: string) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedCategories,
  selectedSizes,
  selectedColors,
  handleCategoryChange,
  handleSizeChange,
  handleColorChange,
}) => {
  const isMediumDevice = useMediaQuery("(min-width: 768px)");

  const { Categories, colors, sizes } = useStore();

  const isCategorySelected = (
    category: CategoryWithBillboardAndUser
  ): boolean => {
    if (selectedCategories.includes(category.id)) return true;
    if (category.children) {
      return category.children.some((child: any) => isCategorySelected(child));
    }
    return false;
  };

  const renderCategory = (category: CategoryWithBillboardAndUser) => {
    const hasChildren = category.children && category.children.length > 0;
    const isSelected = isCategorySelected(category);
    return (
      <li key={category.id}>
        <div className="flex items-center gap-2">
          {category.parentId !== null && (
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => {
                handleCategoryChange(category.id);
              }}
            />
          )}
          <Label className="text-sm cursor-pointer capitalize">
            {category.name}
          </Label>
        </div>
        {hasChildren && (
          <ul className="ml-4 mt-2 space-y-1">
            {category.children.map((child: any) => renderCategory(child))}
          </ul>
        )}
      </li>
    );
  };

  const FilterContent = () => (
    <div className="py-4 space-y-8">
      {/* Category Filter */}
      <div className="flex flex-col gap-4">
        <h3 className="text-base font-medium">Category</h3>
        <ul className="space-y-1">
          {Categories?.filter((category) => category.parentId === null).map(
            (category) => renderCategory(category)
          )}
        </ul>
      </div>

      {/* Size Filter */}
      <div className="flex flex-col gap-4">
        <h3 className="text-base font-medium">Sizes</h3>
        <div className="grid gap-2">
          {sizes?.map((size, index) => (
            <div className="flex items-center gap-2" key={index}>
              <Checkbox
                checked={selectedSizes.includes(size.value)}
                onCheckedChange={() => handleSizeChange(size.value)}
              />
              <Label className="text-sm cursor-pointer capitalize">
                {size.value}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div className="flex flex-col gap-4">
        <h3 className="text-base font-medium">Colors</h3>
        <div className="grid gap-2">
          {colors?.map((color) => (
            <div className="flex items-center gap-2" key={color.id}>
              <Checkbox
                checked={selectedColors.includes(color.value)}
                onCheckedChange={() => handleColorChange(color.value)}
              />
              <div
                className="rounded-full h-5 w-5 border border-gray-300"
                style={{ backgroundColor: color.value }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return isMediumDevice ? (
    <div className="w-[160px] flex-shrink-0">
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
