let $ = document;
let productDiv = $.getElementById("product");
let productPageDiv = $.getElementById("productPageDiv");

let products = null;

const fragment = document.createDocumentFragment();
// getting the data from api

async function loadProduct() {
  try {
    const response = await axios.get(
      "https://api.unsplash.com/photos/?client_id=dsmoN-2CMH79HH2y9RMNpbzeabCGGuSNwiyW7rSK0rU&per_page=60"
    );
    products = response.data;
    products.forEach((item) => {
      renderProduct(item);
    });
  } catch (error) {
    console.log(error);
  }
}
loadProduct();

// ------ fragment approch
//rendering
function renderProduct(item) {
  const productFragmentDiv = $.createElement("div");
  productFragmentDiv.innerHTML = `
    <a href="./product.html?id=${item.id}">
      <div class="card m-4" style="width: 20rem;">
          <img src="${item.urls.small}"class="card-img-top"  alt="${item.urls.small}">
          <div class="card-body" id="${item.id}">
              <span> ${item.likes}</span>
              <p class="card-text"><span class="name">${item.user.first_name} : </span>${item.user.bio}</p>
          </div>
      </div>
    </a>
  `;
  fragment.appendChild(productFragmentDiv);
  productDiv.appendChild(fragment);
}
///-------- normal approch
// function renderProduct(item) {
//   productDiv.insertAdjacentHTML(
//     "beforeend",
//     `
//       <a href="./product.html?id=${item.id}">
//         <div class="card m-4" style="width: 20rem;">
//             <img src="${item.urls.small}"class="card-img-top"  alt="${item.urls.small}">
//             <div class="card-body" id="${item.id}">
//                 <span> ${item.likes}</span>
//                 <p class="card-text"><span class="name">${item.user.first_name} : </span>${item.user.bio}</p>
//             </div>
//         </div>
//       </a>
//     `
//   );
// }

// product page
function loadProductPage() {
  let obj = Object.fromEntries(new URLSearchParams(location.search));
  console.log(obj.id);
  for (let product of products) {
    if (product.id === obj.id) {
      sendToPrductPage(product);
    }
  }
}

// rendering a product to product page

function sendToPrductPage(item) {
  productPageDiv.insertAdjacentHTML(
    "beforeend",
    `  
        <div class="card m-5 " style="width: 20rem;" >
             <img src="${item.urls.small}"class="card-img-top"  alt="${item.urls.small}">
            <div class="card-body" id="${item.id}">
                <span> ${item.likes}</span> 
                <p class="card-text"><span class="name">${item.user.first_name} : </span>${item.user.bio}</p>
            </div>
        </div>
   `
  );
}
