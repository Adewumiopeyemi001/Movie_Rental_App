const { Customer, validateCustomer } = require("../models/model.customer");
// const mongoose = require("mongoose");


exports.getCustomer = async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
};

exports.createCustomer = async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  customer = await customer.save();

  res.send(customer);
};

exports.updateCustomer = async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone,
    },
    { new: true }
  );

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res
        .status(404)
        .send("The customer with the given ID was not found.");
    }

    res.send(customer); // Optionally, you can send a response indicating successful deletion
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getCustomerById = async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
};