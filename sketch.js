###

var nameInput;
var submitButton;
var database;
var button;
var score;

function setup() {
  createCanvas(400, 400);
  score = 0;
  createP("Click the button to get points");
  button = createButton("click");
  button.mousePressed(increaseScore);
  nameInput = createInput("name");
  submitButton = createButton("submit");
  submitButton.mousePressed(submitScore);
###


  // Initialize Firebase
  var firebaseConfig = {
    apiKey: "AIzaSyArI0HTiOIZk85GMhJdUHQSanAJSj8fIbU",
    authDomain: "cstudioiv-dreamscape.firebaseapp.com",
    databaseURL: "https://cstudioiv-dreamscape-default-rtdb.firebaseio.com",
    projectId: "cstudioiv-dreamscape",
    storageBucket: "cstudioiv-dreamscape.appspot.com",
    messagingSenderId: "898961855054",
    appId: "1:898961855054:web:cfaf5cf99b8f607683e91f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();

  var ref = database.ref("scores");
  ref.on("value", gotData, errData);
}

function gotData(data) {
  //console.log(data.val());
  var scores = data.val();
  var keys = Object.keys(scores);
  //console.log(keys);

  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var submittedScore = scores[k].score;
    var submittedName = scores[k].name;
    console.log(
      "Key: " + k + "   Score: " + submittedScore + "   Name: " + submittedName
    );
  }
}

function errData(err) {
  console.log("Error!");
  console.log(err);
}

function increaseScore() {
  score++;
}
function draw() {
  background(200);
  textSize(100);
  textAlign(CENTER);
  text(score, width / 2, height / 2);
}

function submitScore() {
  var data = {
    name: nameInput.value(),
    score: score
  };
  var ref = database.ref("scores");
  ref.push(data);
  //console.log(data);
  score = 0;
}
