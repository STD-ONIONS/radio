!(function(win, doc){
	const app = document.querySelector('#app');
	for (let item in [...Array(10).keys()]) {
		let radio = doc.createElement('radio-station');
		app.append(radio);
	}
}(window, document));


// 645f93b81b9f184132990d1796da4376