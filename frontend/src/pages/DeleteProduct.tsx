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
    } catch{
      alert('Failed to delete product.');
    }
  };

  return (
    <div>
      <h2>Delete Product</h2>
      {!isFound ? (
        <div>
          <input
            type="text"
            placeholder="Enter Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
          <button onClick={handleFetchProduct}>Delete Product</button>
        </div>
      ) : (
        <div>
          <p>Product found: {product?.title}</p>
          <button onClick={handleDeleteProduct}>Confirm</button>
        </div>
      )}
    </div>
  );
};

export default DeleteProductPage;
