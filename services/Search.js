const db = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports.primarySearch = function (req, res) {
    var type;
    if(req.body.type==='a stylist'){
        type = 'Stylist';
    }else if(req.body.type==='an educator'){
        type = 'Educator';
    }else{
        type = 'both';
    }

    var city = req.body.city1;
    var from = req.body.date1;

    //var to = req.body.date2;
    //console.log(from);
    //console.log(to);
   // res.send(type+ city);
    console.log(from);
    if (from==="") {
        if (type==='both') {
            db.Stylist.findAll({
                attributes: ['id','firstName', 'lastName', 'rating'],
                order: [['rating','DESC']],
                include: [{
                    model: db.Location,
                    where: {city: city}
                }, db.Skil, db.Image, db.Price]
            }).then(sty=>{
                //console.log(sty[0]);
                res.render('searchResults',{
                    stylistsDetails: sty,
                    len: sty.length
                });
            });
        }else{
            db.Stylist.findAll({
                where: {stylistType: type},
                attributes: ['id','firstName', 'lastName', 'rating'],
                order: [['rating','DESC']],
                include: [{
                    model: db.Location,
                    where: {city: city}
                }, db.Skil, db.Image, db.Price]
            }).then(sty=>{
                //console.log(sty[0]);
                res.render('searchResults',{
                    stylistsDetails: sty,
                    len: sty.length
                });
            });
        }

    }else {

        if (type==='both'){
            db.Stylist.findAll({
                attributes: ['id','firstName', 'lastName', 'rating'],
                order: [['rating','DESC']],
                include: [{
                    model: db.Location,
                    where: {city: city}
                }, db.Skil, db.Image, db.Price,{
                    model: db.Schedule,
                    where: {scheduleDate: {[Op.ne]:from}}
                }]
            }).then(sty=>{
                console.log(sty);
                res.render('searchResults',{
                    stylistsDetails: sty,
                    len: sty.length
                });
            });
        }else {
            db.Stylist.findAll({
                where: {stylistType: type},
                attributes: ['id','firstName', 'lastName', 'rating'],
                order: [['rating','DESC']],
                include: [{
                    model: db.Location,
                    where: {city: city}
                }, db.Skil, db.Image, db.Price,{
                    model: db.Schedule,
                    where: {scheduleDate: {[Op.ne]:from}}
                }]
            }).then(sty=>{
                res.render('searchResults',{
                    stylistsDetails: sty,
                    len: sty.length
                });
            });
        }




    }


};
