import mongoose from 'mongoose';

const compositorSchema = new mongoose.Schema({
    id: {type: String, required: true},
    nome: {type: String, required: true},
    bio: {type: String, required: true},
    dataNasc: {type: Date, required: true},
    dataObito: {type: Date, required: true},
    id_periodo: {type: String, required: true},
}, {versionKey: false})

export default mongoose.model('Compositores', compositorSchema)