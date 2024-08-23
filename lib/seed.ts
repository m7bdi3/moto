import db from "./db";

async function main() {

  const user = await db.user.create({
    data: {
      id: 'some-unique-user-id',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'securepassword',
    },
  });

  // Create categories
  const category1 = await prisma.category.create({
    data: {
      name: 'Electronics',
      userId: user.id,
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: 'Furniture',
      userId: user.id,
    },
  });

  // Create billboards
  const billboard1 = await prisma.billboard.create({
    data: {
      label: 'Summer Sale',
      imageUrl: 'https://example.com/summer-sale.jpg',
      categoryId: category1.id,
      userId: user.id,
    },
  });

  const billboard2 = await prisma.billboard.create({
    data: {
      label: 'Winter Collection',
      imageUrl: 'https://example.com/winter-collection.jpg',
      categoryId: category2.id,
      userId: user.id,
    },
  });

  // Create colors
  const red = await prisma.color.create({
    data: {
      name: 'Red',
      value: '#FF0000',
    },
  });

  const blue = await prisma.color.create({
    data: {
      name: 'Blue',
      value: '#0000FF',
    },
  });

  // Create sizes
  const small = await prisma.size.create({
    data: {
      name: 'Small',
      value: 'S',
    },
  });

  const large = await prisma.size.create({
    data: {
      name: 'Large',
      value: 'L',
    },
  });

  // Create products
  const product1 = await prisma.product.create({
    data: {
      name: 'Smartphone',
      description: 'A high-end smartphone with a great camera',
      price: 699.99,
      weight: 0.3,
      sku: 'SP-001',
      stock: 100,
      userId: user.id,
      categoryId: category1.id,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Sofa',
      description: 'A comfortable sofa for your living room',
      price: 299.99,
      weight: 40,
      sku: 'SF-001',
      stock: 50,
      userId: user.id,
      categoryId: category2.id,
    },
  });

  // Link colors to products
  await prisma.productColor.createMany({
    data: [
      { productId: product1.id, colorId: red.id },
      { productId: product2.id, colorId: blue.id },
    ],
  });

  // Link sizes to products
  await prisma.productSize.createMany({
    data: [
      { productId: product1.id, sizeId: small.id },
      { productId: product2.id, sizeId: large.id },
    ],
  });

  // Add product images
  await prisma.productImages.createMany({
    data: [
      { productId: product1.id, imageUrl: 'https://example.com/smartphone-front.jpg' },
      { productId: product1.id, imageUrl: 'https://example.com/smartphone-back.jpg' },
      { productId: product2.id, imageUrl: 'https://example.com/sofa-1.jpg' },
      { productId: product2.id, imageUrl: 'https://example.com/sofa-2.jpg' },
    ],
  });

  console.log('Database has been seeded. 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
