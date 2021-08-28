//jshint esversion:6

const express = require('express');
const port = 3000;
const https = require('https');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {

res.sendFile(__dirname + "/index.html");
});


app.post('/', (req, res) => {
console.log(req.body.cityname);

const query = req.body.cityname;
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=ab587a37ecddfb70975ed2befaaedf8d&units=metric";

https.get(url , function(response)
{
  console.log(response);

response.on("data", function(data){
const weatherDate = JSON.parse(data);
const temp = weatherDate.main.temp;
const weatherDescription = weatherDate.weather[0].description;
const icon = weatherDate.weather[0].icon;
const imageURL =  "http://openweathermap.org/img/wn/" + icon + "@2x.png";
res.write("<h1>The temperature in " + query +" is "+ temp+" degree celsius</h1>");
res.write("<img src="+imageURL+">");
res.send();
});

});


});





app.listen(port, () => {
  console.log("server is running");
});
