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
    setTimeout(() => {
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
  customer: "Tammy"
}

function makeCake() {
    console.log("makeCake context is: ", this)
  var updateCakeStatus = updateStatus.bind(this);
  mix.call(cake, updateCakeStatus)
}

function makePie() {
    console.log("makePie context is: ", this)
  var updatePieStatus = updateStatus.bind(this);
  pie.decorate = cake.decorate.bind(pie)
  mix.call(pie, updatePieStatus)
}

function updateStatus(statusText) {
  document.getElementsByClassName("status")[0].innerText = statusText
}

function bake(updateFunction) {
  console.log("bake context is:", this)
  var status = "Baking at " + this.bakeTemp + " for " + this.bakeTime
  setTimeout(() => {
    cool.call(this, updateFunction)
  }, 2000)
}

function mix(updateFunction) {
    var context = this
  console.log("mix context is: ", context)
  var status = "Mixing " + this.ingredients.join(", ")
  setTimeout(() => {
    bake.call(this, updateFunction)
  }, 2000)
  updateFunction(status)
}

function cool(updateFunction) {
    console.log("cool context is: ", this)
  var status = "It has to cool! Hands off!"
  setTimeout(() => {
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
