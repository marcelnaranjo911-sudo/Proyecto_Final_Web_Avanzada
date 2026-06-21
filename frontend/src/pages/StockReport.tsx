import { useEffect, useState } from 'react';
import { api } from '../services/api';

type Product = {
  id: string;
  name: string;
  sku: string;
  stock: number;
  minStock: number;
  price: number;
  category: { name: string };
};

export default function StockReport() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLowStock() {
      setLoading(true);
      try {
        const response = await api.get('/reports/low-stock');
        setProducts(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadLowStock();
  }, []);

  return (
    <div>
      <h1>Productos con bajo stock</h1>
      <p>Esta vista muestra los productos que ya están por debajo de su stock mínimo.</p>
      {loading ? (
        <p>Cargando productos...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : products.length === 0 ? (
        <p>No hay productos por debajo del stock mínimo.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>SKU</th>
              <th>Stock</th>
              <th>Stock mínimo</th>
              <th>Categoría</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td>{product.stock}</td>
                <td>{product.minStock}</td>
                <td>{product.category.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
