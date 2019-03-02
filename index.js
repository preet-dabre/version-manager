require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const scraper = require('./scraper');
const _ = require('lodash');

const {ObjectId} = require('mongodb');
const {mongoose} = require('./db/mongoose');
const {Package} = require('./models/package');

const app = express();

//middleware
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('<h1>Version Status</h1>');
});

app.get('/package/:package', (req, res) => {
    scraper
        .getPackageDetails(req.params.package)
        .then((packageDetails) => {
            res.json(packageDetails);
        });
});


app.post('/addPackage', (req, res) => {
    var packageDetails = _.pick(req.body, ['name', 'url']);
    var package = new Package({
        name: packageDetails.name,
        url: packageDetails.url
    });

    package.save()
        .then((doc) => {
            res.send(doc);
        }, (err) => {
            res.status(400).send(err);
        });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Listening on port:', port);
});
