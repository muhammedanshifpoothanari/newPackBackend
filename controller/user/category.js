const Category = require('../../models/category');

const getAllCategory = async (req, res) => {
    try {
        const AllCategory = await Category.find({isBlocked: false});
        res.status(200).send( AllCategory);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};




module.exports = {
    getAllCategory
}