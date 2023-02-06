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

// fetch SeatGeek api data
apiData = () => {
    fetch(queryString)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data.events)
        });
}
// apiData();

// search button to take api data and display into data cards 
submitBtn.addEventListener("click", () => {
    removeChildrenByClassName('card-body');
     if (searchValue.value === "") { // prompts user to type relevant data
        console.log("Enter city, artist, or venue");
    } else {
        console.log(searchValue.value)}
    
    searchValue.value = "" //clears input field after click
   
    fetch(queryString)
        .then(response => {
            if (!response.ok) {
                return Error("ERROR")
            }
            return response.json()
        })
        .then(data => {
            let concertArray = [];
            concertArray = data.events
            console.log(concertArray)
            createCards(concertArray);

            // attempt at preventing duplicates in concertArray
            var result = concertArray.reduce((uniqueID, o) => {
                let arrID = data.id // 
                console.log(arrID)// undefined (in console)
                if(!uniqueID.some(obj => obj.label === o.label && obj.value === o.value)) {
                  uniqueID.push(o); 
                }
                return uniqueID; 
            },[]);
            console.log(result); // somehow console logs the first item in array
            
        }).catch(error => {
            console.log(error)
        });
});

createCards = (data) => {
    for(i=0; i < data.length; i++) {
        let card = document.createElement("div")
        card.className = "card-body"
        let concertName = document.createElement("div")
        concertName.className = "card-name"
        let concertCity = document.createElement("div")
        concertCity.className = "card-city"
        let concertVenue = document.createElement("div")
        concertVenue.className = "card-venue"

        concertName.textContent = data[i].title;
        concertCity.textContent = data[i].venue.display_location;
        concertVenue.textContent = data[i].venue.name;
        card.appendChild(concertName);
        card.appendChild(concertCity);
        card.appendChild(concertVenue);

        cardContainer.appendChild(card);
    };
};


