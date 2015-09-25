describe('Pizza', function() {
  it("Gets correct size of new instance of Pizza", function() {
  	var newPizza = new Pizza("Large");
    expect(newPizza.size).to.equal("Large");
  });

  it("Returns correct topping array of new instance of Pizza", function() {
  	var newPizza = new Pizza("Large");
  	newPizza.addTopping("Mushrooms");
  	newPizza.addTopping("Sun Dried Tomatoes");
    expect(newPizza.toppings).to.eql(["Mushrooms", "Sun Dried Tomatoes"]);
  });

  it("Returns correct price based on size of pizza", function() {
  	var newPizza = new Pizza("Large");
    expect(newPizza.getPrice()).to.equal(20);
  });

  it("Returns correct price based on size of pizza and meat toppings", function() {
  	var newPizza = new Pizza("Large");
  	newPizza.addTopping("bacon");
    expect(newPizza.getPrice()).to.equal(20.75);
  });

   it("Returns correct price based on size of pizza and multiple toppings", function() {
  	var newPizza = new Pizza("Small");
  	newPizza.addTopping("bacon");
  	newPizza.addTopping("black olives");
  	newPizza.addTopping("artichoke hearts");
    expect(newPizza.getPrice()).to.equal(11.75);
  });
});
