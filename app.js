// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({
    extended:true
}))

app.get("/", function (req, res) {
    
    res.sendFile(__dirname+"/index.html");
});
app.post("/", function(req, res){
    const query = req.body.cityName;
    units="metric";
    appid="3f16d78451a29795e7f449764b843919";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&units="+units+"&appid="+appid;
    
    https.get(url, function (response) {
        // var weatherInfo = https.get(url);
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherMap = JSON.parse(data);
            const temp = weatherMap.main.temp;
            const description = weatherMap.weather[0].description;


            res.write("<h1>Temperature in city:  "+ temp +"C</h1>");
            res.write("<h1>Todays weather conditon: " +description+"</h1>")
            const icon = weatherMap.weather[0].icon
            const  iconURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<img src=" +iconURL+ ">");
            res.send();
            // const weatherMapstring = JSON.stringify(weatherMap);
            // console.log(weatherMapstring);
        })
    })
})




app.listen(3000, function () {
    console.log("local server is running at the port 3000");
})
