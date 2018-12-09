const User = require("./../models/User");

module.exports = {
  addUser: (req, res, next) => {
    console.log("addUser on server");
    new User(req.body).save((err, newUser) => {
      if (err) res.send(err);
      else if (!newUser) res.send(400);
      else res.send(newUser);
      next();
    });
  },

  getUser: (req, res, next) => {
    console.log("getUser on server");
    User.findById(req.params.id).then(
      /*populate('following').exec*/ (err, user) => {
        if (err) res.send(err);
        else if (!user) res.send(404);
        else res.send(user);
        next();
      }
    );
  },

  addItemToBasket: (req, res, next) => {
    console.log("addItemToBasket on server");
    User.findById(req.body.user_id)
      .then((err, user) => {
        return user.cart.push(Item.findById(req.body.item_id)).then(() => {
          return res.json({ msg: "added" });
        });
      })
      .catch(next);
  },

  buyItems: (req, res, next) => {
    User.findById(req.body.user_id)
      .then(user => {
        user.basket = [];
        return res.json({ msg: "basket empty" });
      })
      .catch(next);
  }
};
