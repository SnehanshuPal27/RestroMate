import * as orderModel from '../models/order.model.js';

const getOrders = async (req, res) => {
  try {
    const orders = await orderModel.getAll();
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await orderModel.getById(orderId);
    if (!order) {
      return res.status(404).send({ message: 'Order not found' });
    }
    res.status(200).send(order);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const newOrderData = req.body;
    const orderId = await orderModel.create(newOrderData);
    res.status(201).send({ id: orderId, message: 'Order created successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedOrderData = req.body;
    const result = await orderModel.update(orderId, updatedOrderData);
    if (!result) {
      return res.status(404).send({ message: 'Order not found' });
    }
    res.status(200).send({ message: 'Order updated successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const result = await orderModel.remove(orderId);
    if (!result) {
      return res.status(404).send({ message: 'Order not found' });
    }
    res.status(200).send({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export { getOrders, getOrder, createOrder, updateOrder, deleteOrder };