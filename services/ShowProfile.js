const db = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports.profile = function (req, res) {
    var id = req.query.id;

    db.Stylist.findOne({
        where: {id: id},
        include: [db.Image, db.Location, db.Price, db.Skil]
    }).then(sty => {
        //console.log(sty.firstName);
        res.render('profile',{
            stylistsDetails: sty
        });
    });
};