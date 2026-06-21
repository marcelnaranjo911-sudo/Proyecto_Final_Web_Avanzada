import bcrypt from 'bcryptjs';
import prisma from './src/prismaClient';

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@stockflow.com' },
    update: { password: passwordHash, role: 'ADMIN' },
    create: {
      email: 'admin@stockflow.com',
      password: passwordHash,
      role: 'ADMIN'
    }
  });

  const categoria = await prisma.category.upsert({
    where: { name: 'General' },
    update: {},
    create: { name: 'General' }
  });

  await prisma.product.upsert({
    where: { sku: 'PRD-001' },
    update: { stock: 12, minStock: 5, price: 19.9 },
    create: {
      name: 'Producto A',
      sku: 'PRD-001',
      stock: 12,
      minStock: 5,
      price: 19.9,
      categoryId: categoria.id
    }
  });

  await prisma.product.upsert({
    where: { sku: 'PRD-002' },
    update: { stock: 4, minStock: 6, price: 49.0 },
    create: {
      name: 'Producto B',
      sku: 'PRD-002',
      stock: 4,
      minStock: 6,
      price: 49.0,
      categoryId: categoria.id
    }
  });

  console.log('Seed completo');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
