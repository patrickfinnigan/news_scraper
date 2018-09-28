// add the scrape function
var scrape = require("../scripts/scrape");

// bring in the controller files
var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/notes");

module.exports = function (router) {
    // if the router "GETS" a "/" entry, it renders the page listed in the result, in this case, it renders the home page
    router.get("/", function (req, res) {
        res.render("home");
    })
    // "GETS" "/saved", renders the saved page
    router.get("/saved", function (req, res) {
        res.render("saved");
    })

    router.get("/api/fetch", function (req, res) {
        console.log("fetch!");
        headlinesController.fetch(function (err, docs) {
            if (!docs || docs.insertedCount === 0) {
                res.json({
                    message: "Nothin' new!"
                });
            } else {
                res.json({
                    message: "Added " + docs.instertCount + " new articles!"
                });
            }
        });
    });
    router.get("/api/headlines", function (req, res) {
        console.log("headlines")
        var query = {};
        if (req.query.saved) {
            query = req.query;
        }
        headlinesController.get(query, function (data) {
            res.json(data);
        });
    });
    router.delete("/api/leadlines/:id", function (req, res) {
        var query = {};
        query._id = req.params.id;
        headlinesController.delete(query, function (err, data) {
            res.json(data);
        });
    });
    router.patch("/api/headlines", function (req, res) {
        headlinesController.update(req.body, function (err, data) {
            res.json(data);
        });
    });
    router.get("/api/notes/:headline_id?", function (req, res) {
        var query = {};
        if (req.params.headline_id) {
            query._id = req.params.headline_id;
        }
        notesController.get(query, function (err, data) {
            res.json(data);
        });
    });
    router.delete("/api/notes/:id", function (req, res) {
        var query = {};
        query._id = req.params.id;
        notesController.delete(query, function (err, data) {
            res.json(data);
        });
    });
    router.post("api/notes", function (req, res) {
        notesController.save(req.body, function (data) {
            res.json(data);
        })
    })
}
// since the viewengine in the server.js app is set to handlebars, then server.js automatically knows that it needs to look for home.handlebars when we mean "home"