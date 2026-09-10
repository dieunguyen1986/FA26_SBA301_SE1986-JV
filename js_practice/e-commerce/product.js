let products = [];

const productForm = document.getElementById("productForm");

productForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const productIdEl = document.getElementById("productId");
  const productIdVal = productIdEl.value;

  const productNameEl = document.getElementById("productName");
  const productNameVal = productNameEl.value;

  const productPriceEl = document.getElementById("productPrice");
  const productPriceVal = productPriceEl.value;

  const productQuantityEl = document.getElementById("productQuantity");
  const productQuantityVal = productQuantityEl.value;

  // form, anchor, element
  // window.location.href = `product-detail.html?productId=${productId}&productName=${productName}&productPrice=${productPrice}`;

  const PRODUCT_PATTERN = /^[A-Z]{3}\d{3}$/; // \d: digit, \w: word character, \s: whitespace character

  if (!PRODUCT_PATTERN.test(productIdVal)) {
    productIdEl.style.borderColor = "red";
    productIdEl.focus();

    const errorMessageEl = document.createElement("span");
    errorMessageEl.style.color = "red";

    productIdEl.parentNode.appendChild(errorMessageEl).innerText =
      "Invalid product ID. Please enter a valid product ID (e.g., ABC123).";
    return;
  } else {
    productIdEl.style.borderColor = "";
    const errorMessageEl = productIdEl.parentNode.querySelector("span");
    if (errorMessageEl) {
      errorMessageEl.remove();
    }
  }

  if (productNameVal.trim() === "") {
    productNameEl.style.borderColor = "red";
    productNameEl.focus();

    const errorMessageEl = document.createElement("span");
    errorMessageEl.style.color = "red";

    productNameEl.parentNode.appendChild(errorMessageEl).innerText =
      "Product name cannot be empty.";
    return;
  } else {
    productNameEl.style.borderColor = "";
    const errorMessageEl = productNameEl.parentNode.querySelector("span");
    if (errorMessageEl) {
      errorMessageEl.remove();
    }
  }

  if (
    productPriceVal.trim() === "" ||
    isNaN(productPriceVal) ||
    parseFloat(productPriceVal) <= 0
  ) {
    productPriceEl.style.borderColor = "red";
    productPriceEl.focus();

    const errorMessageEl = document.createElement("span");
    errorMessageEl.style.color = "red";

    productPriceEl.parentNode.appendChild(errorMessageEl).innerText =
      "Invalid product price. Please enter a valid positive number.";
    return;
  } else {
    productPriceEl.style.borderColor = "";
    const errorMessageEl = productPriceEl.parentNode.querySelector("span");
    if (errorMessageEl) {
      errorMessageEl.remove();
    }
  }

  const product = {
    id: productIdVal,
    name: productNameVal,
    price: parseFloat(productPriceVal),
    quantity: parseInt(productQuantityVal),
  };

  const isExistingProduct = products.some((p) => {
    return p.id === product.id;
  });

  if (!isExistingProduct) {
    products.push(product);
  } else {
    products = products.map((p) => {
      if (p.id === product.id) {
        return { ...p, quantity: p.quantity + product.quantity };
      }
      return p;
    });
  }

  // Add to table
  addProductToTable(product);

  console.log("All products:", products);
});

function addProductToTable(product) {
  const row = document.createElement("tr");

  const tdID = document.createElement("td");
  tdID.textContent = product.id;

  const tdName = document.createElement("td");
  tdName.textContent = product.name;

  const tdPrice = document.createElement("td");
  tdPrice.textContent = product.price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const tdQuantity = document.createElement("td");
  tdQuantity.textContent = product.quantity;

  row.appendChild(tdID);
  row.appendChild(tdName);
  row.appendChild(tdPrice);
  row.appendChild(tdQuantity);

  const productTableBody = document.querySelector("#product-table tbody"); // seclector: element, id, class
  productTableBody.appendChild(row);
}



document.querySelector("#checkoutBtn").addEventListener("click", function () {
  const totalAmount = products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  document.querySelector("#totalPrice").textContent = `Total price: ${totalAmount.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  })}`;

});