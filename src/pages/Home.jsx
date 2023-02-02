import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsThunk } from "../store/slices/products.slice";
import { Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const prod = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductsThunk());
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <Row xs={1} md={2} lg={3}>
        {prod?.map((productItem) => (
          <Col key={productItem.id}>
            <Card>
              <Card.Img variant="top" src={productItem.productImgs[0]} />
              <Card.Body>
                <Card.Title>{productItem.title}</Card.Title>
                <Card.Text>{productItem.description}</Card.Text>
                <Button
                  variant="primary"
                  as={Link}
                  to={`/products/${productItem.id}`}
                >
                  See Detail
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
