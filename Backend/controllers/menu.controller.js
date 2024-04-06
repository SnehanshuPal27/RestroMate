import * as menuModel from '../models/menu.model.js';

const getMenuItems = async (req, res) => {
  try {
    const menuItems = await menuModel.getAll();
    res.status(200).send(menuItems);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getMenuItem = async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const menuItem = await menuModel.getById(menuItemId);
    if (!menuItem) {
      return res.status(404).send({ message: 'Menu item not found' });
    }
    res.status(200).send(menuItem);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const createMenuItem = async (req, res) => {
  try {
    const newMenuItemData = req.body;
    const menuItemId = await menuModel.create(newMenuItemData);
    res.status(201).send({ id: menuItemId, message: 'Menu item created successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const updatedMenuItemData = req.body;
    const result = await menuModel.update(menuItemId, updatedMenuItemData);
    if (!result) {
      return res.status(404).send({ message: 'Menu item not found' });
    }
    res.status(200).send({ message: 'Menu item updated successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const result = await menuModel.remove(menuItemId);
    if (!result) {
      return res.status(404).send({ message: 'Menu item not found' });
    }
    res.status(200).send({ message: 'Menu item deleted successfully' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export { getMenuItems, getMenuItem, createMenuItem, updateMenuItem, deleteMenuItem };