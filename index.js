

let today_name = document.getElementById("today_name")
let today_num = document.getElementById("today_num")
let today_month = document.getElementById("today_month")
let city_Name = document.getElementById("city_Name")
let today_Tempo = document.getElementById("today_Tempo")
let today_Img = document.getElementById("today_Img")
let today_Text = document.getElementById("today_Text")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let wind_dir = document.getElementById("wind_dir")

let nextday_name = document.querySelectorAll(".nextday_name")
let forecast_Img = document.querySelectorAll(".forecast_Img")
let forecast_maxtemp = document.querySelectorAll('.forecast_maxtemp')
let forecast_mintemp = document.querySelectorAll('.forecast_mintemp')
let forecast_text = document.querySelectorAll(".forecast_text")

let input_search = document.getElementById("input_search")






// get data 
async function get_Data(city) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5b18663e090f4571a1d200056241012&q=${city}&days=3`)
    let response_data = await response.json()
    return response_data;
}


// display today
function display_TodayData(data) {
    let today_date = new Date()
    today_name.innerHTML = today_date.toLocaleDateString("en-Us", { weekday: "long" })
    today_num.innerHTML = today_date.getDate()
    today_month.innerHTML = today_date.toLocaleDateString("en-Us", { month: "long" })
    city_Name.innerHTML = data.location.name
    today_Tempo.innerHTML = data.current.temp_c
    today_Img.setAttribute("src", "https:" + data.current.condition.icon)
    today_Text.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity
    wind.innerHTML = data.current.wind_mph
    wind_dir.innerHTML = data.current.wind_dir

}

// display forecast
function display_Forecast(data) {
    let forecast_Data = data.forecast.forecastday


    for (let i = 0; i < 2; i++) {
        let next_date = new Date(forecast_Data[i + 1].date)
        nextday_name[i].innerHTML = next_date.toLocaleDateString("en-Us", { weekday: "long" })
        forecast_Img[i].setAttribute("src", "https:" + forecast_Data[i + 1].day.condition.icon)
        forecast_maxtemp[i].innerHTML = forecast_Data[i + 1].day.maxtemp_c
        forecast_mintemp[i].innerHTML = forecast_Data[i + 1].day.mintemp_c
        forecast_text[i].innerHTML = forecast_Data[i + 1].day.condition.text
    }

}






// start app
async function startAPP(city = "cairo") {

    let data = await get_Data(city)
    if (!data.error) {
        display_TodayData(data)
        display_Forecast(data)
    }

}

startAPP()

// input
input_search.addEventListener("keyup", function () {
    startAPP(input_search.value)
})
