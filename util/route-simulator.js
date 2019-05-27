let create_at = new Date();
let longitude = 336350937;
let latitude = -1177401722;

let query = "INSERT INTO `geo_locations`(`latitude`, `longitude`, `route_id`, `create_at`) VALUES \n";
query += `( ${longitude}, ${latitude} , 1, "${create_at.getFullYear()}-${create_at.getMonth() + 1}-${create_at.getDate()} ${create_at.getHours()}:${create_at.getMinutes()}:${create_at.getSeconds()}"), \n`
let route_id = 1;

for (let i = 1; i < 6; i++) {
    create_at.setSeconds(create_at.getSeconds() + i);
    let timeString =  `"${create_at.getFullYear()}-${create_at.getMonth() + 1}-${create_at.getDate()} ${create_at.getHours()}:${create_at.getMinutes()}:${create_at.getSeconds()}"`;
    query += ` ( ${longitude + Math.floor((Math.random() -0.5) * 100000)}, ${latitude +  Math.floor((Math.random() -0.5) * 100000)} , ${route_id}, ${timeString}), \n`
}
create_at.setSeconds(create_at.getSeconds() + 10);
query += `( ${longitude}, ${latitude} , 1, "${create_at.getFullYear()}-${create_at.getMonth() + 1}-${create_at.getDate()} ${create_at.getHours()}:${create_at.getMinutes()}:${create_at.getSeconds()}")`



const fs = require('fs');
fs.writeFile('files/dummy-geolocation-dummy-data.txt', query, (err) => {
    if (err) throw err;
    console.log('files/dummy-geolocation-dummy-data.txt created.');
});