const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3001;
const QuesModel = require("./Ques");
const UserModel = require("./UserAcc");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());

const jwtKey = process.env.TOKEN;

mongoose
  .connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("database is connected "))
  .catch((err) => console.log("dataBase is not connected due to ", err));

app.post("/admin/addQues", async (req, res) => {
  const { ques } = req.body;
  const newQUes = new QuesModel(ques);
  try {
    await newQUes.save();
    res.status(200).send({ msg: "ques is added successfully" });
  } catch (error) {
    res.send({ err: "ques not added due to ", error });
  }
});

function auth(req,res,next) {
    const token = req.headers['authorization'];
    console.log(token)
    if(!token) {
      return res.status(401).send({msg:"invalid token "})
    }
    try {
    const decode = jwt.verify(token,process.env.TOKEN);
    console.log("decode is ",decode);
    req.userData = decode;
    next();
  } catch (error) {
    res.status(401).send({msg:'auth fail'})
  }
}

app.get("/user/ques", async (req, res) => {
  const ques = await QuesModel.find();
  res.send(ques);
});

app.get("/", (req, res) => {
  res.send("server home");
  console.log("home api hit");
});

app.post("/register", async (req, res) => {
  const { registerUser } = req.body;
  const emailFind = await UserModel.findOne({ email: registerUser.email });
  if (emailFind) {
    res.send({ err: "email is already register" });
  } else {
    const newUser = new UserModel(registerUser);
    try {
      await newUser.save();
      res
        .status(200)
        .json({
          msg: "user register successfully"});
    } catch (error) {
      res
        .status(401)
        .send({ err: "registration not done due to server issue", error });
    }
  }
});

app.post("/login", async (req, res) => {
 
  const{email,password} = req.body;
  const emailFound = await UserModel.findOne({email});
  if(emailFound) {
    if(emailFound.password==password) {
      const token = jwt.sign(
        { email,id: emailFound._id ,password},
        jwtKey)
      res.set('authorization',token)
      res.send({msg:"valid user", token: token})
    }else{
      res.send({err:"invalid credentials"});
    }
  }else{
    res.send({err:"invalid credentials"});
  }
});


app.listen(port, () => {
  console.log("server is live @",port);
});
