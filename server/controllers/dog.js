const Dog = require('../models/dog');

exports.getDogs = (req, res, next) => {
    Dog.findAll()
        .then( dogs => {
            console.log ("Get dogs: ", dogs)
            res.send(dogs);
        })
}