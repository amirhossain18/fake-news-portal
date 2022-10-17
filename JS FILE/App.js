const loadNewsCatagory= ()=>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res=>res.json())
    .then(data=> displayCategory(data.data.news_category))
}



const displayCategory= (categories)=>{
for(const category of categories){
    // console.log(category.category_name)
    const Did=(`${category.category_id}`)


const catagoryContainer= document.getElementById('catagory')
    const newCatagoryDIv= document.createElement('div')
    newCatagoryDIv.classList.add('topnav')
    
    
    newCatagoryDIv.innerHTML=`

 <a onclick="catagoryNewsPage(${category.category_id})"  >${category.category_name }</a>
`
catagoryContainer.appendChild(newCatagoryDIv)
}


}


const catagoryNewsPage= (idCode)=>{
  const catagoryContainer= document.getElementById('catagory')
  
    toggleSpiner(true);
   const url= `https://openapi.programming-hero.com/api/news/category/0${idCode}`
    

    fetch(url)
    .then(res=>res.json())
    .then(categories=> categorynewsList(categories.data))
   
}
const newsContainer= document.getElementById('newscontainer')
newsContainer.innerText='';
const categorynewsList= (categories)=>{
    console.log(categories.length)
    newsContainer.innerHTML="";
 for(category of categories){
    console.log(category.rating)
  const newsAmount= document.getElementById('newsAmount')
        newsAmount.innerText='';
        newsAmount.innerText= `   Total News ${categories.length} 
        `
 
    const newNewsDiv = document.createElement('div')
    

    newNewsDiv.innerHTML=`
    <div class="card m-2" style="width: 22rem;">
    <img src=${category.image_url} class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${category.title}</h5>
      <p class="card-text ">${category.details.slice(0,100)}  ...</p>
    </div>
    <div class="card-body">
   


    <i class="fa-sharp fa-solid fa-eye ml-2"></i> ${category.total_view ? category.total_view : '<span  fw-bold">No Viewer</span>'}
    
    
 
  <i class="fa-solid fa-star m-1"></i>
  <i class="fa-solid fa-star m-1"></i>
  <i class="fa-solid fa-star-half-stroke m-1"></i>
  <i class="fa-regular fa-star m-1"></i>
  <i class="fa-regular fa-star m-1"></i>   

      <button onclick="openNav('${category._id}')" type="button" class="btn btn-success">Read More</button>

    </div>
    <ul class="list-group list-group-flush  d-flex align-items-center">
       <img class="w-25 rounded-circle mt-2" src=${category.author.img} alt=""> 
      <li class="list-group-item">${category.author.name ? category.author.name : '<span  fw-bold">Not Found</span>'}</li>
      <li class="list-group-item">${category.author.published_date}</li>
    </ul>
    
    </div>
    
    `
    newsContainer.appendChild(newNewsDiv)
 }
 toggleSpiner(false);
}

const toggleSpiner= isLoading=>{
    const lodarSection= document.getElementById('lodar')
    if(isLoading){
        lodarSection.classList.remove('d-none')
    }

    else{
        lodarSection.classList.add('d-none')
    }
}

catagoryNewsPage(01)


loadNewsCatagory()

function openNav(newsID) {
    document.getElementById("mySidenav").style.width = "100%";

   const newsUrl=`https://openapi.programming-hero.com/api/news/${newsID}` 

  fetch(newsUrl)
  .then(res=>res.json())
  .then(data=>displayFullNews(data.data[0]))

  const displayFullNews= Newsdata=>{
    console.log(Newsdata)
    const newsDetails= document.getElementById("mySidenav1")
    newsDetails.innerHTML=`
   <h1> ${Newsdata.title}</h1>
   <img src=${Newsdata.image_url} class="card-img-top w-50" alt="...">
   <h6>${Newsdata.details}</h6>
    
    `
  }

   
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }