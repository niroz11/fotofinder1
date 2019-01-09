class Photo {
	constructor(title,caption,file){
		this.title = title;
		this.caption = caption;
		this.file = file;
		this.favorite = false;
		this.id = new Date().getTime();

	}
	saveToStorage(photosArray,likedPhotos){

		localStorage.setItem("photos",JSON.stringify(photosArray));
		if(likedPhotos != null){

		localStorage.setItem('likedPhotos', JSON.stringify(likedPhotos));
		}

	}
	deleteFromStorage(photosArray){
		localStorage.setItem("photos",JSON.stringify(photosArray));
	}
	updatePhoto(property,value){
    this[property] = value;
  }

  

  

	

};