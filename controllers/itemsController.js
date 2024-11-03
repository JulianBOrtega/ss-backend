const { readFileSync, writeFileSync } = require('../utility/fileManagement');

//TODO update to use test.json and try read, write and delete from frontend

const getAllItems = async (req, res) => {
  const items = await readFileSync('items.json');
  res.json(items);
};

const getItemById = async (req, res) => {
  const id = req.params.id;
  const items = await readFileSync('items.json');
  const item = items[id];

  if (!item) {
    res.status(404).json({ error: 'Item not found' });
  } else {
    res.json(item);
  }
};

const addItem = async (req, res) => {
  const newItem = req.body;
  const items = await readFileSync('items.json');

  if (newItem.id) {
    items[newItem.id] = newItem;
  } else {
    const newId = Object.keys(items).length + 1;
    newItem.id = newId.toString();
    items[newItem.id] = newItem;
  }

  await writeFileSync('items.json', items);
  res.status(201).json(newItem);
};

module.exports = { getAllItems, getItemById, addItem };
