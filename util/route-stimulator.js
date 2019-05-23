let query = "INSERT INTO `GeoLocation`(`longitude`, `latitude`, `route_id`, `create_at`) VALUES "
let longitude = 336350937;
let latitude = -1177401722;
let route_id = 1;

for (let i = 1; i < 100; i++) {
    let create_at = new Date();
    create_at.setSeconds(create_at.getSeconds() + i);
    let timeString =  `${create_at.getFullYear()}-${create_at.getMonth()}-${create_at.getDay()} ${create_at.getHours()}:${create_at.getMinutes()}:${create_at.getSeconds()}`;
    query += ` ( ${longitude + i * 10} , ${latitude + i * 10} , ${route_id}, "${timeString}"), \n`
}



const fs = require('fs');
fs.writeFile('files/dummy-geolocation-sql-dump.txt', query, (err) => {
    if (err) throw err;
    console.log('dummy-geolocation-sql-query.txt created.');
  });