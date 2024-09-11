import mongoose from "mongoose";
const { Schema } = mongoose;

const CarSchema = new Schema({
    model: {
        type: String,
        maxLength: [15, "O modelo pode ter no máximo 15 caracteres"],
        unique: true,
        required: [ true, "O modelo é obrigatório"]
    }
});

const PeopleSchema = new Schema({
    name:{
        type: String,
        maxLength: [30, "O nome pode ter no máximo 30 caracteres"],
        unique: true,
        required: [ true, "O nome é obrigatório"]
    }
});

const PhonesSchema = new Schema({
    people: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "People",
        required: [true, "O dono do telefone é obrigatório"],
        validate: {
            validator: async function (id:string) {
                const people = await People.findById(id);
                return !!people;
            },
            message: "A pessoa fornecida não existe",
        }
    },
    number: {
        type: String,
        match: [/^[0-9]{11}$/,"O telefone deve ter exatamente 11 dígitos"],
        required: [true, "O número é obrigatório"]
    }
});

const CarByPersonSchema = new Schema({
    people: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "People",
        required: [true, "A pessoa é obrigatória"],
        validate: {
            validator: async function (id:string) {
                const people = await People.findById(id);
                return !!people;
            },
            message: "A pessoa fornecida não existe",
        }
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        required: [true, "O carro é obrgatório"],
        validate: {
            validator: async function (id:string) {
                const car = await Car.findById(id);
                return !!car;
            },
            message: "O carro fornecido não existe",
        }
    }
})


const Car = mongoose.model("Car", CarSchema);
const People = mongoose.model("People", PeopleSchema);
const Phone = mongoose.model("Phone", PhonesSchema);
const CarByPerson = mongoose.model("CarByPerson", CarByPersonSchema);

export { Car, People, Phone, CarByPerson}