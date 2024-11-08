import { Button, Card } from "react-bootstrap"
import { Product } from "../types/Product"
import { Link } from "react-router-dom"


function ProductItem({product}: {product: Product}){


    return (

    <Card>
      <Link to={`/product/${product.title}`}>
        <img src={product.img} className="card-img-top" alt={product.title} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.title}`}>
          <Card.Title>{product.title}</Card.Title>
        </Link>
        <Card.Text>${product.price}</Card.Text>
        {product.quantity === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button>
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>

    )
}

export default ProductItem