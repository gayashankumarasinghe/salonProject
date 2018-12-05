const db = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports.advSearch = function (req, res) {

    var type;
    if(req.body.type==='a stylist'){
        type = 'Stylist';
    }else if(req.body.type==='an educator'){
        type = 'Educator';
    }else{
        type = 'both';
    }

    var city = req.body.city1;
    var date = req.body.date1;
    var gender = req.body.gen;
    var maxPriceDayFrom = req.body.frompriceday;
    var maxPriceDayTo = req.body.topriceday;
    var maxPriceEveningFrom = req.body.frompriceevening;
    var maxPriceEveningTo = req.body.topriceevening;
    var maxRating = req.body.s_rate;
    var stySkills = req.body.skill;

    if (date==="" && gender==="Any") {
        if (type==='both') {
            db.Stylist.findAll({
                where: {rating: {[Op.gt]: maxRating}},
                attributes: ['id','firstName', 'lastName', 'rating'],
                order: [['rating','DESC']],
                include: [{
                    model: db.Location,
                    where: {city: city}
                }, db.Skil, db.Image, {
                    model: db.Price,
                    where: {dayPrice : {[Op.between]: [maxPriceDayFrom, maxPriceDayTo]}, eveningPrice: {[Op.between]: [maxPriceEveningFrom, maxPriceEveningTo]}}
                }]
            }).then(sty=>{
                //console.log(sty[0]);
                res.render('searchResults',{
                    stylistsDetails: sty,
                    len: sty.length
                });
            });
        }else{
            db.Stylist.findAll({
                where: {stylistType: type, rating: {[Op.gt]: maxRating}},
                attributes: ['id','firstName', 'lastName', 'rating'],
                order: [['rating','DESC']],
                include: [{
                    model: db.Location,
                    where: {city: city}
                }, db.Skil, db.Image, {
                    model: db.Price,
                    where: {dayPrice : {[Op.between]: [maxPriceDayFrom, maxPriceDayTo]}, eveningPrice: {[Op.between]: [maxPriceEveningFrom, maxPriceEveningTo]}}
                }]
            }).then(sty=>{
                //console.log(sty[0]);
                res.render('searchResults',{
                    stylistsDetails: sty,
                    len: sty.length
                });
            });
        }

    }else {
        if (date==="") { // Gender and Date not specified
            if (type === 'both') {
                db.Stylist.findAll({
                    where: {gender: gender, rating: {[Op.gt]: maxRating}},
                    attributes: ['id', 'firstName', 'lastName', 'rating'],
                    order: [['rating', 'DESC']],
                    include: [{
                        model: db.Location,
                        where: {city: city}
                    }, db.Skil, db.Image, {
                        model: db.Price,
                        where: {dayPrice: {[Op.between]: [maxPriceDayFrom, maxPriceDayTo]}, eveningPrice: {[Op.between]: [maxPriceEveningFrom, maxPriceEveningTo]}}
                    }]
                }).then(sty => {
                    //console.log(sty[0]);
                    res.render('searchResults', {
                        stylistsDetails: sty,
                        len: sty.length
                    });
                });
            } else {
                db.Stylist.findAll({
                    where: {stylistType: type, gender: gender, rating: {[Op.gt]: maxRating}},
                    attributes: ['id', 'firstName', 'lastName', 'rating'],
                    order: [['rating', 'DESC']],
                    include: [{
                        model: db.Location,
                        where: {city: city}
                    }, db.Skil, db.Image, {
                        model: db.Price,
                        where: {dayPrice: {[Op.between]: [maxPriceDayFrom, maxPriceDayTo]}, eveningPrice: {[Op.between]: [maxPriceEveningFrom, maxPriceEveningTo]}}
                    }]
                }).then(sty => {
                    //console.log(sty[0]);
                    res.render('searchResults', {
                        stylistsDetails: sty,
                        len: sty.length
                    });
                });
            }
        }
    }
};