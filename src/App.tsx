import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Basket } from "./pages/Basket";
import { Categories } from "./pages/Categories";
import { Products } from "./pages/Products";
import { NotFound } from "./pages/NotFound";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";

export type StoreItemType = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  categoryId: number;
  inBasket: number;
};
export type StoreType = StoreItemType[];

function App() {
  const [products, setProducts] = useState<StoreType>([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch("http://localhost:4005/products")
      .then((resp) => resp.json())
      .then((productsFromServer) => setProducts(productsFromServer));
  }, []);
  function increaseProductQuantity(product: StoreItemType) {
    const productCopy: StoreType = structuredClone(products);

    const match = productCopy.find((target) => target.id === product.id)!;
    match.inBasket++;

    setProducts(productCopy);
  }
  function decreaseProductQuantity(product: StoreItemType) {
    const productCopy: StoreType = structuredClone(products);

    const match = productCopy.find((target) => target.id === product.id)!;
    match.inBasket--;

    setProducts(productCopy);
  }

  return (
    <>
      <Header />
      <main>
        <div className="products-container">
          <Routes>
            <Route index element={<Navigate to="/home" />} />
            <Route path="home" element={<Products search={search} />} />
            <Route path="categories" element={<Categories />} />
            <Route path="*" element={< NotFound />} />
            <Route
              path="/productDetails:id"
              element={
                <ProductDetailsPage
                  increaseProductQuantity={increaseProductQuantity}
                />
              }
            />
            <Route
              path="/basket"
              element={
                <Basket
                  products={products}
                  increaseProductQuantity={increaseProductQuantity}
                  decreaseProductQuantity={decreaseProductQuantity}
                />
              }
            />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
