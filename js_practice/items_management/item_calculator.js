const items = [
  {
    id: 1,
    name: "Tao",
    price: 10000,
    quantity: 100,
  },
  {
    id: 2,
    name: "Dua",
    price: 20000,
    quantity: 20,
  },
  {
    id: 3,
    name: "Chuoi",
    price: 5000,
    quantity: 20,
  },
];

/*
  Regular function/Function Declaration
*/
// function calculateItems(items) {
//   let totalPrice = 0;
//   for (const item of items) totalPrice += item.price * item.quantity;
//   return totalPrice;
// }
/*
 Expression Function
*/
// const calculateItems = function (items) {
//   let totalPrice = items.reduce(
//     (totalPrice, item) => totalPrice + item.price * item.quantity,
//     0,
//   );

//   return totalPrice;
// };

/**
 * Arrow Function
 * @param {*} items 
 * @returns 
 */
const calculateItems = (items) => {
  const totalPrice = items.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0);
  return totalPrice;
};

console.log(`Total price:  ${calculateItems(items)}`);
