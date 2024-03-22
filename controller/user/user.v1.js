require('dotenv').config();
const accountSid = `${process.env.accountSid}`;
const authToken = `${process.env.authToken}`;
const client = require("twilio")(accountSid, authToken);
const User = require('../../models/user');


const generateOTP = () => {
    const otpLength = 6;
    const min = Math.pow(10, otpLength - 1);
    const max = Math.pow(10, otpLength) - 1;
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
  };
  const sendOtp = async (req, res) => {
    try {
        if (!req.body) throw new Error('Request body is empty');
        if (!req.body.mobile) throw new Error('Mobile number is required');
        
        const { name, mobile } = req.body;

        const isUserExist = await User.findOne({ name, mobile });
        const otp = generateOTP();

        const expiryDate = new Date();
        expiryDate.setMinutes(expiryDate.getMinutes() + 3);

        await client.messages.create({
            body: `Your OTP is: ${otp}. It will expire in 3 minutes.`,
            from: `whatsapp:${+15074864358}`,
            to: `whatsapp:${mobile}`
        });

        if (!isUserExist) {
            await User.create({ name, mobile, otp, otpExpire: expiryDate });
        } else {
            await User.updateOne({ name }, { $set: { otp, otpExpire: expiryDate } });
        }

        res.status(200).send({ msg: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const verifyOtp = async (req, res) => {
    try {
        if (!req.body) throw new Error('Request body is empty');
        if (!req.body.mobile) throw new Error('Mobile number is required');
        if (!req.body.otp) throw new Error('OTP is required');

        const { mobile, otp } = req.body;

        const otpFromDb = await User.findOne({ mobile }, { otp: 1, otpExpire: 1 });

        if (otpFromDb && otpFromDb.otp === otp && new Date(otpFromDb.otpExpire) >= new Date()) {
            res.status(200).send({ msg: 'Successfully logged in' });
        } else {
            res.status(200).send({ msg: 'Failed to log in' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const allUser = await User.find({});
        res.status(200).send({
             msg: allUser
            });
    } catch (error) {
        res.status(500).send({ error: error.message });

    }
};
const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.find({_id: id});
        res.status(200).send({
             msg: user
            });
    } catch (error) {
        res.status(500).send({ error: error.message });

    }
};
const updateUser = async (req,res) => {
    try {
   
    if(!req.body) throw new Error('You must provide data to update');
    if(!req.body.id) throw new Error('You must provide user id to update');
    
    const {
        id,
        name,
        mobile,
        email,
        address,
    } = req.body;

    let updateObj = {};
    if(name) updateObj.name = name;
    if(mobile) updateObj.mobile = mobile;
    if(email) updateObj.email = email;
    if(address) updateObj.address = address;

    const updatedUser = await User.findOneAndUpdate({_id: id}, {$set: updateObj}, {new: true});
    if(updatedUser) res.status(200).send({
        msg: updatedUser
    })
         
} catch (error) {
    res.status(500).send({ error: error.message });
}
}


const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log('fvvdf');
        console.log(userId,'fvvdf');
        const deletedUser = await User.findByIdAndDelete(userId);
        
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    sendOtp,
    verifyOtp,
    getAll,
    getById,
    updateUser,
    deleteUser
};
