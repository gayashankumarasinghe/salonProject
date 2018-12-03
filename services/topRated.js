const db = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports.topRatedStylists = function (req, res) {
    db.Stylist.findAll({
        where: {stylistType: 'Stylist'},
        limit: 10,
        attributes: ['id','firstName', 'lastName', 'rating'],
        order: [['rating','DESC']],
        include: [db.Location, db.Skil, db.Image]
    }).then(sty=>{
        //console.log(sty[1].Images[0].id);
        res.render('index',{
           stylistsDetails: sty
        });
    });
};

/*
module.exports.topRatedEducators = function (req, res) {
    db.Stylist.findAll({
        where: {stylistType: 'Educator'},
        limit: 10,
        attributes: ['id','firstName', 'lastName', 'rating'],
        order: [['rating','DESC']],
        include: [db.Location, db.Skil]
    }).then(sty=>{
        res.render('index',{
            stylistsDetails: sty
        });
    });
};

*/