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
        db.Stylist.findAll({
            where: {stylistType: type},
            order: [['rating','DESC']],
            include: [db.Schedule]
        }).then(sty=>{
            var ids = [];

            sty.forEach(element => {
                var scheStatus = element.Schedules[0].scheduleStatus;
                var scheDate = element.Schedules[0].scheduleDate;
                if (scheDate == from && scheStatus=='Busy'){
                    ids.push(sty[1].Schedules[0].StylistId);
                }
            });
            //ids.push(8);
            console.log("ids: "+ids);

            db.Stylist.findAll({
                where: {id: {[Op.ne]: 7}},
                order: [['rating','DESC']],
                include: [{
                    model: db.Location,
                    where: {city: city}
                }, db.Skil, db.Image, db.Price]
            }).then(styNew =>{
                //console.log(styNew);
                res.render('searchResults',{
                    stylistsDetails: styNew,
                    len: styNew.length
                });
            });


        });
    }


};
