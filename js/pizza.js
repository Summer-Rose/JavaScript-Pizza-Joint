function Pizza(size) {
	this.size = size;
	this.toppings = [];
	this.price = 0;
}

Pizza.prototype.addTopping = function(topping) {
	this.toppings.push(topping);
} 

