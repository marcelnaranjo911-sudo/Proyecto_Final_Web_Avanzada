import { FormEvent, useState } from 'react';
import { api } from '../services/api';
import { useProducts } from '../hooks/useProducts';

export default function AdminProducts() {
  const { products, loading, error, refresh } = useProducts();
  const [form, setForm] = useState({ name: '', sku: '', stock: '1', minStock: '1', price: '0', categoryName: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, {
          name: form.name,
          sku: form.sku,
          stock: Number(form.stock),
          minStock: Number(form.minStock),
          price: Number(form.price),
          categoryName: form.categoryName
        });
        setMessage('Producto actualizado correctamente.');
      } else {
        await api.post('/products', {
          name: form.name,
          sku: form.sku,
          stock: Number(form.stock),
          minStock: Number(form.minStock),
          price: Number(form.price),
          categoryName: form.categoryName
        });
        setMessage('Producto creado correctamente.');
      }
      setMessageType('success');
      setForm({ name: '', sku: '', stock: '1', minStock: '1', price: '0', categoryName: '' });
      setEditingId(null);
      setShowForm(false);
      refresh();
    } catch (err: any) {
      setMessageType('error');
      setMessage(err.message || 'Error al guardar producto.');
    }
  };

  const handleEdit = (product: { id: string; name: string; sku: string; stock: number; minStock: number; price: number; category: { name: string } }) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      sku: product.sku,
      stock: String(product.stock),
      minStock: String(product.minStock),
      price: String(product.price),
      categoryName: product.category.name
    });
    setMessageType('success');
    setMessage('Modo edición activado. Modifica los campos y guarda.');
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ name: '', sku: '', stock: '1', minStock: '1', price: '0', categoryName: '' });
    setMessageType('success');
    setMessage('Edición cancelada.');
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/products/${id}`);
      refresh();
      setMessage('Producto eliminado correctamente.');
    } catch (err: any) {
      setMessage(err.message || 'Error al eliminar producto.');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px', marginBottom: '20px' }}>
        <div>
          <h1>Gestión de productos</h1>
          <p>Administra productos y revisa stock bajo.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (editingId) {
              setEditingId(null);
              setForm({ name: '', sku: '', stock: '1', minStock: '1', price: '0', categoryName: '' });
              setMessageType('success');
              setMessage('Edición cancelada.');
            }
            setShowForm((current) => !current);
          }}
        >
          {editingId ? 'Cancelar edición' : showForm ? 'Ocultar formulario' : 'Nuevo producto'}
        </button>
      </div>
      {showForm && (
        <div className="form-panel">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div>
                <label>Nombre</label>
                <input value={form.name} onChange={(event) => handleChange('name', event.target.value)} required />
              </div>
              <div>
                <label>SKU</label>
                <input value={form.sku} onChange={(event) => handleChange('sku', event.target.value)} required />
              </div>
            </div>
            <div className="form-row">
              <div>
                <label>Stock</label>
                <input value={form.stock} onChange={(event) => handleChange('stock', event.target.value)} type="number" min="1" required />
              </div>
              <div>
                <label>Stock mínimo</label>
                <input value={form.minStock} onChange={(event) => handleChange('minStock', event.target.value)} type="number" min="1" required />
              </div>
            </div>
            <div className="form-row">
              <div>
                <label>Precio</label>
                <input value={form.price} onChange={(event) => handleChange('price', event.target.value)} type="number" min="0" step="0.01" required />
              </div>
              <div>
                <label>Categoría</label>
                <input value={form.categoryName} onChange={(event) => handleChange('categoryName', event.target.value)} required />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit">{editingId ? 'Guardar cambios' : 'Crear producto'}</button>
              {editingId && (
                <button type="button" onClick={handleCancelEdit} className="secondary">
                  Cancelar edición
                </button>
              )}
            </div>
          </form>
        </div>
      )}
      {message && (
        <p style={{ color: messageType === 'error' ? '#b91c1c' : '#166534', marginBottom: '16px' }}>{message}</p>
      )}
      {loading ? (
        <p>Cargando productos...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>SKU</th>
              <th>Stock</th>
              <th>Stock mínimo</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td>{product.stock}</td>
                <td>{product.minStock}</td>
                <td>{product.price}</td>
                <td>{product.category.name}</td>
                <td>
                  <button onClick={() => handleEdit(product)} className="secondary">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="secondary" style={{ marginLeft: '8px' }}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
