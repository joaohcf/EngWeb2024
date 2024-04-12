import periodo from '../models/periodo.js';

function read_all(){
    return periodo.find().exec();
}

function read(id){
    return periodo.findOne({id: id}).exec();
}

function create(data){
    return periodo.insertMany([data]).exec();
}

function update(id, data){
    return periodo.findOneAndUpdate({id: id}, data).exec();
}

function remove(id){
    return periodo.findOneAndDelete({id: id}).exec();
}

export default { read_all, read, create, update, remove }