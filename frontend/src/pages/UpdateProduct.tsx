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
    } catch{
      alert('Failed to update product.');
    }
  };

  return (
    <div>
      <h2>Update Product</h2>
      {!isEditing ? (
        <div>
          <input
            type="text"
            placeholder="Enter Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
          <button onClick={handleFetchProduct}>Find</button>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); handleUpdateProduct(); }}>
          <label>
            Title:
            <input
              type="text"
              value={productData.title}
              onChange={(e) => setProductData({ ...productData, title: e.target.value })}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              value={productData.price}
              onChange={(e) => setProductData({ ...productData, price: parseFloat(e.target.value) })}
            />
          </label>
          <label>
            Quantity:
            <input
              type="number"
              value={productData.quantity}
              onChange={(e) => setProductData({ ...productData, quantity: parseInt(e.target.value) })}
            />
          </label>
          <button type="submit">Submit changes</button>
        </form>
      )}
    </div>
  );
};

export default UpdateProductPage;
