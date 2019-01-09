class Photo {
	constructor(title,caption,file){
		this.title = title;
		this.caption = caption;
		this.file = file;
		this.favorite = false;
		this.id = new Date().getTime();

	}
	saveToStorage(photosArray){
		localStorage.setItem("photos",JSON.stringify(photosArray));
	}
	deleteFromStorage(photosArray){
		localStorage.setItem("photos",JSON.stringify(photosArray));
	}

	

};