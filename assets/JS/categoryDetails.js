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

  return data;
};

const displayProducts = async (page = 1) => {
  const data = await getProducts(page);
  const numberOfPages = Math.ceil(data.data.total / 10 ) ;


  const result = data.data.products.map((product) => {
      return `
        <div class='product'> 
        <img src="${product.thumbnail}" alt="${product.description}" class='images'/>
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
  document.querySelector(".pagination").innerHTML = paginationLinks;

// end   pagination // 

modal();

};

 displayProducts();


 // start Modal // *******************************
 function modal(){

  let currentIndex = 0;

        const modal = document.querySelector(".my-modal");
        const closeBtn = document.querySelector(".close-btn");
        const leftBtn = document.querySelector(".left-btn");
        const rightBtn = document.querySelector(".right-btn");
        const images = Array.from( document.querySelectorAll(".images"));
        console.log(images);

        images.forEach(function(img){

          img.addEventListener("click", function(e){
            modal.classList.remove('d-none');
            modal.querySelector("img").setAttribute("src", e.target.src);

          
        })
           })


      // closeBtn    // *******************************

        closeBtn.addEventListener('click', function(){
          modal.classList.add('d-none');
        });

      // right Btn  // *******************************

        rightBtn.addEventListener("click", function(){
          currentIndex++;
          if(currentIndex >= images.length) currentIndex = 0;
          modal.querySelector("img").setAttribute("src", images[currentIndex].src);
        });

        // left Btn  // *******************************

        leftBtn.addEventListener("click", function(){
          currentIndex--;
          if(currentIndex < 0) currentIndex = images.length - 1;
          modal.querySelector("img").setAttribute("src", images[currentIndex].src);
        });







}
