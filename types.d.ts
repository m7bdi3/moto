import {
  Billboard,
  Product,
  User,
  Category,
  CategoryChild,
  ProductImages,
  ProductVariant,
  Size,
  Color,
} from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export type CategoryWithBillboardAndUser = {
  id: string;
  name: string;
  userId: string;
  billboardId: string | null;
  createdAt: Date;
  updatedAt: Date;
  parentId: string | null;
  billboard: {
    id: string;
    label: string;
    imageUrl: string;
  } | null;
  children: {
    id: string;
    name: string;
    parentId: string | null;
    billboard: {
      id: string;
      label: string;
      imageUrl: string;
    } | null;
  }[];
  parent: {
    id: string;
    name: string;
    billboard: {
      id: string;
      label: string;
      imageUrl: string;
    } | null;
  } | null;
};

export type ProductsWithCategoryAndUser = {
  id: string;
  name: string;
  description: string;
  price: Prisma.Decimal;
  isFeatured: boolean;
  isArchived: boolean;
  weightValue: string;
  sku: string;
  discount: Prisma.Decimal;
  userId: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  category: {
    id: string;
    name: string;
    parentId: string | null;
    parent: {
      id: string;
      name: string;
    } | null;
  };
  productImages: {
    imageUrl: string;
  }[];
  variants: {
    id: string;
    productId: string;
    colorId: string;
    sizeId: string;
    stock: number;
    price: Prisma.Decimal;
    color: {
      id: string;
      name: string;
      value: string;
    };
    size: {
      id: string;
      value: string;
    };
  }[];
  user: {
    email: string;
  };
};

export type CategoryPageWithProducts = {
  id: string;
  name: string;
  userId: string;
  billboardId: string | null;
  createdAt: Date;
  updatedAt: Date;
  children: {
    id: string;
    name: string;
    parentId: string | null;
    products: {
      id: string;
      name: string;
      description: string;
      price: Prisma.Decimal;
      isFeatured: boolean;
      isArchived: boolean;
      weightValue: string;
      sku: string;
      discount: Prisma.Decimal;
      userId: string;
      categoryId: string;
      createdAt: Date;
      updatedAt: Date;
      category: {
        id: string;
        name: string;
        parentId: string | null;
        parent: {
          id: string;
          name: string;
        } | null;
      };
      productImages: {
        imageUrl: string;
      }[];
      variants: {
        id: string;
        productId: string;
        colorId: string;
        sizeId: string;
        stock: number;
        price: Prisma.Decimal;
        color: {
          id: string;
          name: string;
          value: string;
        };
        size: {
          id: string;
          value: string;
        };
      }[];
      user: {
        email: string;
      };
    }[];
    billboard: {
      id: string;
      label: string;
      imageUrl: string;
    } | null;
  }[];
  parent: {
    id: string;
    name: string;
    billboard: {
      id: string;
      label: string;
      imageUrl: string;
    } | null;
  } | null;
  billboard: {
    id: string;
    label: string;
    imageUrl: string;
  } | null;
  products: {
    id: string;
    name: string;
    description: string;
    price: Prisma.Decimal;
    isFeatured: boolean;
    isArchived: boolean;
    weightValue: string;
    sku: string;
    discount: Prisma.Decimal;
    userId: string;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
    category: {
      id: string;
      name: string;
      parentId: string | null;
      parent: {
        id: string;
        name: string;
      } | null;
    };
    productImages: {
      imageUrl: string;
    }[];
    variants: {
      id: string;
      productId: string;
      colorId: string;
      sizeId: string;
      stock: number;
      price: Prisma.Decimal;
      color: {
        id: string;
        name: string;
        value: string;
      };
      size: {
        id: string;
        value: string;
      };
    }[];
    user: {
      email: string;
    };
  }[];
};

export type OrdersWithProducts = {
  orderItems: ({
    product: {
      id: string;
      name: string;
      price: Decimal;
      sku: string;
    };
  } & {
    id: string;
    orderId: string;
    productId: string;
  })[];
} & {
  id: string;
  isPaid: boolean;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export type RelatedProductsType = {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  parent: {
    id: string;
    name: string;
  } | null;
  products: {
    id: string;
    name: string;
    description: string;
    isArchived: boolean;
    isFeatured: boolean;
    categoryId: string;
    productImages: {
      imageUrl: string;
    }[];
    variants: {
      id: string;
      productId: string;
      colorId: string;
      sizeId: string;
      stock: number;
      price: Prisma.Decimal;
      color: {
        id: string;
        name: string;
        value: string;
      };
      size: {
        id: string;
        value: string;
      };
    }[];
  }[];
};
