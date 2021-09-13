const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    console.log(product.rating);
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <div class="col single-product">
        <div class="card h-100">
          <div class="text-center" style="height: "350px">
            <img src="${image}" class="product-image p-3" alt="...">
          </div>
          <div class="card-body" style="">
            <div class="overflow-hidden" style="height: 70px">
              <h5 class="card-title">${product.title}</h5>              
            </div>
            <p>Category: ${product.category}</p>
            <div class="pt-2 d-flex">
              <div><button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">Add to Cart</button></div>
              <div class="ms-auto"><button id="details-btn" class="btn btn-danger">Details</button></div>
            </div>
          </div>
          <div class="card-footer">
            <div class="d-flex">
              <p>
                <i class="fas fa-star star-color"></i>${product.rating.rate}
              </p>
              <p class="ms-auto">
                Total Star: ${product.rating.count}
              </p>
            </div>
          </div>
        </div>
      </div>

      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};