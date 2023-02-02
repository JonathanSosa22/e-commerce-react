import axios from "axios";
import { useState, useEffect } from "react";
import getConfig from "../utils/getConfig";

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    axios
      .get("https://e-commerce-api.academlo.tech/api/v1/purchases", getConfig())
      .then((resp) => setPurchases(resp.data.data.purchases))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <div>
        <h1>Purchases</h1>
        {purchases.map((item) => {
          return item.cart.products?.map((item) => (
            <>
              <li>{item.title}</li>
              <p>Precio: ${item.price}</p>
            </>
          ));
        })}
      </div>
    </div>
  );
};

export default Purchases;
