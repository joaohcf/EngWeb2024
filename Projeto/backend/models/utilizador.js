import mongoose from "mongoose";

const utilizadorSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    Nome: {type: String, required: true},
    Email: {type: String, required: true},
    Nivel: {type: String, required: true},
    DataRegisto: {type: Date, required: true},
    DataUltimoAcesso: {type: Date, required: true},
    Password: {type: String, required: true},
}, {versionKey: false})

export default mongoose.model('Utilizadores', utilizadorSchema)