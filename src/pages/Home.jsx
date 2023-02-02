import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  categoriesFilterThunk,
  getProductsThunk,
} from "../store/slices/products.slice";
import { Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const prod = useSelector((state) => state.products);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(getProductsThunk());

    axios
      .get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
      .then((resp) => setCategories(resp.data.data.categories))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {categories?.map((category) => (
        <Button
          key={category.id}
          onClick={() => dispatch(categoriesFilterThunk(category.id))}
        >
          {category.name}
        </Button>
      ))}
      <Button className="btn" onClick={() => dispatch(getProductsThunk())}>
        See All
      </Button>
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
