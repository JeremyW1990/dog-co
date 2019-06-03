const Route = require('../models/route');

exports.getRoutes = (req, res, next) => {
    console.log("Hit getRoutes", req.params.user_id);
    Route.fetchAllByUserId()
      .then( ([rows,fields]) => {
        console.log(rows);
        res.send(rows);
      })
      .catch( err => {
        console.log(err);
      });
};


