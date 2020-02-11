window.addEventListener('load',() => {
    let longitude;
    let latitude;

    const LOCATION_TEMPERATURE = document.querySelector('.location__temperature > h2'); 
    const LOCATION_SUMMARY = document.querySelector('.location__summary');
    const LOCATION_TIMEZONE = document.querySelector('.location__timezone > #title')

    navigator.geolocation.getCurrentPosition(location => {
        longitude = 13.41053;
        latitude = 52.52437;
        
        const proxy = 'http://cors-anywhere.herokuapp.com/';
        const API = `${proxy}https://api.darksky.net/forecast/68aa00ac729a5b69117350eb7f5e7f11/${latitude},${longitude}`;

        fetch(API)
        .then(response => response.json())
        .then(data => {
            const { temperature , icon , summary } = data.currently;

            LOCATION_TEMPERATURE.innerText = temperature;
            LOCATION_SUMMARY.innerText = summary;
            LOCATION_TIMEZONE.innerText = data.timezone;

            setIcon(icon);
            changeSection(temperature);
        })
    }, 
        err => {
            console.log('Can\'t find your location ! Your computer seem doesn\'t support that feature !');
        }
    )

    function setIcon(location_icon){
        var skycons = new Skycons({color: 'pink'});
        var icon = document.querySelector('.location__timezone > #icon');

        location_icon = location_icon.replace(/-/g,'_').toUpperCase();

        skycons.add(icon,location_icon);
        skycons.play();
    }

    function changeSection(location_temp){
        var LOCATION_SECTION = document.querySelector('.location__temperature > span');

        LOCATION_TEMPERATURE.addEventListener('click',function(){
            if(LOCATION_SECTION.innerText == 'F'){
                let temp = (location_temp - 32) * 5 / 9;
                LOCATION_TEMPERATURE.innerText = Math.floor(temp);
                LOCATION_SECTION.innerText = 'C';
            } else {
                LOCATION_SECTION.innerText = 'F';
                LOCATION_TEMPERATURE.innerText = location_temp;
            }
        })
    }

})