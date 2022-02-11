const urlParams = new URLSearchParams(window.location.search);
const brand = urlParams.get("brandname");

const url = "https://kea-alt-del.dk/t7/api/products?brandname=" + brand;

fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    handleProductList(data);
  });

function handleProductList(data) {
  data.forEach(showProduct);
}

/*
        <article class="productCard">
          <p class="saleLabel">SALE</p>
          <img
            src="https://kea-alt-del.dk/t7/images/webp/640/1528.webp"
            alt="t-shirt"
          />
          <h3>Black Fleece Jacket</h3>
          <p class="subtitle">Jackets | Puma</p>
          <div class="discount">
            <p>DKK 2000,-</p>
            <p>-49%</p>
          </div>
          <p class="price">DKK 3999,-</p>
          <a href="product.html">BUY NOW</a>
        </article>
*/

function showProduct(item) {
  //grab template
  const template = document.querySelector("#productTemplate").content;
  //clone it
  const copy = template.cloneNode(true);
  //change content
  //breadcrumbs
  document.querySelector(".breadcrumbs li:last-of-type").textContent = brand;

  copy.querySelector(
    ".subtitle"
  ).textContent = `${item.articletype} | ${item.brandname}`;
  copy.querySelector(
    ".productCard img"
  ).src = `https://kea-alt-del.dk/t7/images/webp/640/${item.id}.webp`;
  copy.querySelector(".productCard img").alt = `${item.productdisplayname}`;
  copy.querySelector(
    ".productCard h3"
  ).textContent = `${item.productdisplayname}`;
  if (item.soldout) {
    copy.querySelector("article").classList.add("soldOut");
    copy.querySelector("a").textContent = "SOLD OUT";
  }
  if (item.discount) {
    copy.querySelector("article").classList.add("onSale");
    copy.querySelector(".discount p").textContent =
      "DKK " +
      Math.ceil(item.price - (item.discount / 100) * item.price) +
      ",-";
    copy.querySelector(
      ".discount p:nth-of-type(2)"
    ).textContent = `- ${item.discount} %`;
  }
  copy.querySelector(".price").textContent = item.price + ",-";
  copy.querySelector("a").setAttribute("href", `product.html?id=${item.id}`);
  //grab parent
  const parent = document.querySelector("main");
  //append
  parent.appendChild(copy);
}
