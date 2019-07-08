const Route = require('../models/route');
const io = require('../socket');
const url = require('url');

exports.getRoutes = (req, res, next) => {
    
    const url_parts = url.parse(req.url, true);
    const query = url_parts.query;
    Route.fetchAllByRequestType(req.params.user_id, query.request)
      .then( ([rows,fields]) => {
        res.send(rows);
      })
      .catch( err => err);
};

exports.createRoute = (req, res, next) => {
  const route = new Route (null, req.params.user_id, null, 'pairing', req.body['plan_walk_at'])
  route.save()
  .then((result) => {
    // io.getIO().emit('mySQL', {
    //   latitude,
    //   longitude
    // });
    res.send(result);
  })
  .catch(err => err);
};


exports.getAvailableParingRoutesForCurrentUser = (req, res, next) => {

  Route.getAvailableParingRoutesForCurrentUser(req.params.user_id)
    .then( ([rows,fields]) => {
      res.send(rows);
    })
    .catch( err => err);
};
exports.findRouteByIdAndUpdateWithStatus = (req, res, next) => {

  Route.findRouteByIdAndUpdateWithStatus(req.body['route_id'], req.params.user_id,req.body['status'])
    .then( ([rows,fields]) => {

      if (req.body['status'] === 'completed') {
        const emitData = {
          current_walk_paired_user_id : req.body['current_walk_paired_user_id'],
        }
        io.getIO().emit('walk-completed', emitData);
      }

      
      if (req.body['status'] === 'on-going') {
        const emitData = {
          current_walk_paired_user_id : req.body['current_walk_paired_user_id'],
        }
        io.getIO().emit('walk-start', emitData);
      }

      res.send(rows);
    })
    .catch( err => err);

}



exports.getRoutesByStatusAndUserId = (req, res, next) => {

  Route.getRoutesByStatusAndUserId(req.params.user_id, req.body['status'], req.body['userType'])
    .then( ([rows,fields]) => {
      res.send(rows);
    })
    .catch( err => { 
      return err
  });

}


