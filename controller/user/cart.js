const User = require('../../models/user');

async function getCartById(req, res) {
    const userId = req.params.userId; 
    try {
        const user = await User.findById(userId).populate('cart');
        res.json(user.cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function addToCart(req, res) {
    const { _id, id, quantity,price,assetId } = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: id, 'cart.stock': _id },
            { $inc: { 'cart.$.quantity': quantity } },
            { new: true }
        );

        if (updatedUser) {
            res.json(updatedUser.cart);
        } else {
            const newUser = await User.findOneAndUpdate(
                { _id: id },
                { $addToSet: { cart: { stock: _id, quantity: quantity,  price,assetId } } },
                { new: true }
            );
            if (newUser) {
                res.json(newUser.cart);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



async function updateCart(req, res) {
    const { userId, cartItems } = req.body; 
    try {
        const user = await User.findById(userId);
        user.cart = cartItems;
        await user.save();
        res.json({msg:user.cart});

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function removeFromCart(req, res) {
    const { userId, stock } = req.body; 
    try {
        const user = await User.findById(userId);
        user.cart = user.cart.filter(item => item.stock.toString() !== stock);
        await user.save();
        res.json({msg: 'updated successfully'});

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { 
    getCartById,
    addToCart,
    updateCart,
    removeFromCart
};
