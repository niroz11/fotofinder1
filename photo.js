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
	updateContent(title, caption){
		this.title = title;
		this.caption = caption;
	}

	

};