// we inport our scrape and make date scripts into our controller
// the scripts are what get the data we need to give to the controller
var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");

// next we need to inport the models
// we do this because the controller needs something to put the data from the scripts into
var Headline = require("../models/Headline");


// now we put everything in a module.export because we want to export the entire code framework throughout the enture program
module.exports = {
    fetch: function (cb) {
        // whenever fetch runs, run this function...
        scrape(function (data) {
            // we will run the scrape function that we made before
            //notice that we use these keywords to reference our different files...
            //not unlike how an npm function works!
            // the only difference is that the functions we reference were made by us!
            var articles = data;
            // set the data gained by the scrape script to be the variable "articles"
            for (var i = 0; i < articles.length; i++) {
                articles[i].date = makeDate();
                articles[i].saved = false;
            }
            // go through every object in the new articles variable and set the date by the makeDate script
            // and set the saved variable on each object to "false"
            console.log(articles);
            Headline.collection.insertMany(articles, {
                ordered: false
            }, function (err, docs) {
                cb(err, docs);
            })
            // this is a Mongo function!
            // whenever we take a Headline and insert it into the collection function, there are a lot of articles to insert
            // we tell mongo not to order them, and to skip over any errors we get in our docs
        })
    },
    delete: function (query, cb) {
        Headline.collection.remove(query, cb);
    },
    get: function (query, cb) {
        // find all the headlines in the query
        Headline.collection.find(query)
            // sort them from most recent to least recent
            .sort({
                _id: -1
            })
            //pass all the documents to the callback function once everything is sorted
            .exec(function (err, doc) {
                cb(doc);
            })
    },
    update: function (query, cb) {
        console.log(query);
        Headline.collection.update({
            _id: query
        }, {
            $set: query
        }, {}, cb);
    }
}