const Route = require('../models/route');
const url = require('url');

exports.getRoutes = (req, res, next) => {
    console.log("Hit getRoutes, with user_id", req.params.user_id);
    const url_parts = url.parse(req.url, true);
    const query = url_parts.query;

    console.log(query.request); 
    Route.fetchAllByRequestType(req.params.user_id, query.request)
      .then( ([rows,fields]) => {
        console.log(rows);
        res.send(rows);
      })
      .catch( err => {
        console.log(err);
      });

};


