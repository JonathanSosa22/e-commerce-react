import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Row, ListGroup } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { getProductsThunk } from "../store/slices/products.slice";
import { addCartThunk } from "../store/slices/addCart.slice";

const ProductsDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [rate, setRate] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [id]);

  const allNews = useSelector((state) => state.products);
  const detail = allNews.find((news) => news.id === Number(id));
  const newsRelated = allNews.filter(
    (news) => news.category.name === detail.category.name
  );

  console.log(newsRelated);

  const addToCart = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const cart = {
        id: detail.id,
        quantity: rate,
      };
      dispatch(addCartThunk(cart));
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <h1>{detail?.title}</h1>

      <Row>
        <Col lg={9}>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={detail.productImgs[0]}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={detail.productImgs[1]}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={detail.productImgs[2]}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>

          <p>{detail?.description}</p>
          <p>Price: ${detail?.price}</p>
          <div className="mb-3">
            <Button onClick={addToCart}>Add To Cart</Button>
            <Button onClick={() => setRate(rate - 1)}>-</Button>
            {rate}
            <Button onClick={() => setRate(rate + 1)}>+</Button>
          </div>
        </Col>

        <Col lg="3">
          <h3>Releated Products</h3>

          <ListGroup>
            {newsRelated?.map((newsItem) => (
              <div>
                <ListGroup.Item key={newsItem.id}>
                  {newsItem.title}
                  <img src={newsItem.productImgs[0]} alt="" />
                </ListGroup.Item>
              </div>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ProductsDetail;
