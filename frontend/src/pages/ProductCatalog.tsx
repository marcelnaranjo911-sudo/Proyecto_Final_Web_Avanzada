import { useProducts } from '../hooks/useProducts';

export default function ProductCatalog() {
  const { products, loading, error } = useProducts();

  return (
    <div>
      <h1>Catálogo de productos</h1>
      <p>Esta vista pública muestra los productos disponibles desde el backend.</p>
      {loading ? (
        <p>Cargando productos...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : products.length === 0 ? (
        <p>No hay productos en la base de datos.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>SKU</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Categoría</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.sku}</td>
                <td>{item.stock}</td>
                <td>{item.price}</td>
                <td>{item.category.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
