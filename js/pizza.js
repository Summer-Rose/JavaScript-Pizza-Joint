function Pizza(size) {
	this.size = size;
	this.toppings = [];
	this.price = 0;
}

Pizza.prototype.addTopping = function(topping) {
	this.toppings.push(topping);
} 

Pizza.prototype.getPrice = function() {
	var meats = ["pepperoni", "sausage", "bacon"];
	var veggies = ["black olives", "artichoke hearts", "bell peppers"];
	var total = 0;
	if (this.size == "Large") {
		total += 20;
	} else if (this.size == "Medium") {
		total += 15;
	} else {
		total += 10;
	}

	for (var i = 0; i < this.toppings.length; i++) {
		for (var j = 0; j < meats.length; j++) {
			if (this.toppings[i] == meats[j]) {
				total += .75;
			}
		}
		for (var j = 0; j < veggies.length; j++) {
			if (this.toppings[i] == veggies[j]) {
				total += .50;
			}
		}
	}	
	return total;
}