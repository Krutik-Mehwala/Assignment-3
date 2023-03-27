const userModel = require("../models/user.model");
var bcrypt = require("bcryptjs");
const ObjectId = require('mongodb').ObjectId;
path = require('path');

const addUser = async (req, res) => {
    const user = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });

     await userModel.create(user).then((newUser) => {
         res.status(201);
    }).catch((err) => {
        // console.log(err);
         res.status(400)
    });

}

const getUserByID = async(req, res) => {

    try {
        let id = req.params.id
       await userModel.findById({_id: ObjectId(id)}).then((getData)=>{
        // console.log('getData==', getData);
        // let info={};
        // info.id = req.params.id
        // info.username = req.query.username
         res.status(200);
       }).catch((err)=>{
            console.log(`No data found of this id ${id}===`, err);
             res.status(400);
       })
     
    } catch (error) {
        console.log('Error in getUserByID', error);
    }
}

const updateUserById = async (req, res) => {

    try {
        let query = { _id: ObjectId(req.params.id) };
        let data = req.body
        await userModel.updateOne(query, data).then((updatedData) => {
            if(updatedData.modifiedCount > 0){
            return res.status(200)
            }else{
                return res.status(400)
            }
        }).catch((error) => {
            console.log('Error in updateUserById===', error);
        })

    } catch (error) {
        console.log('Error in updateUserById', error);
    }
}

module.exports = {addUser, getUserByID, updateUserById};