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
    //var maxPriceEvening = req.body.priceevening;
    //res.send(city+" "+type+" "+date+" "+gender);
    //res.render('searchResults');


    if (date==="") { // Gender and Date not specified
        if (type==='both') {
            db.Stylist.findAll({
                where: {gender: gender},
                attributes: ['id','firstName', 'lastName', 'rating'],
                order: [['rating','DESC']],
                include: [{
                    model: db.Location,
                    where: {city: city}
                }, db.Skil, db.Image, {
                    model: db.Price,
                    where: {dayPrice : {[Op.between]: [maxPriceDayFrom, maxPriceDayTo]}}
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
                where: {stylistType: type, gender: gender},
                attributes: ['id','firstName', 'lastName', 'rating'],
                order: [['rating','DESC']],
                include: [{
                    model: db.Location,
                    where: {city: city}
                }, db.Skil, db.Image, {
                    model: db.Price,
                    where: {dayPrice : {[Op.between]: [maxPriceDayFrom, maxPriceDayTo]}}
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

        res.send('Error');
    }
};