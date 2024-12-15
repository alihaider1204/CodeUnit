const mongoose = require("mongoose");

// Define the schema for the Developer model
const developerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
        required: true,
    },
    bio: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the Developer model
const Developer = mongoose.model("Developer", developerSchema);

// Export the model
module.exports = Developer;
