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
});
