const customerController = require('../controllers/customerController');
const Helper = require('../helpers/helper');
const jwt = require('jsonwebtoken');

const signIn = (req, res, next) => {
  if (typeof req.body.username !== "undefined") {
    customerController.findByUsername(req.body.username)
      .then(customer => {
        if (customer) {
          
          // Login dengan Account biasa
          Helper.comparePassword(req.body.password, customer.password)
            .then(verifiedAccount => {
              if (verifiedAccount) {

                Helper.signWebToken({
                  _id: customer._id,
                  username: customer.username,
                  password: customer.password,
                  
                }).then(token => {
                    req.header.token = token;
                    req.header.email = customer.email;
                    req.header.full_name = customer.name;
                    req.header._id = customer._id;

                    next();

                  }).catch(err => res.status(401).send({ message: "Unauthorized User", error: err.message }));
              } else {
                res.status(401).send({ message: "Unauthorized User", error: err.message })
              }

            }).catch(err => res.status(401).send({ message: "Unauthorized User", error: err.message }));
        }

      }).catch(err => res.send(err.message));
  } else {
    res.status(401).send({ message: "Unauthorized User", error: err.message })
  }
}

const isSignIn = (req, res, next) => {
  jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, decoded) => {
    if (typeof decoded !== 'undefined') {
      req.verifiedUser = decoded
      next();

    } else {
      res.status(401).send({ message: 'Unauthorized Login Access' });
    }
  });
}

module.exports = {
  signIn,
  isSignIn
}