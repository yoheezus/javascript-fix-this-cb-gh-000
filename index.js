var cake = {
  name: "German Chocolate Cake",
  ingredients: ["eggs", "flour", "oil", "chocolate", "sugar", "butter"],
  topping: "coconut frosting",
  bakeTemp: "425 degrees",
  bakeTime: "45 minutes",
  customer: "Tommy",
  decorate: function(updateFunction) {
    var status = "Decorating with " + this.topping + ". Ready to eat soon!"
    updateFunction(status)
    setTimeout(function() {
      updateFunction(serve.apply(this, "Happy Eating!", this.customer))
    }, 2000)
  }
}

var pie = {
  name: "Apple Pie",
  ingredients: ["apples", "flour", "eggs", "butter", "sugar"],
  topping: "streusel",
  bakeTemp: "350 degrees",
  bakeTime: "75 minutes",
  customer: "Tammy",
  decorate: cake.decorate.bind(pie)
}

function makeCake() {
    var context = this
    console.log("makeCake context is: ", context)
  var updateCakeStatus = updateStatus.bind(context);
  mix.call(context, updateCakeStatus)
}

function makePie() {
    console.log("makePie context is: ", this)
  var updatePieStatus = updateStatus.bind(this);
  mix.call(this, updatePieStatus)
}

function updateStatus(statusText) {
    console.log(this)
  document.getElementsByClassName("status")[0].innerText = statusText
}

function bake(updateFunction) {
  console.log("bake context is:", this)
  var status = "Baking at " + this.bakeTemp + " for " + this.bakeTime
  setTimeout(function() {
    cool(updateFunction)
  }, 2000)
}

function mix(updateFunction) {
    var context = this
  console.log("mix context is: ", context)
  var status = "Mixing " + this.ingredients.join(", ")
  setTimeout(function(context) {
    bake.call(context, updateFunction)
  }, 2000)
  updateFunction(status)
}

function cool(updateFunction) {
  var status = "It has to cool! Hands off!"
  setTimeout(function() {
    this.decorate(updateFunction)
  }, 2000)
}

function makeDessert() {
  //add code here to decide which make... function to call
      if (this.parentNode === document.getElementById("cake")) {
          console.log("clicked cake")
          makeCake.call(cake)
      } else if (this.parentNode === document.getElementById("pie")) {
          console.log("clicked pie")
          makePie.call(pie)
      }
  //based on which link was clicked
}

function serve(message, customer) {
  //you shouldn't need to alter this function
  return(customer + ", your " + this.name + " is ready to eat! " + message)
}

document.addEventListener("DOMContentLoaded", function(event) {
  //you shouldn't need to alter this function
  var cookLinks = document.getElementsByClassName("js-make")
  for(var i=0; i<cookLinks.length; i++) {
    cookLinks[i].addEventListener("click", makeDessert)
  }
});
