import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetProductByID, useUpdateProductMutation } from '../hooks/ProductHook';

const UpdateProductPage = () => {
  const [productId, setProductId] = React.useState('');
  const [productData, setProductData] = React.useState({ title: '', price: 0, quantity: 0 });
  const [isEditing, setIsEditing] = React.useState(false);

  const navigate = useNavigate();
  const { data: product, refetch } = useGetProductByID(productId);
  const updateProductMutation = useUpdateProductMutation();

  const handleFetchProduct = async () => {
    await refetch();
    if (product) {
      setProductData({
        title: product.title,
        price: product.price,
        quantity: product.quantity,
      });
      setIsEditing(true);
    } else {
      alert('Product not found.');
    }
  };

  const handleUpdateProduct = async () => {
    try {
      await updateProductMutation.mutateAsync({ id: productId, ...productData });
      alert('Product updated successfully!');
      navigate(`/`);
    } catch {
      alert('Failed to update product.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Update Product</h2>
      {!isEditing ? (
        <div>
          <input
            type="text"
            placeholder="Enter Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
          />
          <button
            onClick={handleFetchProduct}
            style={{ width: '100%', padding: '12px', margin: '10px 0', backgroundColor: '#007bff', border: 'none', borderRadius: '4px',
               color: 'white', fontSize: '16px', cursor: 'pointer', transition: 'background-color 0.3s' }}
          >
            Fetch Product
          </button>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); handleUpdateProduct(); }} style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>
            Title:
            <input
              type="text"
              value={productData.title}
              onChange={(e) => setProductData({ ...productData, title: e.target.value })}
              style={{ padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </label>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>
            Price:
            <input
              type="number"
              value={productData.price}
              onChange={(e) => setProductData({ ...productData, price: parseFloat(e.target.value) })}
              style={{ padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </label>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>
            Quantity:
            <input
              type="number"
              value={productData.quantity}
              onChange={(e) => setProductData({ ...productData, quantity: parseInt(e.target.value) })}
              style={{ padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </label>
          <button
            type="submit"
            style={{ width: '100%', padding: '12px', margin: '10px 0', backgroundColor: '#007bff', border: 'none', borderRadius: '4px', 
              color: 'white', fontSize: '16px', cursor: 'pointer', transition: 'background-color 0.3s' }}
          >
            Submit changes
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateProductPage;
