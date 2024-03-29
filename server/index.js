const path = require('path');
const express = require('express');

const db = require('../database/mysql.config');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const routeRoutes = require('./routes/route');
const geoLocationRoutes = require('./routes/geo-location');

app.use('/api', routeRoutes);
app.use('/api', geoLocationRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

const server = app.listen(3001, () => {
});

const io = require('./socket').init(server);
io.on('connection', socket => {

  socket.on('new-message', (data)=>{
    io.sockets.emit('new-message',data);
  })
});
        
