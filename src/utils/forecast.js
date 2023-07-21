const request = require('request')

const forecast = (lat, long, callback) => {

    const url = 'http://api.weatherapi.com/v1/current.json?key=efa0e2f6568948dfbf8163106210709&q='+ lat + ',' + long + '&aqi=yes';
    request({ url, json: true }, (error, {body}={}) => {

        if (error) {
            callback("Some Error ocuurred", undefined);
        }
        else if (body.error) {
            callback("Try different search", undefined);
        }
        else {

               //console.log(body.current.air_quality); 

            callback(undefined, {location:body.location.name,
                                 region:body.location.region,
                                 tempInCel:body.current.temp_c,
                                 tempInFar:body.current.temp_f,
                                 airQuality:body.current.air_quality,
                                 conditionText:body.current.condition.text,
                                icon:body.current.condition.icon});
        }
    }
    )
}
module.exports = forecast