let products = [
  {
    id: "P001",
    name: "Product 1",
    price: 10.99,
  },
  {
    id: "P002",
    name: "Product 2",
    price: 20.99,
  },
];

console.log("Initial products:", products);

products = products.map((product)=> {
    return {...product, quantity: 2};
});

products = products.map((product) => ({ ...product, totalPrice: product.price * product.quantity }));


console.log("New products:", products);