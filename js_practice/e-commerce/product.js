const products =[];

const productForm = document.getElementById('productForm');

productForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const productIdEl = document.getElementById('productId');
    const productIdVal = productIdEl.value;

    const productNameEl = document.getElementById('productName');
    const productNameVal = productNameEl.value;

    const productPriceEl = document.getElementById('productPrice');
    const productPriceVal = productPriceEl.value;

    // form, anchor, element
    // window.location.href = `product-detail.html?productId=${productId}&productName=${productName}&productPrice=${productPrice}`;

    const PRODUCT_PATTERN = /^[A-Z]{3}\d{3}$/; // \d: digit, \w: word character, \s: whitespace character

    if (!PRODUCT_PATTERN.test(productIdVal)) {
        productIdEl.style.borderColor = 'red';
        productIdEl.focus();

        const errorMessageEl = document.createElement('span');
        errorMessageEl.style.color = 'red';

        productIdEl.parentNode.appendChild(errorMessageEl).innerText = 'Invalid product ID. Please enter a valid product ID (e.g., ABC123).';
        return;
    }

    const product = {
        id: productIdVal,
        name: productNameVal,
        price: parseFloat(productPriceVal),
    };

    products.push(product);

    console.log('All products:', products);
});
