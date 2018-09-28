// to use cheerio to scrape data from articles, we need to set up both request and cheerio
// dont worry so muich about why we need to use request, just so long as you need to use it with cheerio in order for the scraper to work
var request = require("request");
var cheerio = require("cheerio");

//cb means callback
var scrape = function (cb) {

    request("https://www.gamespot.com/news/", function (err, res, body) {

        var $ = cheerio.load(body);

        var articles = [];

        // select all elements that have the class of ".js-event-tracking", and look into the branches listed for each one
        $(".js-event-tracking").each(function (i, element) {

            // these paths grab the heading and the summary from the article defined in the function
            var head = $(this).children(".media-body").children(".media-title").text().trim();
            var sum = $(this).children(".media-body").children(".media-deck").text().trim();
            // console.log(head);
            // console.log(sum);

            if (head && sum) {
                // this just cleans uo the text
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();


                // then we make a new variable called "dataToAdd", consisting of the string data we grabbed and reformated
                // it takes those values we made and renames them into data values that our models can use
                var dataToAdd = {
                    headLine: headNeat,
                    summary: sumNeat
                };

                articles.push(dataToAdd);
                // we then push all the new data in dataToAdd into the articles array defined near the top
            };

        });

        //call back the newly filled articles array
        cb(articles);

    });
};

// export scrape, and in turn export the articles variable and all of its new data
module.exports = scrape;