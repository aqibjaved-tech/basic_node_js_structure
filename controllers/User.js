const User = require('../models/User');
const uuid = require('uuid/v4');

exports.create = async(req,res,next)=> {
    try {
        const body = req.body;
        const result = await createUser(body);
        returnResponse(res,result);
    } catch(error) {
        console.log(` ==== ErrorOnUserCreate ==== ${error}`);
        returnResponse(res,null);
    }
}
exports.update = async(req,res,next)=>{
    try {
        const body = req.body;
        const result = await updateUser(body);
        returnResponse(res,result);
    } catch(error) {
        console.log(` ==== ErrorOnUserUpdate ==== ${error}`);
        returnResponse(res,null);
    }
}
exports.findOneByEmail = async(req,res,next)=> {
    try {
        const email = req.query.email;
        const result  = await findUserByEmail(email);
        returnResponse(res,result);
    } catch(error) {
        console.log(` ==== ErrorOnUserFindByEmail ==== ${error}`);
        returnResponse(res,null);
    }
}
exports.findAll = async(req,res,next)=> {
    try {
        const result = await findAllUsers();
        returnResponse(res,result);
    } catch(error) {
        console.log(` ==== ErrorOnUserFindAll ==== ${error}`);
        returnResponse(res,null);
    }
}
exports.delete = async(req,res,next)=> {
    try {
        const email = req.query.email;
        const result  = await deleteUserUserByEmail(email);
        returnResponse(res,result);
    } catch(error) {
        console.log(` ==== ErrorOnUserFindByEmail ==== ${error}`);
        returnResponse(res,null);
    }
}
//helper functions
const createUser = async(body)=> {
    try {
        const result = await User.create({
            id: uuid(),
            email: body.email,
            password: body.password,
            fullName: body.fullName,
            gender: body.gender,
            address: body.address,
            phone: body.phone,
            isActive: true
        });
        return result;
    } catch(error) {
        console.log(` ==== createUserError ==== ${error}`);
        return null;
    }
}
const updateUser = async(body)=> {
    try {
        let user = await findUserByEmail(body.email);
        if(user) {
            user.fullName = body.fullName;
            user.password = body.password;
            user.gender = body.gender;
            user.address = body.address;
            user.phone = body.phone;
            await user.save();
            return user;
        } else {
            return null;
        }
    } catch(error) {
        console.log(` ==== updateUserError ==== ${error}`);
        return null;
    }
}
const findUserByEmail = async(email)=> {
    try {
        const result = await User.findOne({
            where: {
                email: email,
                isActive: true
            }
        });
        return result;
    } catch(error) {
        console.log(` ==== findUserByEmailError ==== ${error}`);
        return null;
    }
}
const findAllUsers = async()=> {
    try {
        const result = await User.findAll({where:{isActive: true}});
        return result;
    } catch(error) {
        console.log(` ==== findAllUsersError ==== ${error}`);
        return [];
    }
}
const deleteUserUserByEmail = async(email)=> {
    try {
        let user = await findUserByEmail(email);
        if(user) {
            user.isActive = false;
            await user.save();
            return true;
        } else {
            return false;
        }
    } catch(error) {
        console.log(` ==== deleteUserError ==== ${error}`);
        return false;
    }
}
const returnResponse = (res,result)=>{
    try {
        if(result) {
            return res.status(200).json({
                message: "Success",
                hasError: false,
                data: result
            })
        } else {
            return res.status(200).json({
                message: "Failure",
                hasError: true
            })
        }
    } catch(error) {
        console.log(` ==== returnResponseError ==== ${error}`);
        return res.status(200).json({
            message: "Failure",
            hasError: true
        });
    }
}