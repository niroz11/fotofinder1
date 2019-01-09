var title = document.querySelector('#input');
var caption = document.querySelector('#caption');
var addButton = document.querySelector('#add-button');
var cardHolder = document.querySelector('.bottom-container');
var fileButton = document.querySelector('#button-choose');
var viewFav = document.querySelector('#view-fav');
var photosArray = [];
var likedPhotos = 0;



addButton.addEventListener('click',addCard);
cardHolder.addEventListener('click', manageCard);



function addCard(){
  var file = window.URL.createObjectURL(fileButton.files[0]);
  var photo = new Photo(title.value, caption.value, file);
  photosArray.push(photo);
  appendCard(photo);
  photo.saveToStorage(photosArray);
  
}; 

function appendCard(photo){
  
  
  var card =  `<div class="card" id="${photo.id}">
    <div> <h1 class ="title editable title-edit">${photo.title}</h1> </div>
    <div> <img class="card-image" src="${photo.file}"></div>
    <div><p class="title editable caption-edit">${photo.caption}</p></div>
    <div class="card-buttons">
      <button class="delete-button"><img src="./images/delete.svg" class="delete"></button>
      <button class="love-button"><img src="./images/favorite${photo.favorite == true?'-active':''}.svg" class="love"></button>
    </div>
  </div>`
  cardHolder.innerHTML += card;
}



window.onLoad = loaded();

function loaded(){
  var data = localStorage.getItem('photos');
  if(data !== null){
    data = JSON.parse(data); 
    console.log(data)
    for (var i =0; i<data.length; i++){
      var photo = Object.assign(new Photo(), data[i]);
      photosArray.push(photo);
      appendCard(photo); 
    }
    likedPhotos = parseInt(localStorage.getItem("likedPhotos")); 
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
  photo.saveToStorage(photosArray);
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
  var index = photosArray.indexOf(photo);
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
   photo.updatePhoto(photo.title,photo.caption,photo.file,photo.favorite);
   photo.saveToStorage(photos);

}























