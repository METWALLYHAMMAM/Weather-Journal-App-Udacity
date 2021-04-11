/* Global Variables */
const form = document.querySelector('.form01');
const icons = document.querySelectorAll('.iconform');

// Base URL and API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '7f959d9eeb42c235bb72c385059dfe87';


//Get the date month date and year 
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element when click on button
document.getElementById('generatebutt').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
  e.preventDefault();
  // get user input values like zipcode and feelings
  const newZip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;
// get api url that matching with zipcode
  getWeather(baseURL, newZip, apiKey)
    .then(function (userData) {
      // add data to POST request
      postData('/add', { date: newDate, temp: userData.main.temp, content })
    }).then(function (newData) {
      // call updateUI to update browser content
      updateUI()
    })
  // reset form
  form.reset();
}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, newZip, apiKey) => {
  // res equals to the result of fetch function
  const res = await fetch(baseURL + newZip + apiKey);
  try {
    // userData equals to the result of fetch function
    const userData = await res.json();
    return userData;
  } catch (error) {
    console.log("error", error);
  }
}

/* Function to POST data to api*/
const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    })
  })

  try {
    const newData = await req.json();
    return newData;
  }
  catch (error) {
    console.log(error);
  }
};


const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json()
    // show icons on the page
    icons.forEach(icon => icon.style.opacity = '1');
    // update new entry values
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.content;
  }
  catch (error) {
    console.log("error", error);
  }
};
