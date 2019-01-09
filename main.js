var title = document.querySelector('#input');
var caption = document.querySelector('#caption');
var addButton = document.querySelector('#add-button');
var cardHolder = document.querySelector('.bottom-container');
var fileButton = document.querySelector('#choose-input');
var viewFav = document.querySelector('#view-fav');
var searchInput = document.querySelector('#search-text')
var searchButton = document.querySelector('#search-icon');
var showButton = document.querySelector('.show-more-button');
var photosArray = [];
var likedPhotos = 0;





addButton.addEventListener('click',addCard);
cardHolder.addEventListener('click', manageCard);
searchInput.addEventListener('keyup',searchPhoto);
viewFav.addEventListener('click', showFavPhotos);
showButton.addEventListener('click',showMore);



function addCard(){
  if(title.value === "" || caption.value === ""){
    addButton.disabled = true;
  } else {
  var file = window.URL.createObjectURL(fileButton.files[0]);
  var photo = new Photo(title.value, caption.value, file);
  photosArray.push(photo);
  appendCard(photo);
  photo.saveToStorage(photosArray)};
}; 
  
function appendCard(photo){

var card = `<div class="card" id="${photo.id}">
        <p class ="title editable title-edit">${photo.title}</p>
        <img src="${photo.file}" class="card-image">
        <p class="title editable caption-edit">${photo.caption} </p>
        <div class="card-buttons">
          <img src="./images/delete.svg" class="delete">
          <img src="./images/favorite${photo.favorite == true?'-active':''}.svg" class="love">
        </div>
      </div>`
      cardHolder.innerHTML += card;
};

window.onLoad = loaded();

function loaded(){
  var data = localStorage.getItem('photos');
  if(data !== null){
    data = JSON.parse(data); 
    
    for (var i =0; i<data.length; i++){
      var photo = Object.assign(new Photo(), data[i]);
      console.log(photo);
      photosArray.push(photo);
      
      
    }
    var filtered = photosArray.slice(-10);
      
      filtered.forEach(function(e){
        appendCard(e);
      });

    likedPhotos = parseInt(localStorage.getItem("likedPhotos")); 
    if(likedPhotos === null){
      likedPhotos = 0;
    }
     updateLikedPhotos();
    
    }
}

function getPhotoById(id){
  for(var i=0; i<photosArray.length; i++){
    if(id == photosArray[i].id){
      return photosArray[i];
    }
  }
}

function manageCard(event){
  
 if(event.target.classList.contains('delete')){
  deleteCard(event);
 } else if(event.target.classList.contains('love')){
      loveCard(event);
  } else if(event.target.classList.contains('editable')){
    editCard(event);
  }
};

function deleteCard(event){
  var element = event.target.closest('.card');
  var id = element.id;
  var photo = getPhotoById(id);
  console.log(photo);
  var index = photosArray.indexOf(photo);
  console.log(index);
  photosArray.splice(index,1);
  element.remove();
  if(photo.favorite == true){
    likedPhotos--;
    updateLikedPhotos();
  } 
  photo.saveToStorage(photosArray, likedPhotos);
}


function updateLikedPhotos(){
  if(likedPhotos == 0){
    viewFav.innerHTML = `No Favorite Photos`;
  } 
  else if(likedPhotos == 1){
    viewFav.innerHTML = `View ${likedPhotos} favorite`;
  }
  else{
    viewFav.innerHTML = `View ${likedPhotos} favorites`; 
  }
}


function loveCard(e){
  var element = e.target.closest(".card");
  var id = element.id; 
  var photo = getPhotoById(id); 
  
  if(photo.favorite == true){
    photo.favorite = false;
    e.target.src="./images/favorite.svg";
    likedPhotos--; 
  } 
  else {
    photo.favorite = true;
    e.target.src="./images/favorite-active.svg";
    likedPhotos++;
  }
   updateLikedPhotos();
   photo.updatePhoto("favorite", photo.favorite);
   photo.saveToStorage(photosArray,likedPhotos);
}


function editCard(event){
  event.target.contentEditable = true;
  event.target.addEventListener('blur',saveText);
  
}

function saveText(event){
  var element = event.target.closest(".card");
  var id = element.id; 
  var photo = getPhotoById(id); 
  if(event.target.classList.contains('title-edit')){
console.log(event.target.innerText, "heyy")
    photo.updatePhoto("title", event.target.innerText)
  }else if(event.target.classList.contains('caption-edit')){
    photo.updatePhoto("caption", event.target.innerText);
  }
  photo.saveToStorage(photosArray);
  
}

function searchPhoto(){
  var searchText = searchInput.value;
  cardHolder.innerHTML = "";
  var filteredPhotos = photosArray.filter(function(e){
    if(e.title.includes(searchText) || e.caption.includes(searchText)){
      return e;
    }
  })
  filteredPhotos.forEach(function(e){
    appendCard(e);
  })
}; 

function showFavPhotos(){
  if(viewFav.innerHTML = `View ${likedPhotos} favorite`){
    cardHolder.innerHTML = "";

  var filteredPhotos = photosArray.filter(function(e){
    if(e.favorite === true){
      return e;
    }
  });
  filteredPhotos.forEach(function(e){
    appendCard(e);
  }); 
  viewFav.innerHTML = "Show All Photos";
} else if(viewFav.innerHTML == "Show All Photos"){
    viewFav.innerHTML = `View ${likedPhotos} favorite`;
    cardHolder.innerHTML = "";
    photosArray.forEach(function(e){
      appendCard(e);
    });
}
}; 

// function displayWelcomeNote(){
//   if(photosArray.length === 0){
//     cardHolder.innerHTML = `<h1 class="welcome-note"> Post Your photos</h1>`
//   }
// };

// displayWelcomeNote();



function showMore(){
  if(showButton.innerText === "Show More"){
    showButton.innerText = "Show Less";
    cardHolder.innerHTML = "";
    photosArray.forEach(function(e){
      appendCard(e);
    })

  } else if(showButton.innerText === "Show Less"){
    cardHolder.innerHTML = "";
    var filtered = photosArray.slice(-10);
      
      filtered.forEach(function(e){
        appendCard(e);
      });
  }
}















 























