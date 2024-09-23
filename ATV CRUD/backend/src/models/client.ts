import mongoose, { mongo } from "mongoose";
import { ObjectId, Types, Schema } from "mongoose";

const ClientSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    status:{
        type: String,
        enum: ['ATIVO', 'DESATIVADO'],
        default: 'ATIVO'
    }
})

const Client = mongoose.model("Client", ClientSchema);

export { Client }