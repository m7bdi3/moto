"use server";

import db from "@/lib/db";

export const GetTotalRevenue = async () => {
  const paidOrders = await db.order.findMany({
    where: {
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: {
            select: {
              price: true,
            },
          },
        },
      },
    },
  });

  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderToral = order.orderItems.reduce((orderSum, item) => {
      return orderSum + item.product.price.toNumber();
    }, 0);

    return total + orderToral;
  }, 0);

  return totalRevenue;
};

export const getSalesCount = async () => {
  const SalesCount = await db.order.count({
    where: {
      isPaid: true,
    },
  });

  return SalesCount;
};

export const getStockCount = async () => {
  const StockCount = await db.product.count({
    where: {
      isArchived: false,
    },
  });

  return StockCount;
};

export interface GraphData {
  name: string;
  total: number;
}

export const getGraphRevenue = async () => {
  const PaidOreders = await db.order.findMany({
    where: {
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: {
            select: {
              price: true,
            },
          },
        },
      },
    },
  });

  const monthlyRevenue: { [key: string]: number } = {};

  for (const order of PaidOreders) {
    const month = order.createdAt.getMonth();
    let revenueForOrder = 0;

    for (const item of order.orderItems) {
      revenueForOrder += item.product.price.toNumber();
    }
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  const graphData: GraphData[] = [
    { name: "January", total: 0 },
    { name: "February", total: 0 },
    { name: "March", total: 0 },
    { name: "April", total: 0 },
    { name: "May", total: 0 },
    { name: "June", total: 0 },
    { name: "July", total: 0 },
    { name: "August", total: 0 },
    { name: "September", total: 0 },
    { name: "October", total: 0 },
    { name: "November", total: 0 },
    { name: "December", total: 0 },
  ];

  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return graphData;
};
