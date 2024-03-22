const Stock = require('../../models/stock');

const getAllStock = async (req, res) => {
    try {
        const AllStock = await Stock.find({isBlocked: false});
        res.status(200).send({ msg: AllStock });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getStockById = async (req, res) => {
    try {
        const id = req.params.id;
        const stock = await Stock.find({_id: id, isBlocked: false});

        res.status(200).send(stock);
    } catch (error) {
        res.status(500).send({ error: error.message });

    }
};

const getStockByCategory = async (req, res) => {
    try {
        const category = convertPercentageToSpace(req.params.category);


        const stock = await Stock.find({category:category,isBlocked: false});
        res.status(200).send(stock);
    } catch (error) {
        res.status(500).send({ error: error.message });

    }
};


const updateStock = async (req,res) => {
    try {
   
    if(!req.body) throw new Error('You must provide data to update');
    if(!req.body.id) throw new Error('You must provide user id to update');
    
    const {
        id,
        name,
        size,
        color,
        quantity,
        category,
        price,
        assetId
    } = req.body;

    let updateObj = {};
    if(name) updateObj.name = name;
    if(size) updateObj.size = size;
    if(color) updateObj.color = color;
    if(quantity) updateObj.quantity = quantity;
    if(category) updateObj.category = category;
    if(price) updateObj.price = price;
    if(assetId) updateObj.assetId = assetId;
    updateObj.updatedAt = Date.now();

    const updatedStock = await Stock.findOneAndUpdate({_id: id}, {$set: updateObj}, {new: true});
    if(updatedStock) res.status(200).send({
        msg: updatedStock
    })
         
} catch (error) {
    res.status(500).send({ error: error.message });
}
}

const convertPercentageToSpace = (inputString) => {
    const percentIndex = inputString.indexOf('%');
    if (percentIndex !== -1) {
        const parts = inputString.split('%');
        return parts.join(' ');
    } else {
        return inputString;
    }
};

module.exports = {
    getAllStock,
    getStockById,
    getStockByCategory,
    updateStock
}