import { Prisma } from '@prisma/client';
import prisma from '../prismaClient';
import { AppError } from '../utils/AppError';

export async function getProducts(category?: string) {
  const filter = category ? { category: { name: category } } : {};
  return prisma.product.findMany({
    where: filter,
    include: { category: true }
  });
}

export async function createProduct(data: {
  name: string;
  sku: string;
  stock: number;
  minStock: number;
  price: number;
  categoryName: string;
}) {
  let category = await prisma.category.findUnique({ where: { name: data.categoryName } });
  if (!category) {
    category = await prisma.category.create({ data: { name: data.categoryName } });
  }

  try {
    return await prisma.product.create({
      data: {
        name: data.name,
        sku: data.sku,
        stock: data.stock,
        minStock: data.minStock,
        price: data.price,
        categoryId: category.id
      }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new AppError('Ya existe un producto con ese SKU.', 400);
    }
    throw error;
  }
}

export async function updateProduct(id: string, data: Partial<{ name: string; sku: string; stock: number; minStock: number; price: number; categoryName: string }>) {
  const updateData: any = { ...data };
  if (data.categoryName) {
    let category = await prisma.category.findUnique({ where: { name: data.categoryName } });
    if (!category) {
      category = await prisma.category.create({ data: { name: data.categoryName } });
    }
    updateData.categoryId = category.id;
    delete updateData.categoryName;
  }
  return prisma.product.update({
    where: { id },
    data: updateData
  });
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
}

export async function getLowStockProducts() {
  const products = await prisma.product.findMany({ include: { category: true } });
  return products.filter((product) => product.stock <= product.minStock);
}
