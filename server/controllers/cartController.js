const Cart = require('../models/cart');

const CartController = {
    getCart: async (req, res) => {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const cart = await Cart.findOne({ userId })
                .populate({
                    path: 'items.classId',
                    populate: {
                        path: 'yogaCourseId',
                        select: 'pricePerClass'
                    }
                });
            res.status(200).json(cart);
        } catch (error) {
            console.error('Error retrieving cart information:', error);
            res.status(500).json({ message: 'Error retrieving cart information', error: error.message });
        }
    },

    addToCart: async (req, res) => {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const { classId } = req.body;

            const classInstance = await Class.findById(classId);
            if (classInstance.participants.includes(userId)) {
                return res.status(400).json({ message: 'User is already a participant in this class' });
            }

            if (classInstance.participants.length >= classInstance.capacity) {
                return res.status(400).json({ message: 'Class is full' });
            }

            let cart = await Cart.findOne({ userId });

            if (!cart) {
                cart = new Cart({ userId, items: [{ classId }] });
            } else {
                cart.items.push({ classId });
            }

            await cart.save();
            res.status(201).json(cart);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteItem: async (req, res) => {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const { itemId } = req.params;
            const cart = await Cart.findOne({ userId });
            
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            cart.items = cart.items.filter(item => item._id.toString() !== itemId);

            await cart.save();
            res.status(200).json(cart);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = CartController;