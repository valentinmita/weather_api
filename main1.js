

const key='55a8163ddf31b1acdd32af3a13c9e2a6';
let long;
let lat ;
let metric = 'metric';
const searchbox = document.querySelector('.search-box');
const form = document.querySelector('.form');
let citta = document.querySelector('.location .city');
let imagine = document.querySelector('.location .imagine');
let temp = document.querySelector('.current .temp');
let weather = document.querySelector('.current .weather');
let orario = document.querySelector('.current .orario');
let buttone =document.querySelector( '.colonne  .one ')
let city = 0 ;

  navigator.geolocation.getCurrentPosition(position =>{
    long = position.coords.longitude;
    lat = position.coords.latitude;
    console.log(long);
    console.log(lat);  
    cercacita1(long,lat);
    });
  
  async function cercacita1(long,lat){
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lon=${long}&lat=${lat}&units=${metric}&appid=${key}`)
      const data= await response.json();
       let city =data.name;
      addweathertopage(data); 
        }
      
    // primo giorno    
async function cercacita(city) {
  clear ();
  const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&appid=${key}`)
  const data= await response.json();
  if (response.status >= 400 && response.status < 499) {
  alert("città non trovata");
    }
  addweathertopage(data);
  }


form.addEventListener('submit', (e) =>{
  e.preventDefault();
  city =searchbox.value;
  if(city){
  cercacita(city);
}  
});


async function addweathertopage(data){
  citta.textContent =  await data.name +' '+ data.sys.country ;
  temp.innerHTML = Math.round(data.main.temp);
  weather.icondId = data.weather[0].icon;
  imagine.innerHTML = `<img src="icons/${weather.icondId}.png"/>`;
  weather.innerHTML = data.weather[0].main;
  orario.innerHTML=  new Date((data.dt)*1000).toLocaleDateString();
  lat = data.coord.lat;
  long=data.coord.lon;
  console.log(lat);
  console.log(long);
}

function clear (){
  searchbox.value ='';
}



//secondogiorno

async function cercacita2() {
  clear ();
  const response = await fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=${metric}&appid=${key}`)
  const data= await response.json();
  if (response.status >= 400 && response.status < 499) {
  alert("città non trovata");
 }
 addweathertopage2(data);
  }


async function addweathertopage2(data){
  temp.innerHTML = Math.round(data.daily[1].temp.max);
  weather.icondId = data.daily[1].weather[0].icon;
  imagine.innerHTML = `<img src="icons/${weather.icondId}.png"/>`;
  weather.innerHTML = data.daily[1].weather[0].main;
  orario.innerHTML=  new Date((data.daily[1].dt)*1000).toLocaleDateString();
}












   
    
    
   
  