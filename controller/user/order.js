const Order = require('../../models/order');


const createOrder = async (req, res) => {
    const { userId, address, cart, subTotal, } = req.body;

    try {
        const newOrder = new Order({
            user: userId,
            address,
            items: cart,
            subTotal,
            taxRate:0,
            tax:0,
            total: subTotal,
            payMod: 'cod'
        });

        await newOrder.save();

        res.status(201).json({ order: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getOrdersById = async (req, res) => {
    
    try {
        const id = req.params.id;
        const order = await Order.find({_id: id,status: true})
        res.json({msg: order});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getOrdersByUserId = async (req, res) => {
    const user = req.params.userId; 
    try {
        const orders = await Order.find({ user, status: true }).populate('items.stock');
        res.json( orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const cancelOrder = async (req, res) => {
    console.log(req.body);
    const { _id } = req.body; 
    try {
        const order = await Order.findById({_id: _id});
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        order.status = false;
        await order.save();
        
        res.status(200).send({"msg":"succusfully canceled the order"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports = { 
    getOrdersById,
    getOrdersByUserId,
    cancelOrder,
    createOrder
};
