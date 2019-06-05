const Route = require('../models/route');
const url = require('url');

exports.getRoutes = (req, res, next) => {
    console.log("Hit getRoutes, with user_id", req.params.user_id);
    const url_parts = url.parse(req.url, true);
    const query = url_parts.query;

    console.log(query.request); 
    Route.fetchAllByRequestType(req.params.user_id, query.request)
      .then( ([rows,fields]) => {
        res.send(rows);
      })
      .catch( err => {
        console.log(err);
    });
};

exports.createRoute = (req, res, next) => {
  console.log("Hit create Routes, with user_id", req.params.user_id);
  console.log("req body:", req.body);
  const route = new Route (null, req.params.user_id, null, 'pairing', req.body['plan_walk_at'])
  route.save()
  .then((result) => {
    console.log("new route create at mySQL");
    // io.getIO().emit('mySQL', {
    //   latitude,
    //   longitude
    // });
    res.send(result);
  })
  .catch(err => console.log("createRoute controller error:" , err));
};


exports.getAvailableParingRoutesForCurrentUser = (req, res, next) => {
  console.log("Hit getAvailableParingRoutesForCurrentUser, with user_id", req.params.user_id);

  Route.getAvailableParingRoutesForCurrentUser(req.params.user_id)
    .then( ([rows,fields]) => {
      console.log(rows);
      res.send(rows);
    })
    .catch( err => {
      console.log(err);
  });
};
exports.findRouteByIdAndUpdateWithStatus = (req, res, next) => {
  console.log("Hit findRouteByIdAndUpdateWithStatus, with user_id", req.params.user_id);
  // { route_id: 3, status: 'paired' }

  Route.findRouteByIdAndUpdateWithStatus(req.body['route_id'], req.params.user_id,req.body['status'])
    .then( ([rows,fields]) => {
      console.log(rows);
      res.send(rows);
    })
    .catch( err => {
      console.log(err);
  });

}


