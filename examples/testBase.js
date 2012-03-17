var Animal = Base.extend({
  constructor: function(name) {
    console.log("animal constructor");
    this.name = name;
  },

  name: "",

  eat: function() {
    this.say("Yum!");
  },

  say: function(message) {
    alert(this.name + ": " + message);
  },

  nextStep: function () {
    console.log("Animal nextStep");
    console.log(this);
    this.compute();
  },
});

var Cat = Animal.extend({
  constructor: function (wild) {
    console.log("cat constructor");
    this.base("animalName");
    this.wild = true;
  },

  wild: false,

  eat: function(food) {
    if (food instanceof Mouse) this.base();
    else this.say("Yuk! I only eat mice.");
  },

  compute: function () {
    console.log("Cat compute");
  },

}, "haha");

var Mouse = Animal.extend();

