var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
let itemlist = [
 {
 title: 'Helmet',
 author: 'Choose selected',
 publishedAt: new Date('2020-01-20'),
 },
 {
 title: 'Small Toys',
 author: 'Choose selected',
 publishedAt: new Date('2019-12-18'),
 },
 {
 title: 'Cosplay Stuff',
 author: 'Choose selected',
 publishedAt: new Date('2020-05-17'),
 },
 {
    title: 'Hand Held',
    author: 'Choose selected',
    publishedAt: new Date('2020-05-12'),
    },
    {
        title: 'Items',
        author: 'Choose selected',
        publishedAt: new Date('2020-05-11'),
        }
 
 ]
 res.render('index', { items: itemlist});
});
module.exports = router;