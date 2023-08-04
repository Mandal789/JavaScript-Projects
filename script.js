d = new Date()
day = d.getDay();
daydate = d.getDate();
month = d.getMonth() + 1;
year = d.getFullYear();
// console.warn(daydate, month, year, day, d);


var weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]




Htime = d.getHours();
Mtime = d.getMinutes();
Stime = d.getSeconds();

Hrotation = 30 * Htime + ((30 / 60) * Mtime + (((30 / 60) / 60) * Stime));
Mrotation = 6 * Mtime + ((6 / 60) * Stime);
Srotation = 6 * Stime;

setInterval(() => {
    //console.log("hello");

    Srotation = Srotation + 6 / 100;
    Mrotation = Mrotation + (6 / 100 / 60);
    Hrotation = Hrotation + (6 / 100 / 60 / 12);
    hour.style.transform = `rotate(${Hrotation}deg)`;
    minute.style.transform = `rotate(${Mrotation}deg)`;
    second.style.transform = `rotate(${Srotation}deg)`;
    wday.innerHTML = `${weekday[day]}`;
    date.innerHTML = `${daydate} / ${month} / ${year}`;
}, 10);
window.addEventListener("focus", function() {
    window.location.reload();
});

//*************Wether App By Using API ******************//
setInterval(() => {
    let T = new Date();
    time.innerHTML = T.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })

}, 1000)

const ApiKey = "f4d45d31efa9ed17e0c981f259c3c7d1";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const wethericons = document.querySelector(".wthr-icon");
const url = "https://api.openweathermap.org/data/2.5/weather?"


//**************************************default (current location) weather*************************************/
function emptyinp() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }

    function showPosition(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        console.log(`Latitude: ${lat}, Longitude: ${lon}`);
        defaultweather(lat, lon);
    }

    async function defaultweather(lat, lon) {
        const response = await fetch(`${url}lat=${lat}&lon=${lon}&appid=${ApiKey}&units=metric`);
        let data = await response.json();


        console.log(data);
        //console.log(data.coord);

        let x = data.name.split(',');
        // console.log(x);
        if (x.length > 1) {
            x = x[1]
        } else {
            x = x[0];
        }
        //console.log(x);
        let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
        let place = regionNames.of(data.sys.country);
        //console.log(x.length);
        if (place.length < 6 && x.length < 8) {
            document.querySelector(".country").style["margin-right"] = "45px";
        } else if (place.length < 7 && x.length < 7) {
            document.querySelector(".country").style["margin-right"] = "85px";
        } else if (place.length < 7 && x.length > 12) {
            document.querySelector(".country").style["position"] = "relativa";
            document.querySelector(".country").style["top"] = "-8px";
            document.querySelector(".country").style["left"] = "116px";
            document.querySelector(".country").style["font-size"] = "16px";
        } else {
            document.querySelector(".country").style["margin-right"] = "0px";
        }

        document.querySelector(".city").innerHTML = x;
        document.querySelector(".country").innerHTML = `${place}`;

        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
        document.querySelector(".iconname").innerHTML = data.weather[0].main;
        wethericons.src = `images/${data.weather[0].main}.png`;

        document.querySelector(".wether").style.display = "block";
        document.querySelector(".now").style.display = "block";
        document.querySelector(".loc").innerHTML = `You are in ${x}, Now`
    }
}
emptyinp();


//defaultweather(25.594, 85.137);
//defaultweather(28.609, 77.217);


//**************************************Search weather************************************************ */


async function updatewether(city) {
    const response = await fetch(apiurl + city + `&appid=${ApiKey}`);

    if (response.status == 404) {

        document.querySelector("#error").style.display = "block";
        document.querySelector(".wether").style.display = "none";
        document.querySelector(".now").style.display = "none";

        var timeleft = 6;
        var downloadTimer = setInterval(function() {

            if (timeleft <= -1) {
                clearInterval(downloadTimer);
            } else {
                num.style.display = "block"
                num.innerHTML = `${timeleft}`;
            }
            timeleft -= 1;
        }, 1000);

        setTimeout(() => {
            document.querySelector("#error").style.display = "none";
            emptyinp();
            document.querySelector(".wether").style.display = "block";
            document.querySelector(".now").style.display = "block";
            document.querySelector("#num").innerHTML = "";
            document.querySelector("#num").style.display = "none";
            searchBox.value = "";

        }, 8000)
    } else {

        var data = await response.json();

        console.log(data);
        //console.log(data.coord);

        let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
        let place = regionNames.of(data.sys.country);
        x = data.name;


        if (place.length < 7 && x.length < 8) {
            document.querySelector(".country").style["margin-right"] = "45px";
            document.querySelector(".country").style["top"] = "-31px";
        } else if (place.length < 7 && x.length < 7) {
            document.querySelector(".country").style["margin-right"] = "85px";
            document.querySelector(".country").style["top"] = "-31px";
        } else if (place.length < 7 && x.length > 12) {
            document.querySelector(".country").style["position"] = "relativa";
            document.querySelector(".country").style["top"] = "-8px";
            document.querySelector(".country").style["left"] = "116px";
            document.querySelector(".country").style["font-size"] = "16px";
        } else {
            document.querySelector(".country").style["margin-right"] = "0px";
        }

        document.querySelector(".city").innerHTML = `${data.name}`;
        document.querySelector(".country").innerHTML = `${place}`;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
        document.querySelector(".iconname").innerHTML = data.weather[0].main;
        wethericons.src = `images/${data.weather[0].main}.png`;
        document.querySelector("#error").style.display = "none";
        document.querySelector(".now").style.display = "none";
        document.querySelector(".wether").style.display = "block";
    }



}


searchBtn.addEventListener("click", () => {
    updatewether(searchBox.value);
})

searchBox.addEventListener("keydown", (e) => {
    //var key = e.which;
    if (e.key === 'Enter') {
        e.preventDefault();
        updatewether(searchBox.value);
        //updatewether(searchBox.value).trigger('click');
        //return false;
    }
})


// setInterval(() => {
//     let T = new Date();
//     p = T.toLocaleString();
//     q = T.toLocaleString('en-US', { minute: '2-digit' });
//     r = T.toLocaleString('en-US', { second: '2-digit' });
//     s = T.toLocaleString('en-US', { hour12: true });
//     //hii.innerHTML = T.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
//     hii.innerHTML = `${p} ${q} ${r} ${s}`
//     console.log(p);
// }, 1000)