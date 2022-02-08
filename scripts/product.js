const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const url = "https://kea-alt-del.dk/t7/api/products/" + id;
//fetch the data
fetch(url)
  .then((res) => res.json())
  .then((data) => showProduct(data));
//populate the page

function showProduct(product) {
  document.querySelector(".breadcrumbs .brand a").textContent =
    product.brandname;
  document.querySelector(
    ".breadcrumbs .brand a"
  ).href = `productlist.html?brandname=${product.brandname}`;
  document.querySelector(".breadcrumbs .productName").textContent =
    product.productdisplayname;
  document.querySelector(
    "img.productImage"
  ).src = `https://kea-alt-del.dk/t7/images/webp/1000/${product.id}.webp`;
  document.querySelector("img.productImage").alt = product.productdisplayname;

  document.querySelector(".purchaseBox h1").textContent =
    product.productdisplayname;

  document.querySelector(".purchaseBox h2").textContent =
    product.brandname + " | " + product.articletype;

  document.querySelector(".purchaseBox h3").textContent =
    "DKK " + product.price + ",-";

  if (product.styledesc == null) {
    document.querySelector(".purchaseBox span").innerHTML = "-";
  } else {
    document.querySelector(".purchaseBox span").innerHTML = product.styledesc;
  }

  document.querySelector(".productDesc div dl dd:nth-of-type(1)").textContent =
    product.productdisplayname;
  document.querySelector(".productDesc div dl dd:nth-of-type(2)").textContent =
    product.id;
  document.querySelector(".productDesc div dl dd:nth-of-type(3)").textContent =
    product.basecolour;
  if (product.materialcaredesc === null) {
    document.querySelector(
      ".productDesc div dl dd:nth-of-type(4)"
    ).textContent = "-";
  } else {
    document.querySelector(".productDesc div dl dd:nth-of-type(4)").innerHTML =
      product.materialcaredesc;
  }
  document.querySelector(".brandInfo h1").textContent = product.brandname;
  document.querySelector(".brandInfo p").textContent = product.brandbio;
}
