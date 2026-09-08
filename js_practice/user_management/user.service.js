const userService = {
  name: "Alice",
  unitPrice: 120,
  quantity: 3,
  discount: 0.1,

  // Regular method: this trỏ đến userService
  calculateTotal: function () {
    return this.unitPrice * this.quantity * (1 - this.discount);
  },

  // Arrow function: không có this riêng. this được lấy từ scope bên ngoài, không phải từ userService. Vì vậy kết quả có thể là undefined hoặc giá trị khác tuỳ môi trường chạy.
  setName: (name) => {
    userService.name = name;
  },

  calculateTotal: () => {
    return (
      userService.unitPrice * userService.quantity * (1 - userService.discount)
    );
  },

  toString: () => {
    return `${userService.name} - ${userService.unitPrice} - ${userService.quantity} - ${userService.discount} - Total: ${userService.calculateTotal()}`;
  },
};

userService.setName("Hieu");

console.log(userService.toString());


