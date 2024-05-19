const leadAllProduct = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      displayProduct(data);
    });
};

const displayProduct = (products) => {
  const productContainer = document.getElementById("product-container");

  products.forEach((product) => {
    const div = document.createElement("div");

    div.classList.add("card");
    div.innerHTML = `
    <img src=${product.image} class="card-img-top" alt="...">
    <div>
      <h5>${product.title}</h5>
      <h3> Price: $${product.price}</h3>
      <p>${product.description.slice(0, 50)}</p>
      <a href="#" class="btn cust-btn" onclick = "singleProduct('${
        product.id
      }')">Details</a>
      <a href="#" class="btn cust-btn" onclick = "handleAddToCart('${
        product.title
      }','${product.price}')">Add to Cart</a>
       `;

    productContainer.appendChild(div);
  });
};

const handleAddToCart = (name, price) => {
  const count = document.getElementById("count").innerText;

  let convertedCount = parseInt(count);
  convertedCount += 1;
  document.getElementById("count").innerText = convertedCount;
  console.log(convertedCount);

  const container = document.getElementById("cart-main");

  const div = document.createElement("div");

  div.classList.add("d-flex");
  div.classList.add("justify-content-around");

  div.innerHTML = `
        <p>${name.slice(0, 12)}</p>
        <h3 class = "price">${price}</h3>
    `;

  container.appendChild(div);
  updateTotal();
};

const updateTotal = () => {
  const allPrices = document.getElementsByClassName("price");

  let sum = 0;
  for (const element of allPrices) {
    sum += parseFloat(element.innerText);
  }

  document.getElementById("total").innerText = sum.toFixed(2);
};

const singleProduct = (id) => {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => modalDisplay(data));
};

const modalDisplay = (product) => {
  const id = product.id;
  const title = product.title;
  const price = product.price;
  const category = product.category;
  const description = product.description;

  console.log(id);
  const modalCon = document.createElement("div");
  modalCon.innerHTML = `
    <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel">Product Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p><b>Product ID:</b> ${id}</p>
            <p><b>Product Title:</b> ${title}</p>
            <p><b>Product Price:</b> ${price}</p>
            <p><b>Product Category:</b> ${category}</p>
            <p><b>Product Description:</b> ${description}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn closebtn" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const existingModal = document.getElementById("productModal");
  if (existingModal) {
    existingModal.parentNode.removeChild(existingModal);
  }

  document.body.appendChild(modalCon);

  const modal = new bootstrap.Modal(document.getElementById("productModal"));
  modal.show();
};

leadAllProduct();
