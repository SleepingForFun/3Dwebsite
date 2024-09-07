var express = require('express');
const { render } = require('../app');
var router = express.Router();

router.get('/', function(req,res,next){
    res.render('report/reportmenu');
});

//customer
router.get('/custlist', function(req, res, next) {
    let query = "SELECT customer_id, firstname,lastname,city,state,username FROM customer";
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    }
    res.render('report/custlist', {allrecs: result });
    });
    });

//product
router.get('/prodlist', function(req, res, next) {
    let query = "SELECT product_id, productname, package_id, prodcolor, category_id, saleprice, status, homepage FROM product";
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    }
    res.render('report/prodlist', {allrecs: result });
    });
    });
//salelist
router.get('/salelist', function(req, res, next) {
    let query = "SELECT order_id, customer_id, saledate, paymentstatus FROM saleorder";
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    }
    res.render('report/salelist', {allrecs: result });
    });
    });
module.exports = router;