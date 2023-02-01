// secret 9e575b187543b7dc56afdf8ec70a64a015793b5fe6d5bc85715056d9f32ec152
// Client ID: MzE2ODYzNzZ8MTY3NTAwODYxOS42MTkxODU
// You can add client_id and optionally client_secret to the end of any valid url to authenticate your request.


let clientID = "MzE2ODYzNzZ8MTY3NTAwODYxOS42MTkxODU"
let endPoint = "https://api.seatgeek.com/2"
let queryString = "https://api.seatgeek.com/2/events?client_id=" + clientID + "&taxonomies.name=concert"
const searchValue = document.getElementById("user-input");
const submitBtn = document.getElementById("submit-button");
const cardContainer = document.getElementById("card-container");

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
            
        }).catch(error => {
            console.log(error)
        });
});

createCards = (data) => {
    for(i=0; i < data.length; i++) {
        let card = document.createElement("div"),
        concertName = document.createElement("div"),
        concertCity = document.createElement("div"),
        concertVenue = document.createElement("div");
        concertName.textContent = data[i].title;
        concertCity.textContent = data[i].venue.display_location;
        concertVenue.textContent = data[i].venue.name;
        card.appendChild(concertName);
        card.appendChild(concertCity);
        card.appendChild(concertVenue);

        cardContainer.appendChild(card);
    }

}
