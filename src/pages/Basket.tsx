import { Link } from "react-router-dom";
import { StoreItemType } from "../App";
type Props = {
  products: StoreItemType[];
  increaseProductQuantity: (product: StoreItemType) => void;
  decreaseProductQuantity: (product: StoreItemType) => void;
};

export function Basket({
  products,
  decreaseProductQuantity,
  increaseProductQuantity,
}: Props) {
  function getInBasketProducts() {
    return products.filter((product) => product.inBasket > 0);
  }
  const inBasketProducts = getInBasketProducts();
  function getTotal() {
    let total = 0;
    for (let item of inBasketProducts) {
      total += item.price * item.inBasket;
    }
    return `£ ${total.toFixed(2)}`;
  }
  const total = getTotal();

  return (
    <div className="basket-container">
      <h2>Your Basket </h2>
      <ul>
        {inBasketProducts.map((product) => (
          <li>
            <Link to={`/productDetails${product.id}`}>
              <img src={product.image} alt="" />
              <p>{product.title}</p>
            </Link>
            <div className="quantity">
              <button
                className="decrease-btn"
                onClick={function () {
                  decreaseProductQuantity(product);
                }}
              >
                -
              </button>
              <p>{product.inBasket}</p>
              <button
                className="increase-btn"
                onClick={function () {
                  increaseProductQuantity(product);
                }}
              >
                +
              </button>
            </div>
            <p>Price: £{(product.price * product.inBasket).toFixed(2)}</p>
          </li>
        ))}
      </ul>
      <h3>Your Total: {total}</h3>
    </div>
  );
}
