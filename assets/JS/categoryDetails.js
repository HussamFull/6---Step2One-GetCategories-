const getProducts = async (page) => {
  /*  
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const data = await axios.get(
    `https://dummyjson.com/products/category/${category}`
  );
  */
////////////////////////////////
  const skip = (page - 1 ) * 10;

  const data = await axios.get(`https://dummyjson.com/products?limit=10&skip=${skip}`);
  console.log(data);

  return data;
};

const displayProducts = async (page = 1) => {
  const data = await getProducts(page);
  const numberOfPages = Math.ceil(data.data.total / 10 ) ;
  console.log(page);


  const result = data.data.products.map((product) => {
      return `
        <div class='product'> 
        <img src='${product.thumbnail}' alt='${product.description}'>
        <h3>${product.title}</h3>
        <span>${product.price}</span>
        </div>
        `;
    })
    .join(" ");

  document.querySelector(".products .row").innerHTML = result;

  // start  pagination // 
  let paginationLinks = ``;
  
  if(page==1) {
    paginationLinks += `<li class="page-item "><button class="page-link" disabled>&laquo;</button></li>`;
  } else {
    paginationLinks += `<li class="page-item"><button onclick= displayProducts('${page - 1}') class="page-link" >&laquo;</button></li>`;
  }



  for (let i = 1; i <= numberOfPages; i++) {
    paginationLinks += `<li class="page-item ${i == page?'active':''} "><button onclick= displayProducts('${i}') class="page-link" >${i}</button></li>`;
  }


  if(page==numberOfPages) {
    paginationLinks += `<li class="page-item"><button class="page-link" disabled>&raquo;</button></li>`;
  } else {

  paginationLinks += ` <li class="page-item"><button onclick= displayProducts('${parseInt(page) + 1}') 
   class="page-link" >&raquo;</button></li>`;
  }


  console.log(paginationLinks);
  

  document.querySelector(".pagination").innerHTML = paginationLinks;

// end   pagination // 



};

 displayProducts();
