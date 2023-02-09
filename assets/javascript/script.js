// secret 9e575b187543b7dc56afdf8ec70a64a015793b5fe6d5bc85715056d9f32ec152
// Client ID: MzE2ODYzNzZ8MTY3NTAwODYxOS42MTkxODU
// You can add client_id and optionally client_secret to the end of any valid url to authenticate your request.

let clientID = "MzE2ODYzNzZ8MTY3NTAwODYxOS42MTkxODU"
let endPoint = "https://api.seatgeek.com/2"
let queryString = "https://api.seatgeek.com/2/events?client_id=" + clientID + "&taxonomies.name=concert"
const searchValue = document.getElementById("user-input");
const submitBtn = document.getElementById("submit-button");
const cardContainer = document.getElementById("card-container");

//function to remove elements by className
function removeChildrenByClassName(className){
    const toDelete = document.getElementsByClassName(className);
    while(toDelete.length > 0){
        toDelete[0].parentNode.removeChild(toDelete[0])
    }
}
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });


// apiData();
function searchByCityCoords(city){
    let APIKey = '22c381336de0f996a4083c7ecafd3174';
    let queryCity = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + APIKey;
     //Query city for coordinates from OpenWeatherMap
    fetch(queryCity)
    .then(result => { 
        console.log(result.status)
        return result.json();
    })
    .then(data => {
            let something = 'https://api.seatgeek.com/2/events?' + 'lon=' + data[0].lon+ '&' + 'lat=' + data[0].lat +  '&taxonomies.name=concert&client_id=MzEzNjU0MzZ8MTY3Mjk2NjkyNi4xMTAzMDM'
            fetch(something)
            .then(result => {
                console.log(result.status);
                return result.json();
            })
            .then(data => {
                console.log(data)
                let concertArray = [];
                concertArray = data.events
                console.log(concertArray)
                createCards(concertArray);
            })
            .catch(error => console.log('search failed')) 
    })
    .catch(error => {
        console.log('search failed')
    })
}


// search by venue
function searchByVenue(venue){
    let queryVenue = 'https://api.seatgeek.com/2/venues/' + venue;
    fetch(queryVenue)
    .then(result => { 
        console.log(result.status)
        return result.json();
    })
    .then(data => {
        try{
            fetch()
            .then(result => {
                console.log(result);
                return result.json();
            })
            .then(data => {
                console.log(data)
                let concertArray = [];
                concertArray = data.venue
                console.log(concertArray)
                createCards(concertArray);
            });
        }catch{
            //TODO: Create Modals to inform user of any errors when attempting API call************************************************************************************************************************************
            ("failed");
        }  
    });
}


// search by venue
function searchByVenue(venue){
    let queryVenue = 'https://api.seatgeek.com/2/venues/' + venue;
    fetch(queryVenue)
    .then(result => { 
        console.log(result.status)
        return result.json();
    })
    .then(data => {
        try{
            fetch()
            .then(result => {
                console.log(result);
                return result.json();
            })
            .then(data => {
                console.log(data)
                let concertArray = [];
                concertArray = data.venue
                console.log(concertArray)
                createCards(concertArray);
            });
        }catch{
            //TODO: Create Modals to inform user of any errors when attempting API call************************************************************************************************************************************
            ("failed");
        }  
    });
}

//format time 
function formatTime(currTime){
    let am_pm = '';
    let deconstructedTime = currTime.split(':');
    let hours = deconstructedTime[0];
    let minutes = deconstructedTime[1];

    if(hours > 12){
        am_pm = 'PM';
        hours -= 12;
    }else{
        am_pm = 'AM';
    }
    let reConstructedTime = hours + ":" + minutes + am_pm;
    return reConstructedTime;
}

function formatDate(currDate){
    //current format is yyyy/mm/dd
    let destructedDate = currDate.split('-');
    let yyyy = destructedDate[0];
    let mm = destructedDate[1];
    let dd = destructedDate[2];
    let reconStructedDate = mm + '/' + dd + '/' + yyyy;

    return reconStructedDate;
}

// search button to take api data and display into data cards 
submitBtn.addEventListener("click", () => {
    removeChildrenByClassName('card-body');
     if (searchValue.value === "") { // prompts user to type relevant data
        console.log("Enter city, artist, or venue");
    } else {
        console.log(searchValue.value)
    }
    try{
        searchByCityCoords(searchValue.value)
    }
    catch{
        console.log("failed")
    }
    
    searchValue.value = "" //clears input field after click
});

createCards = (data) => {
    let filterMap = new Map();
    for(i=0; i < data.length; i++) {
        let card = document.createElement("div")
        card.className = "card-body"
        let concertName = document.createElement("div")
        concertName.className = "card-name"
        let concertCity = document.createElement("div")
        concertCity.className = "card-city"
        let concertVenue = document.createElement("div")
        concertVenue.className = "card-venue"
        let concertDate = document.createElement("div")
        concertDate.className = "card-date"
        let concertTime = document.createElement("div")
        concertTime.className = "card-time"
        let concertImg = document.createElement("img")
        concertImg.setAttribute('src', data[i].performers[0].image)
        concertImg.classList.add("concert-img")
        let dateTime = data[i].datetime_local.split("T");
        
        concertName.textContent = data[i].title;

        if(filterMap.has(concertName.textContent)){
            continue;
        }else{
            filterMap.set(concertName.textContent, i);
        }



        concertCity.textContent = data[i].venue.display_location;
        concertVenue.textContent = data[i].venue.name;
        concertDate.textContent = dateTime[0];
        concertTime.textContent = formatTime(dateTime[1]);
        card.appendChild(concertImg);
        card.appendChild(concertName);
        card.appendChild(concertCity);
        card.appendChild(concertVenue);
        card.appendChild(concertDate);
        card.appendChild(concertTime);
       

        card.style.cursor = 'pointer'
        card.classList.add('modal-trigger');
        card.setAttribute('data-target', 'modal1');

        card.addEventListener('click', () => {
            removeChildrenByClassName('card-content')
            let eventName = document.createElement('div'),
            eventCity = document.createElement('div'),
            eventVenue = document.createElement('div');
            eventVenue.className = "modal-venue";
            eventPic = document.createElement("img")
            eventPic.className= "modal-img"

            eventPic.textContent = eventPic.setAttribute('src', data[i].performers[0].image) 
            
            // ↑ TODO === get correct picture to appear in modal ↑
            eventName.textContent = concertName.textContent;
            eventCity.textContent = "City: " + concertCity.textContent;
            eventVenue.textContent = "Venue: " + concertVenue.textContent;
            
            eventPic.classList.add('card-content');
            eventName.classList.add('card-content');
            eventCity.classList.add('card-content');
            eventVenue.classList.add('card-content');
            
            let parent = document.getElementById('event-modal');
            parent.appendChild(eventPic);
            parent.appendChild(eventName);
            parent.appendChild(eventCity);
            parent.appendChild(eventVenue);
        });
        cardContainer.appendChild(card);
    };
};