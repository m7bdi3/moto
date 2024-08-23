import {
  BookPlus,
  Settings,
  Receipt,
  LayoutGrid,
  LucideIcon,
  Package,
  Palette,
  Ruler,
  Image,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/admin",
          label: "Dashboard",
          active: pathname === "/admin",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "/admin/products",
          label: "Products",
          active: pathname.includes("/products"),
          icon: Package,
          submenus: [],
        },
        {
          href: "/admin/orders",
          label: "Orders",
          active: pathname.includes("/orders"),
          icon: Receipt,
          submenus: [],
        },
        {
          href: "/admin/categories",
          label: "Categories",
          active: pathname.includes("/categories"),
          icon: BookPlus,
          submenus: [],
        },
        {
          href: "/admin/billboards",
          label: "Billboards",
          active: pathname.includes("/billboards"),
          icon: Image,
          submenus: [],
        },
        {
          href: "/admin/colors",
          label: "Colors",
          active: pathname.includes("/colors"),
          icon: Palette,
          submenus: [],
        },
        {
          href: "/admin/sizes",
          label: "Sizes",
          active: pathname.includes("/sizes"),
          icon: Ruler,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/admin/settings",
          label: "Acount",
          active: pathname.includes("/settings"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
