import React from "react";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import { CategoryProductsPage } from "@/components/CategoryProducts";
import { ProductsWithCategoryAndUser } from "@/types";

interface Props {
  params: {
    categoryId: string;
  };
}
export default async function page({ params }: Props) {
  const { categoryId } = params;

  const categoryProducts = await db.category.findUnique({
    where: { id: categoryId },
    include: {
      children: {
        select: {
          id: true,
          parentId: true,
          name: true,
          products: {
            include: {
              category: {
                select: {
                  id: true,
                  name: true,
                  parentId: true,
                  parent: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
              productImages: {
                select: {
                  imageUrl: true,
                },
              },
              user: {
                select: {
                  email: true,
                },
              },
              variants: {
                include: {
                  color: {
                    select: {
                      id: true,
                      value: true,
                      name: true,
                    },
                  },
                  size: {
                    select: {
                      id: true,
                      value: true,
                    },
                  },
                },
              },
            },
          },
          billboard: {
            select: {
              id: true,
              label: true,
              imageUrl: true,
            },
          },
        },
      },
      parent: {
        select: {
          id: true,
          name: true,
          billboard: {
            select: {
              id: true,
              label: true,
              imageUrl: true,
            },
          },
        },
      },
      products: {
        include: {
          category: {
            select: {
              id: true,
              name: true,
              parentId: true,
              parent: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          productImages: {
            select: {
              imageUrl: true,
            },
          },
          user: {
            select: {
              email: true,
            },
          },
          variants: {
            include: {
              color: {
                select: {
                  id: true,
                  value: true,
                  name: true,
                },
              },
              size: {
                select: {
                  id: true,
                  value: true,
                },
              },
            },
          },
        },
      },
      billboard: {
        select: {
          id: true,
          label: true,
          imageUrl: true,
        },
      },
    },
  });

  const CategoryProduct = await db.product.findMany({
    where: { categoryId },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          parentId: true,
          parent: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      productImages: {
        select: {
          imageUrl: true,
        },
      },
      user: {
        select: {
          email: true,
        },
      },
      variants: {
        include: {
          color: {
            select: {
              id: true,
              value: true,
              name: true,
            },
          },
          size: {
            select: {
              id: true,
              value: true,
            },
          },
        },
      },
    },
  });

  if (!categoryProducts) {
    return notFound();
  }

  let Products: ProductsWithCategoryAndUser[];

  if (categoryProducts.parentId === null) {
    Products = [
      ...categoryProducts.products,
      ...categoryProducts.children.flatMap((category) => category.products),
    ];
  } else {
    Products = CategoryProduct;
  }

  return (
    <CategoryProductsPage Category={categoryProducts} Products={Products} />
  );
}
