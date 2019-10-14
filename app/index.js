function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

import clock from "clock";
import document from "document";
import { today } from 'user-activity';
import * as fs from "fs";
import { me } from "appbit";
import { units } from "user-settings";
import { preferences } from "user-settings";
import { goals } from "user-activity";
import * as util from "../common/utils";

import { me } from "appbit";
import * as messaging from "messaging";
import { user } from "user-profile";
//import { user } from "user-profile";
import { me } from "appbit";
import { readFileSync }  from "fs";
import { inbox } from "file-transfer"
import { readFileSync } from "fs";
import { HeartRateSensor } from "heart-rate";
import { user } from "user-profile";
import Weather from '../common/weather/device'
import { readFileSync } from "fs";
import * as cbor from 'cbor';
console.log(units.temperature)


console.log(units.temperature);
console.log(units.distance)
//import { HeartRateSensor } from "heart-rate";



// Update the clock every second
clock.granularity = "seconds";

let hourHand = document.getElementById("hours");
let minHand = document.getElementById("mins");
let secHand = document.getElementById("secs");
let circle = document.getElementById("circle")
let mySteps = document.getElementById("mySteps");
let myTemp = document.getElementById("myTemp");
let myRight = document.getElementById("myRight")
let myLeft = document.getElementById("myLeft")
var hiddenButton = document.getElementById("hiddenButton");
let stepRing = document.getElementById("stepRing")
let calRing = document.getElementById("calRing")
let minsRing = document.getElementById("minsRing")
//let mySteps = document.getElementById("minsRing")
let myHR = document.getElementById("myHR")
let myFloors = document.getElementById("myFloors")
let myActiveMins = document.getElementById("myActiveMins")
let myDate = document.getElementById("myDate")
let background = document.getElementById("background")
let min = document.getElementById("min")
let sec = document.getElementById("sec")
let hour = document.getElementById("hour")
//let circle = document.getElementById("circle")
//let myHR = Document.getElementById("myHR")
//let myConditions = document.getElementById("myConditions")



// Returns an angle (0-360) for the current hour in the day, including minutes
function hoursToAngle(hours, minutes) {
  let hourAngle = (360 / 12) * hours;
  let minAngle = (360 / 12 / 60) * minutes;
  return hourAngle + minAngle;
}

// Returns an angle (0-360) for minutes
function minutesToAngle(minutes) {
  return (360 / 60) * minutes;
}

// Returns an angle (0-360) for seconds
function secondsToAngle(seconds) {
  return (360 / 60) * seconds;
}

// Rotate the hands every tick
function updateClock() {
  let today = new Date();
  let hours = today.getHours() % 12;
  let mins = today.getMinutes();
  let secs = today.getSeconds();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  
  myDate.text = month + "/" + day + "/" + year;

  hourHand.groupTransform.rotate.angle = hoursToAngle(hours, mins);
  minHand.groupTransform.rotate.angle = minutesToAngle(mins);
  secHand.groupTransform.rotate.angle = secondsToAngle(secs);
}



// Update the clock every tick event
clock.ontick = () => updateClock();

//Get the weather----------------------------
let provider = 1
// Enter your own api keys below
const PROVIDERS = [
  { name : 'yahoo', key : '' },
  { name : 'owm', key : '85d7a3c938569067920025f2136bb179' },
  { name : 'wunderground', key : '' },
  { name : 'darksky', key : '' },
  { name : 'weatherbit', key : 'ca400bd0614144e5910451e7036e37c3' }
]

// Create the weather object
let weather = new Weather()

let showWeather = function(data){
  if (data) {
    console.log(data.temperatureF)
    
    if(units.temperature == "F") {
      myTemp.text = data.temperatureF + "°F  " + data.description;
    } else {
      myTemp.text = data.temperatureC + "°C  " + data.description;
    }
  
  
  
  }  
}

// Display the weather data received from the companion
weather.onsuccess = showWeather
weather.onerror = (error) => {
  console.log("Weather error " + JSON.stringify(error))
  
  myTemp.text = "Weather Error, Retrying..."
}

let fetchWeather = function(){
  // Set the provider : yahoo / owm / wunderground / darksky / weatherbit
  weather.setProvider(PROVIDERS[provider].name)
  // set your api key
  weather.setApiKey(PROVIDERS[provider].key)
  
  
  weather.fetch()
}

showWeather( weather.getData() )

// Listen for the onopen event
messaging.peerSocket.onopen = function() {
  fetchWeather()
}

var hrm = new HeartRateSensor();

hrm.start();

function refresh_myHR() {
  //myHR.text = "HR: " + hrm.heartRate
  }

setInterval(refresh_myHR, 1000);

  
 function refresh_myScore() {
mySteps.text = today.adjusted.steps;
   myActiveMins.text = today.adjusted.activeMinutes;
  myHR.text = hrm.heartRate ? hrm.heartRate : "--";
   myFloors.text = today.adjusted.elevationGain;
};

  

setInterval(refresh_myScore, 100);


//Add Calories for Settings---------------------------------
function refresh_mySteps(){ 
let amountSteps = today.adjusted.steps
let stepsGoal = goals.steps

  var stepAngle = Math.floor(360*(amountSteps/stepsGoal));
  if ( stepAngle > 360 ) {
    stepAngle = 360;
    //stepRing.style.fill="#58e078";
  }
  stepRing.sweepAngle = stepAngle;
}
setInterval(refresh_mySteps, 200)


function refresh_myCalories(){
let amountCals = today.adjusted.calories
let caloriesGoal = goals.calories
  var calAngle = Math.floor(360*(amountCals/caloriesGoal));
  if ( calAngle > 360 ) {
    calAngle = 360;
    //calRing.style.fill="#58e078";
  }
  calRing.sweepAngle = calAngle;

}
setInterval(refresh_myCalories, 200)

function refresh_myActiveMinutes() {
  let amountMins = today.adjusted.activeMinutes
  let minsGoal = goals.activeMinutes
  var minsAngle = Math.floor(360*(amountMins/minsGoal));
  if ( minsAngle > 360 ) {
    minsAngle = 360;
    //calRing.style.fill="#58e078";
  }
  minsRing.sweepAngle = minsAngle;

}
setInterval(refresh_myActiveMinutes, 200)



 
 function showElement(element) {
    element.style.display = "inline";
}
function hideElement(element) {
    element.style.display = "none";
}



hiddenButton.onactivate = function (evt) {
 console.log("Clicked!")
  hideElement(minHand)
  hideElement(myLeft)
  hideElement(hourHand)
  hideElement(secHand)
  hideElement(myRight)
  showElement(stepRing)
  showElement(calRing)
  showElement(minsRing)
   hideElement(circle)
  hideElement(myTemp)
  showElement(myHR)
  showElement(mySteps)
  showElement(myActiveMins)
  showElement(myFloors)
  showElement(myDate)
  setTimeout(function() {
    console.log("Out of time!")
    showElement(minHand)
    showElement(myLeft)
    showElement(hourHand)
    showElement(secHand)
    showElement(myRight)
    hideElement(stepRing)
    hideElement(calRing)
    hideElement(minsRing)
    showElement(circle)
    showElement(myTemp)
    hideElement(mySteps)
    hideElement(myFloors)
    hideElement(myHR)
    hideElement(myActiveMins)
    hideElement(myDate)
  }, 5000)
  
};
showElement(minHand)
    showElement(myLeft)
    showElement(hourHand)
    showElement(secHand)
    showElement(myRight)
   hideElement(stepRing)
    hideElement(calRing)
    hideElement(minsRing)
    showElement(circle)
    showElement(myTemp)
    hideElement(mySteps)
    hideElement(myFloors)
    hideElement(myHR)
    hideElement(myActiveMins)
    hideElement(myDate)

/* on app exit collect settings 
me.onunload = () => {
  fs.writeFileSync("user_settings.json", userSettings, "json");
  }

let userSettings;


function refresh_myActivity() {

try {
  userSettings = fs.readFileSync("user_settings.json", "json")
  //console.log("try successful")
  }
catch (e) {
  userSettings = {upperLeft: "Steps", 
                  upperRight: "Activity Score", 
                  textColor: "white",
                  backColor: "black",
                 clockColor: "darkred"}
  console.log("catch")
  }

messaging.peerSocket.onmessage = evt => {
  switch (evt.data.key) { 
    case "upperLeft":
      userSettings.upperLeft = evt.data.newValue.replace(/["']/g, "");
      console.log(userSettings.upperLeft)
      var upperLeft = userSettings.upperLeft.values.name;
      console.log(upperLeft)
       if(upperLeft == "Steps"){
         myLeft.text = today.adjusted.steps
       } else if(upperLeft == "Calories") {
        myLeft.text = today.adjusted.calories
       } else if(upperLeft == "Heart Rate") {
        myLeft.text = hrm.heartRate + " BPM";
       } else if(upperLeft == "Floors") {
       myLeft.text = today.adjusted.elevationGain
       } else if (upperLeft == "Active Minutes") {
       myLeft.text = today.adjusted.activeMinutes
        } else if (upperLeft == "Resting Heart Rate"){
       myLeft.text = ((user.restingHeartRate || "Unknown"));
        } else if (upperLeft == "Activity Score") {
          myLeft.text = Math.round((today.adjusted.steps/1000) + (today.adjusted.calories/100) + (today.adjusted.elevationGain) + (today.adjusted.activeMinutes*2)  + " ")
        } else if(upperLeft == "Blank") {
          myLeft.text = "  "
        }
      break;
     case "upperRight":
        userSettings.upperRight = evt.data.newValue.replace(/["']/g, "");
        console.log(userSettings.upperRight)
      var upperRight = userSettings.upperRight.values[0].name;
      if(upperRight == "Steps"){
         myRight.text = today.adjusted.steps
       } else if(upperRight == "Calories") {
        myRight.text = today.adjusted.calories
       } else if(upperRight == "Heart Rate") {
        myRight.text = hrm.heartRate + " BPM";
       } else if(upperRight == "Floors") {
      myRight.text = today.adjusted.elevationGain
       } else if (upperRight == "Active Minutes") {
       myRight.text = today.adjusted.activeMinutes
        } else if (upperRight == "Resting Heart Rate"){
      myRight.text = ((user.restingHeartRate || "Unknown"));
        } else if (upperRight == "Activity Score") {
          myRight.text = Math.round((today.adjusted.steps/1000) + (today.adjusted.calories/100) + (today.adjusted.elevationGain) + (today.adjusted.activeMinutes*2)  + " ")
        } else if(upperRight == "Blank") {
         myRight.text = "  "
        }
      break;
    case "textColor": 
      userSettings.textColor = evt.data.newValue.replace(/["']/g, "");
     console.log(userSettings.textColor)
      //myTime.style.fill = userSettings.textColor;
      myDate.style.fill = userSettings.textColor;
      mySteps.style.fill = userSettings.textColor;
      //mySteps.style.fill = userSettings.textColor;
      myHR.style.fill = userSettings.textColor;
      myLeft.style.fill = userSettings.textColor;
      myActiveMins.style.fill = userSettings.textColor;
      myFloors.style.fill = userSettings.textColor;
      myTemp.style.fill = userSettings.textColor;
      myRight.style.fill = userSettings.textColor;
      break;
      case "backColor": 
      userSettings.backColor = evt.data.newValue.replace(/["']/g, "");
     console.log(userSettings.backColor)
      background.style.fill = userSettings.backColor
      break;
      case "clockColor": 
      userSettings.clockColor = evt.data.newValue.replace(/["']/g, "");
     var clock = userSettings.clockColor
      console.log(clock)
      hour.style.fill = clock;
      min.style.fill = clock;
      sec.style.fill = clock;  
      circle.style.fill = clock;
      break;
}

  // Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
  }

// Message socket closes
messaging.peerSocket.close = () => {
  console.log("App Socket Closed");
    }
  }
}
setInterval(refresh_myActivity, 100) */
let defaultSettings = {
  textColor: 'white',
  backColor: 'black',
  backColor: 'white'
};
let settings = defaultSettings;

//initialisation
inbox.onnewfile = processInbox;

//settings handling
function loadSettings() {
  try {
    settings = readFileSync("settings.cbor", "cbor");
    transformSettings();
    mergeWithDefaultSettings();
  } catch (e) {
    console.log('No settings found, fresh install, applying default settings...');
    
    //apply default settings
    settings = defaultSettings;
  }
  
  console.log('Applying settings: ' + JSON.stringify(settings));
  applySettings();
}

function transformSettings() {
  console.log("Transforming Settings!")
  //change all settings you want in another format as sent by the companion here

}

function mergeWithDefaultSettings() {
  for (let key in defaultSettings) {
    if (!settings.hasOwnProperty(key)) {
      settings[key] = defaultSettings[key];
    }
  }
}

function applySettings() {
      let textColor = settings.textColor
      //myTime.style.fill = userSettings.textColor;
      myDate.style.fill = textColor;
      mySteps.style.fill = textColor;
      //mySteps.style.fill = userSettings.textColor;
      myHR.style.fill = textColor;
      myLeft.style.fill = textColor;
      myActiveMins.style.fill = textColor;
      myFloors.style.fill = textColor;
      myTemp.style.fill = textColor;
      myRight.style.fill = textColor;
      background.style.fill = settings.backColor
      let clock = settings.clockColor
      hour.style.fill = clock;
      min.style.fill = clock;
      sec.style.fill = clock;  
      circle.style.fill = clock;
}

//load stored settings if any at startup
loadSettings();

function processInbox()
{
  let fileName;
  while (fileName = inbox.nextFile()) {
    console.log("File received: " + fileName);

    if (fileName === 'settings.cbor') {
        loadSettings();
    }
  }
};

