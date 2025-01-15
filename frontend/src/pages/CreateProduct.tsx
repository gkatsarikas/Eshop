import { useState } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import { useCreateProductMutation } from '../hooks/ProductHook';
import { useNavigate } from 'react-router-dom';
import { getError } from '../utils';
import { ApiError } from '../types/Error';

export default function CreateProductPage() {
  const navigate = useNavigate();
  const createProductMutation = useCreateProductMutation();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title || Number(price) <= 0 || Number(quantity) < 0) {
      setError('All fields are required, and price/quantity must be valid numbers.');
      return;
    }

    if (image) {
      try {
        await createProductMutation.mutateAsync({
          title,
          img: image,
          price: Number(price),
          quantity: Number(quantity),
        });
        navigate('/');
      } catch (error) {
        getError(error as unknown as ApiError)
      }
    } else {
      setError('Please upload an image');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <Container>
      <h1>Create New Product</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control
            type="file"
            onChange={handleImageChange}  // Updated handler to properly handle file selection
            accept="image/*"
          />
        </Form.Group>

        <Button className="mt-3" variant="primary" type="submit">
          Create Product
        </Button>
      </Form>
    </Container>
  );
}
