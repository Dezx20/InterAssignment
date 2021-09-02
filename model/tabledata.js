const mongoose = require("mongoose")

const tableData = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: Number,
            required: true,
            minlength: 9,
            maxlength: 13,
        },
        email: {
            type: String,
            required: true,
        },
        hobbies: {
            type: String,
            required: true,
        }
    }
);

mongoose.model("tableData", tableData);