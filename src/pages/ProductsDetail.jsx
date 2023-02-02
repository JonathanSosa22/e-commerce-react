import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../store/slices/isLoadong.slice";
import { Button, Col, Row, ListGroup } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { categoriesFilterThunk } from "../store/slices/products.slice";

const ProductsDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const dispatch = useDispatch();
  const productRelated = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(setIsLoading(true));
    axios
      .get(`https://e-commerce-api.academlo.tech/api/v1/products/${id}`)
      .then((resp) => {
        setDetail(resp.data.data.product);
        dispatch(categoriesFilterThunk(resp.data.category?.id));
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setTimeout(() => {
          dispatch(setIsLoading(false));
        }, 1000);
      });
  }, [id]);

  return (
    <div>
      <h1>{detail?.title}</h1>

      <Row>
        <Col lg={9}>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={detail.productImgs?.[0]}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={detail.productImgs?.[1]}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={detail.productImgs?.[2]}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </Col>

        {/* <Col lg={3}>
          <h2>Releated Products</h2>

          <ListGroup>
            {productRelated?.map((productItem) => (
              <ListGroup.Item key={productItem.id}>
                {productItem.title}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col> */}
      </Row>

      <p>{detail?.description}</p>
      <p>Price: ${detail?.price}</p>
    </div>
  );
};

export default ProductsDetail;
