import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetProductByID, useDeleteProductMutation } from '../hooks/ProductHook';

const DeleteProductPage = () => {
  const [productId, setProductId] = React.useState('');
  const [isFound, setIsFound] = React.useState(false);

  const navigate = useNavigate();
  const { data: product, refetch } = useGetProductByID(productId);
  const deleteProductMutation = useDeleteProductMutation();

  const handleFetchProduct = async () => {
    await refetch();
    if (product) {
      setIsFound(true);
    } else {
      alert('Product not found.');
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteProductMutation.mutateAsync(productId);
      alert('Product deleted successfully!');
      navigate('/'); // Redirect to the products list or another page
    } catch {
      alert('Failed to delete product.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', backgroundColor: '#f9f9f9', borderRadius: '8px',
     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Delete Product</h2>
      {!isFound ? (
        <div>
          <input
            type="text"
            placeholder="Enter Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', 
              borderRadius: '4px', fontSize: '14px' }}
          />
          <button
            className="delete-button"
            onClick={handleFetchProduct}
            style={{ width: '100%', padding: '12px', margin: '10px 0', backgroundColor: '#f0ad4e', border: 'none',
               borderRadius: '4px', color: 'white', fontSize: '16px', cursor: 'pointer', transition: 'background-color 0.3s' }}
          >
            Delete Product
          </button>
        </div>
      ) : (
        <div>
          <p style={{ textAlign: 'center', fontSize: '18px', color: '#333' }}>Product found: {product?.title}</p>
          <button
            onClick={handleDeleteProduct}
            style={{ width: '100%', padding: '12px', margin: '10px 0', backgroundColor: '#d9534f', border: 'none',
               borderRadius: '4px', color: 'white', fontSize: '16px', cursor: 'pointer', transition: 'background-color 0.3s' }}
          >
            Confirm Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteProductPage;
