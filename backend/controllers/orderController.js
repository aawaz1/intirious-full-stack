import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../models/orderModel.js";


// @desc fetch all products
// @routes GET api/products
// @acceess - private

const addOrderItems = asyncHandler( async(req ,res) => {
    const {
        orderItems  ,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        totalPrice,
        shippingPrice
    } = req.body;

    if(orderItems && orderItems.length ===0){
        res.status(400);
        throw new Error('No order items');

    }else{
        const order = new Order({
            orderItems : orderItems.map((x)=> ({
                ...x,
                product : x._id,
                _id : undefined

            }) ),
            user : req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice

        });
        const createOrder = await order.save();

        res.status(201).json(createOrder);
    }
   });

    // @desc get logged in user orders
// @routes GET api/orders/myorders
// @acceess - private

const getMyOrders  = asyncHandler( async(req ,res) => {
    const orders = await Order.find({user : req.user._id});
    res.status(200).json(orders);

    });
      // @desc get order by ID
// @routes GET api/orders/:id
// @acceess - private

// const getOrderById  = asyncHandler( async(req ,res) => {
//     const order = await Order.findById(req.params.id);

//     if(order){
//         res.status(200).json(order);
//     }else{
//         throw new Error('Order not found');
//     }
//     // res.send("hello")

//     });

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );
  
    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  });
      // @desc update order to paid
// @routes GET api/orders/:id/pay
// @acceess - private/admin

const updateOrderToPaid  = asyncHandler( async(req ,res) => {
    res.send('update order to paid');

    });
     // @desc update order to delivered
// @routes GET api/orders/:id/deliver
// @acceess - private/admin

const updateOrderToDelivered = asyncHandler(async(req,res) => {
    const order = await Order.findById(req.params.id);

    if(order){
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updateOrder = await order.save();

        res.status(200).json(updateOrder);
    }else {
        res.status(404);
        throw new Error("order not found");
    }
});

  // @desc get all orders
// @routes GET api/orders/
// @acceess - private/admin

const getOrders = asyncHandler(async(req,res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.status(200).json(orders);
});


export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderToDelivered,
    updateOrderToPaid
}
    