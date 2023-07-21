const weatherQuery = document.querySelector('form')
const search = document.querySelector('input')
let message_1 = document.querySelector('#message_1')
let message_2 = document.querySelector('#message_2')
let icon = document.querySelector('#icon')




weatherQuery.addEventListener('submit', (e) => {
    e.preventDefault();
    message_1.textContent = 'Loading...'
    message_2.textContent = ''
    icon.src = '';
    //console.log(icon.src)
    const location = search.value
    //console.log(location);
    if (location) {
        fetch('/weather?address=' + location).then((res) => {
            res.json().then((data) => {
                if (data.error)
                    message_1.textContent = (data.error)
                else {
                    if (data.icon) {

                        // console.log(data.airQuality)

                        // let stat = [
                        //     { x: "CO", value: data.airQuality.co },
                        //     { x: "NO2", value: data.airQuality.no2 },
                        //     { x: "O3", value: data.airQuality.o3 },
                        //     { x: "SO2", value: data.airQuality.so2 },
                        //     { x: "pm2_5", value: data.airQuality.pm2_5 },
                        //     { x: "pm10", value: data.airQuality.pm10 }
                        // ];
                        // const chart = anychart.pie();

                        // chart.title("Air Quality");

                        // // add the data
                        // chart.data(stat);

                        // // display the chart in the container
                        // chart.container('airq');
                        // chart.draw();

                        message_1.textContent = "Today in " + (data.location) + " in " + location + " weather conditions are " + (data.conditionText);
                        message_2.textContent = "Temprature is " + (data.tempInCel) + " degree celcius";
                        icon.src = data.icon;
                        
                    }
                }
            })
        })
    }
    else
        message_1.textContent = ('Enter some location in textbar')
})