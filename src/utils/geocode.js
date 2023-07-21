// // first parameter is options-object to request(in our case its URL)
// // second parameter is a function which persorms somethings 
// // when request is complete 


// // we can parse the requested item directly to JSON by modifying
// // options object specifying optional props 


// U can add optional options set as query strings .
// to do so add '?' then key = value 
// to add multiple key valur pair use '&'
// ex. => http://api.weatherapi.com/v1/current.json?key=efa0e2f6568948dfbf8163106210709&q=Lucknow&aqi=no
// [key]=value & [key]=value         
// {endpoints  other one is for entrprise}


const request = require('request')

const geocode = (address, callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiaW5nZW51aXR5MDciLCJhIjoiY2t0bzIzZjk4MDJldjJ2bDhtMjJ5cWlrdiJ9.ljNvD1GPoaIa2pvXCkh0QQ&limit=1"

    request({ url, json: true }, (error, {body}={}) => {

        if (error) {
            callback("Unable to Process the request ", undefined);
        }
        else if (body.features.length == 0) {
            callback("Unable to find location try another search", undefined)
        }
        else {
            callback(undefined,{
                long : body.features[0].geometry.coordinates[0],
                lat : body.features[0].geometry.coordinates[1],
                location:body.features[0].place_name
            })
        }

    })
}

module.exports =geocode; 



