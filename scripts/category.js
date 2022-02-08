const url = "https://kea-alt-del.dk/t7/api/brands";

fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    handleProductList(data);
  });

function handleProductList(data) {
  data.sort(function (a, b) {
    if (a.brandname < b.brandname) {
      return -1;
    }
    if (a.brandname > b.brandname) {
      return 1;
    }
    return 0;
  });
  data.forEach(showProduct);
}

function showProduct(item) {
  //grab template
  const template = document.querySelector("#categoryTemplate").content;
  //clone it
  const copy = template.cloneNode(true);
  //change content
  copy
    .querySelector("a")
    .setAttribute("href", `productlist.html?brandname=${item.brandname}`);
  copy.querySelector("a span").textContent = `${item.brandname}`;

  if (item.brandbio == null) {
    copy.querySelector("a span:nth-of-type(2)").textContent = " ";
  } else {
    copy.querySelector(
      "a span:nth-of-type(2)"
    ).textContent = `${item.brandbio}`;
  }

  //grab parent
  const parent = document.querySelector("main");
  //append
  parent.appendChild(copy);
}
