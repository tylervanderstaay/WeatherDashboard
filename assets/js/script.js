var today = dayjs()
var time = dayjs().format("hh:mm:ss")
var citTub

function getLocal(name) {
    try {
        var tub = JSON.parse(localStorage.getItem("cities"))
        if(!tub.includes(name)){
            tub.push(name)
            localStorage.setItem("cities", JSON.stringify(tub))
        }        
    }catch{
        tub=[]
        tub.push(name)
        localStorage.setItem("cities", JSON.stringify(tub))
    }
}

function handleData(data) {
    console.log(data)
    var { name } = data.city
    getLocal(name)
    var { list } = data
    console.log(list)
    const elToday = $(`<div class="main-card" id="today">
    <h1 id="citydate">${name}(${dayjs().format("MM/DD/YYYY")})</h1>
    <p id="temp">Temp: ${list[0].deg} F</p>
    <p id="wind">Wind: ${list[0].speed} MPH</p>
    <p id="humd">Humidity: ${list[0].humidity}%</p>
    </div>
    <h2>5-Day Forecast:</h2>
    <div class="days">
    </div>`)

    $('#right').empty()
    elToday.appendTo('#right')

    $('.days').empty()
    for (let i = 1; i < 6; i++) {
        const newel = $(`<div class="day-card" id="${i.toString()}">
        <h3>${dayjs().add(i, 'day').format("MM/DD/YYYY")}</h3>
        <icon></icon>
        <p>Temp:${list[i].deg} F</p>
        <p>Wind: ${list[i].speed} MPH</p>
        <p>Humidity: ${list[i].humidity}%</p>
    </div>`)

        newel.appendTo('.days')
    }
}



function setLoc(event) {
    event.preventDefault()
    const srch = $('.me-2')[0].value
    console.log(srch)

    const options = { method: 'GET', body: null };

    fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?appid=3be2b2b6acc21e3760901d15acf91f72&q=${srch}&cnt=6&units=imperial`, options)
        .then(response => response.json())
        .then(response => handleData(response))
        .catch(err => console.error(err));

}

$('#submit').click(setLoc)