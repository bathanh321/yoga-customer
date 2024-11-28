const Order = require('../models/Order');
const Cart = require('../models/cart');
const Class = require('../models/Class');

const orderController = {
    checkout: async (req, res) => {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const { total } = req.body;

            const cart = await Cart.findOne({ userId });

            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            const newOrder = new Order({
                userId,
                cartId: cart._id,
                total
            });

            await newOrder.save();

            for (const item of cart.items) {
                await Class.findByIdAndUpdate(item.classId, {
                    $addToSet: { participants: userId }
                });
            }

            cart.items = [];
            await cart.save();

            res.status(201).json(newOrder);
        } catch (error) {
            console.error('Error during checkout:', error);
            res.status(500).json({ message: 'Error during checkout', error: error.message });
        }
    },
    
    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find({})
                .populate({
                    path: 'userId',
                    select: 'username'
                });

            res.status(200).json(orders);
        } catch (error) {
            console.error('Error getting all orders:', error);
            res.status(500).json({ message: 'Error getting all orders', error: error.message });
        }
    }
}

module.exports = orderController;