const db = require('./models');

db.Stylist.findAll({
    //limit: 10,
    attributes: ['firstName', 'lastName', 'rating'],
    order: [['rating','DESC']]
}).then(sty=>{
    console.log(sty[0].firstName);
});