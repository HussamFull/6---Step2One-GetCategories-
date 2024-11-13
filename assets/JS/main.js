// -------------------يمكن عمل فنكشن  جلب  البيانات والداتا من Api 

const getCategories = async () => {

    const {data} = await axios.get(`https://dummyjson.com/products/category-list`);

    return data;
}


// -------------------يمكن عمل فنكشن ثاني لعرض البيانات والداتا من Api 

const displayCategories = async () => {
    const categories = await getCategories();
  

    const result = categories.map( (category) => {
        return `<div class='category'> 
        <h2>${category}</h2>
        <a href='categoryDetails.html?category=${category}'>View Detail</a>
        </div>`
    } ).join(' ');
    
    document.querySelector(".categories .row").innerHTML = result;
}

displayCategories();




