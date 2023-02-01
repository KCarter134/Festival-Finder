// secret 9e575b187543b7dc56afdf8ec70a64a015793b5fe6d5bc85715056d9f32ec152
// Client ID: MzE2ODYzNzZ8MTY3NTAwODYxOS42MTkxODU
// You can add client_id and optionally client_secret to the end of any valid url to authenticate your request.


let clientID = "MzE2ODYzNzZ8MTY3NTAwODYxOS42MTkxODU"
let endPoint = "https://api.seatgeek.com/2"
let queryString = "https://api.seatgeek.com/2/events?client_id=" + clientID + "&taxonomies.name=concert"
const searchValue = document.getElementById("user-input");
const submitBtn = document.getElementById("submit-button");

 
    fetch(queryString)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
        });


submitBtn.addEventListener("click", () => {
    console.log(searchValue.value);
})
