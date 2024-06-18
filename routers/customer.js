const express = require('express');
const router = express.Router();
const {
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
} = require("../controller/cutomer.controller");

router.get('/', getCustomer);
router.post('/', createCustomer);
router.put('/:id', updateCustomer);
router.delete("/:id", deleteCustomer);
router.get("/:id", getCustomerById);

module.exports = router; 