import { useEffect, useState } from "react";
import { ProductItems } from "../components/ProductItems";

type Props = {
  search: string;
};
export function Products({ search }: Props) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4005/products")
      .then((resp) => resp.json())
      .then((productsFromServer) => setProducts(productsFromServer));
  }, []);

  const filteredProducts = products.filter((product) =>
    //@ts-ignore
    product.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <ul className="products-container__list">
      {filteredProducts.map((product) => (
        <ProductItems product={product} />
      ))}
    </ul>
  );
}
