const db = require('../db'); // Adjust the path as necessary to where your Monk connection is set up

const plantsCollection = db.get('plants');

// Example function to find all plants
const findAll = async () => {
  return await plantsCollection.find({});
};

// Example function to insert a new plant
const create = async (plant) => {
  return await plantsCollection.insert(plant);
};

// Update
function updatePlant(id, plantUpdates) {
    return plants.update({ _id: id }, { $set: plantUpdates });
  }

// Delete
function deletePlant(id) {
return plants.remove({ _id: id });
}

// Export the functions for use in other parts of your application
module.exports = {
  findAll,
  create,
  // Add more CRUD operations as needed
};
