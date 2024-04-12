import compositor from '../models/compositor.js';

function read_all(query){
    return compositor.find(query).sort({nome: 1}).exec();
}

function read(id){
    return compositor.aggregate([
        {
            $match: {
                id: id
            }
        },
        {
            $lookup: {
                from: "periodos",
                localField: "id_periodo",
                foreignField: "id",
                as: "periodo"
            }
        },
        {
            $unwind: {
                path: "$periodo",
                preserveNullAndEmptyArrays: true
            }
        }
    ]).exec();
}

function create(data){
    return compositor.insertMany([data]).exec();
}

function update(id, data){
    return compositor.findOneAndUpdate({id: id}, data).exec();
}

function remove(id){
    return compositor.findOneAndDelete({id: id}).exec();
}

function remove_by_periodo(id){
    return compositor.deleteMany({id_periodo: id}).exec();
}

export default { read_all, read, create, update, remove, remove_by_periodo }