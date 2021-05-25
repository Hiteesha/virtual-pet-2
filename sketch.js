//Create variables here
var dog
var feed
var lastFed
var sadImg,happyImg
var database
var foodS,foodStock,fedTime,addFood,foodObj

function preload()
{
	sadImg = loadImage("images/dogImg.png")
  happyImg = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(1000,400);
  database = firebase.database();

dog = createSprite(800,200,150,150);
dog.addImage(sadImg)
dog.scale = 0.15

foodStock = database.ref('Food')
foodStock.on("value",readStock)
feed = createButton("feed the DOG !!")
feed.position(700,95)
feed.mousePressed(feedDog)
addFood = createButton("ADD FOOD")
addFood.position(800,95);
addFood.mousePressed(addFood)

  
}


function draw() {  
  background(46,139,87)
 foodObj.display();
 feedTime = database.ref('FeedTime')
 feedTime.on("value",function(data){
   lastFed = data.val()

 })

  fill(255,255,254)
  textSize(15)
  if (lastFed >= 12){
    text("last Feed : "+lastFed%12+" PM",350,30)
  }

  else if(lastFed === 0){
    text("last Feed :12AM ",350,30)
  }

  else {
    text("last Feed : " +lastFed+" AM",350,30)
  }

  //add styles here
// if (keyWentDown(UP_ARROW)){
//   writeStock(foodS)
//   dog.addImage(happyImg)
// }
 drawSprites();
}
// textSize(20)
// fill(0)
// text("Note:press up arrow key to feed the dog to make him happy",130,10,300,20)
// text("Food Remaining : "+foodS,170,200)


// }

function readStock(data){
foodS = data.val();
console.log(foodS)
foodObj.updateFoodStock(foodS)
}

// function writeStock(x){
//   if ( x <= 0){
//     x =0
//   }

//   else {
//     x = x-1
//   }

//   database.ref('/').update({
//     Food:x
//   })

 function feedDog(){
   dog.addImage(happyImg)
   if(foodObj.getFoodStock()<=0){
     foodObj.updateFoodStock(foodObj.getFoodStock()*0);

   }
   else {
    foodObj.updateFoodStock(foodObj.getFoodStock()*-1); 
   }
   database.ref('/').update({
     Food:foodObj.getFoodStock(),
     FeedTime:hour()
   })
 }
 
function addFood(){
  foodS ++;
  database.ref('/'),update({
    Food:foodS
  })
}




