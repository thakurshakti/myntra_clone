fetch("https://run.mocky.io/v3/bf175661-5e9f-4112-8580-d587759ff72e")
    .then((apidata) => apidata.json())
    .then((data) => data.products)
    .then((data) => {
        cards(data)
        filter(data)
        categories(data)
        brands(data)
        saveData(data)
        brandFilter(data)
        cateFilter(data)
        searchData(data)

    });

    var productData = [];
const saveData = (data) => {
    productData = data;
};

// This section for displaying cards ----------------------------------
var cards = (data) => {
    console.log(data);
    var cardData = document.getElementById("column");
    var htmlContent=[];
    data.forEach((elem) => {
        htmlContent += ` <div class="col1">
    <img src=${elem.searchImage} alt="watch">
    <h4>${elem.brand}</h4>
    <p>${elem.productName}</p>
    <h4>${elem.price}</h4>
</div>`
        cardData.innerHTML = htmlContent;
    })
};




// This section for displaying gender in sidebar-----------------------------------:-
const filter=(data)=>{
    console.log(data);
    var filterHtml=document.getElementById("filter");
    var htmlContent=[];
    data.forEach((element) => {
        htmlContent.push(element.gender)
    })
    const mySet=new Set(htmlContent)
    console.log(mySet);
    var htmlContent=`<h3>FILTER</h3>`;
    mySet.forEach((element)=>{
    htmlContent+=` <input type="radio" name="gender" value=${element} onclick="genderFilter()" />${element}<br />`;
 })

    filterHtml.innerHTML=htmlContent;
};
// filter data from gender-----------------------------------------------------------:-
function genderFilter() {
    var genderVal = document.querySelector('input[name="gender"]:checked').value;
    var data = productData.filter((radiodata) => radiodata.gender === genderVal);
    console.log(data)
    cards(data);
}





// This section for displaying categories------------------------------------------------:-
const categories=(data)=>{
    console.log(data);
    var cateHtml=document.getElementById("cate"); 
    var htmlContent=[];
    data.forEach((elements) => {
        htmlContent.push(elements.category)

     })
    const mySet=new Set(htmlContent)
    console.log(mySet);
    var htmlContent=`<h3>CATEGORIES</h3>`;
    mySet.forEach((element)=>{
    htmlContent+=`<input type="checkbox" onclick="cateFilter()" name="category" value=${element}>
    <label for="Women" >${element}</label><br>`;
 })
 cateHtml.innerHTML=htmlContent;
}
// filter data from category---------------------------------------------------:-
function cateFilter() {
    var brandVal = document.querySelectorAll('input[name="category"]:checked');
    var brandData = [];
    brandVal.forEach((elem) => {
        elem.checked ? brandData.push(elem.value) : null ;
    })
    var resultBrand = []; 
    brandData.forEach((val) => {
        resultBrand = resultBrand.concat(productData.filter((product) => product.category.includes(val)))
        
    })
    brandData.length!==0? cards(resultBrand):cards(productData)
    
};





// this section for Displaying brands-------------------------------------------------:-
const brands=(data)=>{
    console.log(data);
    var brandHtml=document.getElementById("brands");
    var brandData=[];
    data.forEach((subData)=>{
       brandData.push(subData["brand"])
    })
   const mySet=new Set(brandData)
   console.log(mySet);
   var htmlContent=`<h3>BRANDS</h3>`;
   mySet.forEach((element)=>{
   htmlContent+=` <input type="checkbox"  name="brand" onclick="brandFilter()" name="Tops" value=${element}>
   <label for="Tops">${element}</label><br>`;
})
   brandHtml.innerHTML=htmlContent;
}
// Filter data from brand-----------------------------------------------------:-
function brandFilter() {
    var brandVal = document.querySelectorAll('input[name="brand"]:checked');
    var brandData = [];
    brandVal.forEach((elem) => {
        elem.checked ? brandData.push(elem.value) : null ;
    })
    var resultBrand = []; 
    brandData.forEach((val) => {
        resultBrand = resultBrand.concat(productData.filter((product) => product.brand.includes(val)))
    })
    
   brandData.length!==0? cards(resultBrand):cards(productData)
};







// This section for nav serchbar--------------------------------------------:-

function searchData() {
    var searchKeyword = document.getElementById("navSearch").value.toUpperCase();
    console.log(searchKeyword);
    var searchResult = productData.filter((searchItem) => searchItem.product.toUpperCase().includes(searchKeyword));
    console.log(searchResult);
    cards(searchResult);
};
