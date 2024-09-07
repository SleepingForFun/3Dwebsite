var express = require('express');
var router = express.Router();
// ==================================================
// Route to list all records. Display view to list all records
// ==================================================
router.get('/', function(req, res, next) {
let query = "SELECT product_id, productname, package_id, prodcolor, category_id, saleprice, status, homepage FROM product";
// execute query
db.query(query, (err, result) => {
if (err) {
console.log(err);
res.render('error');
}
res.render('product/allrecords', {allrecs: result });
});
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT product_id, productname,prodimage, description, ingredients, weightdetail, healthwarn, prodcolor, package_id,category_id, saleprice, status, homepage FROM product WHERE product_id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.render('product/onerec', {onerec: result[0] });
    }
    });
    });

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {

    let query ="SELECT category_id, categoryname FROM category";
    db.query(query, (err, categories) => {
        if (err){
            console.log(err);
            res.render('error');
        }
        res.render('product/addrec', {category:categories});
    });
    
    });
    
// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {

    var homepage_value=0;
        if (req.body.homepage)
    {
    homepage_value = 1;
    }

    let insertquery = "INSERT INTO product (productname,prodimage, description, ingredients, weightdetail, healthwarn, prodcolor, package_id,category_id, saleprice, status, homepage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(insertquery,[req.body.productname, req.body.prodimage, req.body.description,
    req.body.ingredients, req.body.weightdetail, req.body.healthwarn, req.body.prodcolor,
    req.body.package_id, req.body.category_id, req.body.saleprice, req.body.status, homepage_value],(err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.redirect('/product');
    }
    });
    });
    
// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT product_id, productname,prodimage, description, ingredients, weightdetail, healthwarn, prodcolor, package_id,category_id, saleprice, status, homepage FROM product WHERE product_id = "
    + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {

        let query = "SELECT category_id, categoryname FROM category";
// execute query
db.query(query, (err, categories) => {
if (err) {
console.log(err);
res.render('error');
}
res.render('product/editrec', {onerec: result[0], category: categories});
});
}

    });
    });

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {

    var homepage_value=0;
        if (req.body.homepage)
    {
    homepage_value = 1;
    }

    let updatequery = "UPDATE product SET productname = ?, prodimage = ?, description = ?, ingredients = ?, weightdetail = ?, healthwarn = ?, prodcolor = ?, package_id = ?, category_id = ?, saleprice = ?, status = ?, homepage = ? WHERE product_id = " + req.body.product_id;
    db.query(updatequery,[req.body.productname, req.body.prodimage, req.body.description,
    req.body.ingredients, req.body.weightdetail, req.body.healthwarn, req.body.prodcolor,
    req.body.package_id, req.body.category_id, req.body.saleprice, req.body.status, homepage_value],(err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.redirect('/product');
    }
    });
    });
    
    // ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM product WHERE product_id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.redirect('/product');
    }
    });
    });
    
module.exports = router;