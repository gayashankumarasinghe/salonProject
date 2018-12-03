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

   // res.send(type+ city);

    db.Stylist.findAll({
        where: {stylistType: type},
        attributes: ['id','firstName', 'lastName', 'rating'],
        order: [['rating','DESC']],
        include: [{
            model: db.Location,
            where: {city: city}
        }, db.Skil, db.Image, db.Price]
    }).then(sty=>{
        console.log(sty[0]);
        res.render('searchResults',{
            stylistsDetails: sty
        });
    });

};
