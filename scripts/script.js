// Script.js

window.addEventListener('DOMContentLoaded', () => {
	var dataList;
	var addedItems=new Array(20).fill(false);
	fetch('https://fakestoreapi.com/products')
		.then(response => response.json())
		.then(data => {
			console.log(data);
			localStorage.setItem("data", JSON.stringify(data));
			}
		);
	var productContainer = document.getElementById("product-list");
	
	var cartCount = document.getElementById("cart-count");
	var items = JSON.parse(localStorage.getItem("data"));
	var addedItems2 = JSON.parse(localStorage.getItem("addedItems"));
	var buttons = new Array(20);

	let numInCart = 0;
	for( let i = 0; i < 20; i++){
		let product = document.createElement("product-item");
		product.shadowRoot.childNodes[3].childNodes[3].innerHTML = items[i].title;
		product.shadowRoot.childNodes[3].childNodes[5].innerHTML = items[i].price;
		product.shadowRoot.childNodes[3].childNodes[1].src = items[i].image;
		product.shadowRoot.childNodes[3].childNodes[1].alt = items[i].description;
		buttons[i] = product.shadowRoot.childNodes[3].childNodes[7];
		if( addedItems2 ){
		if( addedItems2[i] == true ){
			buttons[i].innerHTML = "Remove from Cart";
			buttons[i].onclick = function() {alert('Removed from Cart')};
			addedItems[i] = true;
			numInCart++;
		}
		}
		productContainer.appendChild(product);
	}
	cartCount.innerHTML = numInCart;
	
	for(let i = 0; i < 20; i++){
		buttons[i].addEventListener('click', function(event) 
		{
			let num = parseInt(cartCount.innerHTML);
			let added = true;
			if( buttons[i].innerHTML == "Add to Cart"){
				added = false;
			}
			if( !added ){
				buttons[i].innerHTML = "Remove from Cart";
				buttons[i].onclick = function() {alert('Removed from Cart')};
				addedItems[i] = true;
				num++;
			}
			else{
				buttons[i].innerHTML = "Add to Cart";
				buttons[i].onclick = function() {alert('Addd to Cart')};
				addedItems[i] = false;
				num--;
			}
			cartCount.innerHTML = num;
			localStorage.setItem("addedItems",JSON.stringify(addedItems));
			event.preventDefault();

		}, false);
	}
});
