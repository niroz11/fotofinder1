var title = document.querySelector('#input');
var caption = document.querySelector('#caption');
var addButton = document.querySelector('#add-button');
var cardHolder = document.querySelector('.bottom-container');
var fileButton = document.querySelector('#button-choose');
var photosArray = [];



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

function loaded (){
  if(localStorage.getItem("photos") != null){
    photosArray = JSON.parse(localStorage.getItem("photos"));
    
    photosArray = photosArray.map(function(e){
        return new Photo(e.title, e.caption, e.file);
    })
    photosArray.forEach(function(e){
      appendCard(e);
    }); 
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
  alert('hey')
  if(event.target.classList.contains('delete-button')){

    deleteCard(event);
  }
}

function deleteCard(e){
  var element = e.target.closest(".card");
  var id = element.id; 
  var photo = getPhotoById(id); 
  var index = photos.indexOf(photo);  
  photos.splice(index,1);
  element.remove();
  
}
















