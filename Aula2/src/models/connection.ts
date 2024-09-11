import mongoose, { mongo } from "mongoose";

const uri = "mongodb://127.0.0.1:27017/bdexer";

export default function connect(){
    mongoose.connection.on("connected", () => console.log("connected"));
    mongoose.connection.on("disconnected", () => console.log("disconnected"));
    mongoose.connection.on("close", () => console.log("close"))

    mongoose.connect(uri,{
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 10,
    })
    .then(() => console.log("Conectando ao MongoDB"))
    .catch((e) => {
        console.error("Erro ao conectar ao mongoDB:", e.message);
    });

    process.on("SIGINT", async () =>{
        try{
            console.log("Conexão com o MongoDB fechada");
            await mongoose.connection.close();
            process.exit(0);
        } catch(error){
            console.error("Erro ao fechar a conexão com o MongoDB", error);
            process.exit(1);
        }
    });
}