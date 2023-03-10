import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import axios from "axios";
import getConfig from "../utils/getConfig";

const SideBar = ({ show, handleClose }) => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    axios
      .get("https://e-commerce-api.academlo.tech/api/v1/cart", getConfig())
      .then((resp) => {
        setPurchases(resp.data.data.cart.products);
      })
      .catch((error) => console.error(error));
  }, [show]);

  const checkoutCart = () => {
    axios
      .post(
        "https://e-commerce-api.academlo.tech/api/v1/purchases",
        {
          street: "Green St. 1456",
          colony: "Southwest",
          zipCode: 12345,
          city: "USA",
          references: "Some references",
        },
        getConfig()
      )
      .then((resp) => setPurchases([]))
      .catch((error) => console.error(error));
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement={"end"}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {purchases.length !== 0 ? (
          purchases?.map((purchase) => (
            <>
              <h5 key={purchase.title}>{purchase.title}</h5>
              <p>Price: ${purchase.price}</p>
            </>
          ))
        ) : (
          <h2>No products selected</h2>
        )}

        <Button onClick={checkoutCart} disabled={purchases.length === 0}>
          Checkout
        </Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SideBar;
