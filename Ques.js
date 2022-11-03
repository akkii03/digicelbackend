const mongoose = require('mongoose');

const QuesSchema = new mongoose.Schema({
ques:{
    type:String
},
option1:{
    type:String
},
option2:{
    type:String
},
option3:{
    type:String
},
option4:{
    type:String
},
ans:{
    type:String
},
level:{
    type:Number
}
});

const QuesModel = mongoose.model('ques',QuesSchema);

module.exports = QuesModel;