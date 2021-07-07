

document.addEventListener('DOMContentLoaded', init);

function init(){
	console.log('init');
	
	// cart
	window.CART = {price:0, qty:0};
	window.add_cart = function(price, qty){
		CART.price += parseFloat(price) * parseInt(qty);
		CART.qty += qty;
		
		document.querySelector('.cart-count').innerText = CART.qty;
		document.querySelector('.cart-price').innerText = CART.price;
	}
	window.null_cart = function(price, qty){
		CART.price = 0;
		CART.qty = 0;
		
		document.querySelector('.cart-count').innerText = 'XXX';
		document.querySelector('.cart-price').innerText = 'XXX';
	}
	
	// add to cart
	document.querySelectorAll(".product-box__btn").forEach(function( el ){
		el.addEventListener('click', function( event ) {
			console.log('click');
			
			let blk = event.target.closest(".product-box__item");
			let price = blk.getAttribute("data-price");
			let qty = parseInt(blk.querySelector('.qty__item').value);
			qty = qty ?qty :1;
			
			add_cart(price, qty);
		});
	});
	
	// filter category
	document.querySelector('[data-filter-category]').addEventListener('input', function( event ){
		let category = this.value;
		Array.from( document.querySelectorAll('.product-box__item') ).map(function( node ) {
			if( category!='0' && node.getAttribute("data-category")!=category ){
				node.style.display = 'none';
			}
			else{
				node.style.display = 'block';
			}
		});
	});
	
	// filter price
	document.querySelector('[data-filter-price]').addEventListener('input', function( event ){
		let price = parseFloat(this.value);
		Array.from( document.querySelectorAll('.product-box__item') ).map(function( node ) {
			if( price && parseFloat(node.getAttribute("data-price"))>price ){
				node.style.display = 'none';
			}
			else{
				node.style.display = 'block';
			}
		});
	});
	
	// to order
	document.querySelector("#toorder").addEventListener('click', function( event ){
		if( !CART.qty ){
			return alert('Корзина пуста');
		}
		document.querySelector("#order").style.display = 'block';
	});
	window.doorder = function(){
		let name = document.querySelector('#order [type="name"]').value.trim();
		if( !name ){
			return alert('Заполните поле Имя');
		}
		
		let email = document.querySelector('#order [type="email"]').value.trim();
		if( !email ){
			return alert('Заполните поле email');
		}
		
		null_cart();
		document.querySelector('#order [type="name"]').value = '';
		document.querySelector('#order [type="email"]').value = '';
		
		alert('Заказ оформлен. Благодарим за покупки!');
		document.querySelector("#order").style.display = 'none';
	}
}