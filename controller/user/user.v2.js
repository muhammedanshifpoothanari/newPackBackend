const User = require('../../models/user');
const Subscribers = require('../../models/subscribers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try {
        console.log(req.body,'jhbgvf')
        if(!req.body) throw new Error('You must fill all required feilds');
        if(!req.body.name) throw new Error('You must fill your name');
        if(!req.body.mobile) throw new Error('You must fill your mobile');
        if(!req.body.password) throw new Error('You must fill your password');

        const {
            name,
            mobile,
            password,
        } = req.body;

     console.log(1);
        const user = await User.findOne({mobile, name});
        console.log(2);
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(3);
        if(user) {
            const isPasswordTrue = await bcrypt.compare(password, user.password)
            console.log(4,isPasswordTrue);
            if(isPasswordTrue === false) return res.status(500).send({msg: 'Password is not correct'});
            console.log(5);
            let authentor
            if(user.isAdmin === true) {
                 authentor = false;
            } else authentor = true;
            
            const token = jwt.sign({ name: name, mobile: mobile, isUser: authentor  }, '5566', {
                expiresIn: '1h',
                });
                console.log(authentor);
            return  res.status(200).send({msg: `${name} has successfully logged in`, token: token ,_id: user._id,  isUser: authentor });
        } else {
            console.log('6.6');
            const userIsBeingCreated = await User.create({ name, mobile, password: hashedPassword });
            console.log(userIsBeingCreated,7,userIsBeingCreated);
            const token = jwt.sign({ name: name, mobile: mobile }, '5566', {
                expiresIn: '1h',
                });
                console.log(8);
             
            return res.status(200).send({msg: `${name} has successfully logged in`, token: token, _id: userIsBeingCreated._id, isUser: false});
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });

    }
};


const forgetPassword = async (req,res) => {
    try {
        if(!req.body) throw new Error('You must fill all required feilds');
        if(!req.body.name) throw new Error('You must fill your name');
        if(!req.body.mobile) throw new Error('You must fill your mobile');
        if(!req.body.newPassword) throw new Error('You must fill your password');

        const {
            name,
            mobile,
            newPassword
        } = req.body;

        const user = await User.findOne({mobile, name});
        if(user) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const updatedUser =  await User.findOneAndUpdate({mobile, name}, {$set: {password: hashedPassword}});
            if(updatedUser) {
                res.status(200).send({
                    msg: 'Password updated successfully '
                });
            } else {
                res.status(500).send({
                    msg: 'contact admin for entering'
                });
            }
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
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });

    }
};

const getAddressById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.find({_id: id},{_id: 0, address: 1});
        res.status(200).send( user[0].address);
    } catch (error) {
        res.status(500).send({ error: error.message });

    }
};
const updateUser = async (req,res) => {
    try {
    if(!req.body) throw new Error('You must provide data to update');
    if(!req.body._id) throw new Error('You must provide user id to update');
    
    const {
        _id,
        name,
        mobile,
        email,
        address,
        assetId
    } = req.body;

    let updateObj = {};
    if(name) updateObj.name = name;
    if(mobile) updateObj.mobile = mobile;
    if(email) updateObj.email = email;
    if(address) updateObj.address = address;
    if(assetId) updateObj.assetId = assetId;
    updateObj.updatedAt = Date.now();
    
    const updatedUser = await User.findOneAndUpdate({_id}, {$set: updateObj}, {new: true});
    if(updatedUser) {console.log(updatedUser,'kljnbhgv');
        res.status(200).send(updatedUser)}
         
} catch (error) {
    res.status(500).send({ error: error.message });
}
}

const createSubscriber = async (req, res) => {
    try {
        if(!req.body.mobile) throw new Error('Mobile Number is Not Provided');
        const {
            mobile
        } = req.body;
        const userIsBeingCreated = await Subscribers.create({mobile});
        if(userIsBeingCreated) res.status(200).send({ msg: 'Successfully Subscribed' });
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
    login,
    forgetPassword,
    getAll,
    getById,
    getAddressById,
    updateUser,
    deleteUser,
    createSubscriber
};
