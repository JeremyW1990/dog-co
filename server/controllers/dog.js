const Dog = require('../models/dog');

exports.getDogs = (req, res, next) => {
    Dog.findAll()
        .then( dogs => {
            res.send(dogs);
        })
}