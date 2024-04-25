import mongoose from "mongoose";

const inqueritoSchema = new mongoose.Schema({
    _id: {type: String, required: true},

}, {versionKey: false})

export default mongoose.model('Inqueritos', inqueritoSchema)