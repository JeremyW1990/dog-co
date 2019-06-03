const Route = require('../models/route');

exports.getRoutes = (req, res, next) => {
    console.log("Hit getRoutes, with user_id", req.params.user_id);
    Route.fetchAllByUserId(req.params.user_id)
      .then( ([rows,fields]) => {
        console.log(rows);
        res.send(rows);
      })
      .catch( err => {
        console.log(err);
      });
};


