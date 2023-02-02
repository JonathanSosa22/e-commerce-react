import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../store/slices/isLoadong.slice";
import { Button, Col, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

const ProductsDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoading(true));
    axios
      .get(`https://e-commerce-api.academlo.tech/api/v1/products/${id}`)
      .then((resp) => setDetail(resp.data.data.product))
      .catch((error) => console.error(error))
      .finally(() => {
        setTimeout(() => {
          dispatch(setIsLoading(false));
        }, 1000);
      });
  }, []);

  return (
    <div>
      <h1>{detail?.title}</h1>
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
      <p>{detail?.description}</p>
      <p>Price: ${detail?.price}</p>
    </div>
  );
};

export default ProductsDetail;
