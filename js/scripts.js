function Pizza(size) {
	this.size = size;
	this.toppings = [];
	this.price = 0;
};

Pizza.prototype.addTopping = function(topping) {
	this.toppings.push(topping);
};

Pizza.prototype.getPrice = function() {
	var meats = ["pepperoni", "sausage", "bacon", "ham", "chicken", "anchovies"];
	var veggies = ["black olives", "kalamata olives", "mushrooms", "spinach", "artichoke hearts", "bell peppers", "pineapple", "sun dried tomatoes",
	"tomatoes", "garlic"];

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

///////MULTISTEP FORM JQUERY///////////

var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function(){
	if(animating) return false;
	animating = true;

	current_fs = $(this).parent();
	next_fs = $(this).parent().next();

	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

	//show the next fieldset
	next_fs.show();
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'transform': 'scale('+scale+')'});
			next_fs.css({'left': left, 'opacity': opacity});
		},
		duration: 800,
		complete: function(){
			current_fs.hide();
			animating = false;
		},
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;

	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();

	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

	//show the previous fieldset
	previous_fs.show();
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		},
		duration: 800,
		complete: function(){
			current_fs.hide();
			animating = false;
		},
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".submit").click(function(){
	return false;
});


//////// JQUERY FORM INPUT ////////

$(document).ready(function() {
	$("#msform").submit(function(event) {
		event.preventDefault();
		var size = $("#size").val();
		$('#sizeInput').text(size);
		var quantity = parseInt($("#quantity").val());
		console.log(quantity);
		$('#quantityInput').text(quantity);
		var meats = $("#meats").val();
		veggies = $("#veggies").val();
		var toppings;
		if (meats == null && veggies == null) {
			toppings = [];
		} else if (meats == null){
			toppings = veggies;
		} else if (veggies == null) {
			toppings = meats;
		} else {
			toppings = meats.concat(veggies);
		}

		var pizza = new Pizza(size);
		for (var i = 0; i < toppings.length; i++) {
			pizza.addTopping(toppings[i]);
			$('#toppingsInput').append(toppings[i] + " &diams; ");
		}
		var price = pizza.getPrice();
		var total = price*quantity;
		console.log(total);
		$('#total').text(total);

		$("#confirmOrder").click(function(event) {
			event.preventDefault();
			var name = $("#name").val();
			$("#review").hide();
			$("#confirm").show();
			$('#customerName').text(name);
		})
	});
});
