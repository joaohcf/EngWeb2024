import mongoose from "mongoose";

const periodoSchema = new mongoose.Schema({
    id: {type: String, required: true},
    periodo: {type: String, required: true},
}, {versionKey: false})

export default mongoose.model('Periodos', periodoSchema)