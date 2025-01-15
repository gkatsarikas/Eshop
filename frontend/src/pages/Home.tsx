import { Row, Col } from 'react-bootstrap'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import ProductItem from '../components/ProductItem'
import { Helmet } from 'react-helmet-async'
import { useGetProductsQuery } from '../hooks/ProductHook'
import { getError } from '../utils'
import { ApiError } from '../types/Error'

export default function HomePage() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant='danger'>{getError(error as unknown as ApiError)}</MessageBox>
  ) : (
    <Row>
      <Helmet><title>My Eshop</title></Helmet>
      {products!.map((product) => (
        <Col key={product.title}>
          <ProductItem product={product} />
        </Col>
      ))}
    </Row>
  );
}