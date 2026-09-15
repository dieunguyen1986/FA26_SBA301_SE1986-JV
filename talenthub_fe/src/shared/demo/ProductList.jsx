import { useState } from "react";
import Product from "./Product";

export default function ProductList() {

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 11,
      image: "URL",
      favorite: 0,
    },
    {
      id: 2,
      name: "Product 1",
      price: 11,
      image: "URL",
      favorite: 0,
    },
    {
      id: 3,
      name: "Product 1",
      price: 11,
      image: "URL",
      favorite: 0,
    },
    {
      id: 4,
      name: "Product 1",
      price: 11,
      image: "URL",
      favorite: 0,
    },
    {
      id: 5,
      name: "Product 1",
      price: 11,
      image: "URL",
      favorite: 0,
    },
  ]);
  if (!products || products.length === 0) {
    return <p>No products available right now.</p>;
  }

  const handleFavorite = (id) => {
    const newProducts = products.map((p) => {
      if (p.id === id) {
        return { ...p, favorite: p.favorite + 1 };
      }
      return p;
    });

    setProducts(newProducts);
    console.log(newProducts);
  };

  return (
    <div className="product-list d-flex flex-column justify-content-around w-25 gap-2">
      {products.map((product) => (
        <Product
          key={product.id}
          id = {product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          favorite={product.favorite}
          handleFavorite={handleFavorite}
        />
      ))}
    </div>
  );
}
