const express = require ("express");
const mongoose =require ("mongoose");
const cors = require ("cors");
const helmet= require("helmet");
const morgan = require ("morgan");

const app = express();
// vamos carregar os middlwares
app.use (express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

const urldb = "mongodb+srv://senac:123senac@projetonode.jtcwr.mongodb.net/banco?retryWrites=true&w=majority&appName=ProjetoNode";
// estabelecer a conexão com o banco 
mongoose.connect(urldb,{useNewUrlParser:true, useUniFiedTopology:true});
// definir a estrutura dos dados
tabela = new mongoose.Schema({
    nomeCliente:String,
    email: String,
    telefone: String,
    usuario:{type:String, unique:true},
    senha: {type:String, required:true}
});
// criar este modelo de dados no banco mongoose. (criar a tabela)
const cliente= mongoose.model("tbclientes", tabela);



app.get("/",(req,res) => {
    cliente.find().then((result)=>{
        res.status(200).send({dados:result});
    })
    .catch((erro)=>res.status(500).send({erro}));
});

app.get("/projeto/teste",(req,res)=>{
    res.send("Você está em outro endpoint");
});

app.post("/inserir",(req,res) => {
    const rs = new cliente(req.body);
    rs.save().then((result, error)=>{
        if(error){
            return res.status(500).send({msg:"Erro ao cadastrar"});
        }
        else{
            res.status(201).send({msg:result})
        }
    })
    .catch((er)=>res.status(500).send({msg:er}));
});

// configuração do servidor
app.listen("5000",()=>console.log("servidor online em http://127.0.0.1:5000"));