var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var noteSchema = new Schema({
    // _headLineId is the identification number of the article we want to attach our note to
    // we set the type to Schema.Types.ObjectId to set this value
    // and we reference "Headline" in order for this model to grab the info from the Headline Object Id from the Headline model
    _headLineId: {
        type: Schema.Types.ObjectId,
        ref: "Headline"
    },
    date: String,
    noteText: String
});

var Note = mongoose.model("Note", noteSchema);

module.exports = Note;
// module.exports is meant to export this code throughout ALL of our program, so that it can be referenced anywhere within the parameters of our program
