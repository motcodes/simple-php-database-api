const express = require('express');
const {
  getCustomers,
  getCustomerById,
  createCustomer,
  deleteCustomers,
  getSeller,
} = require('./queries');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/customer', getCustomers);
app.get('/api/customer/:id', getCustomerById);
app.post('/api/customers', createCustomer);
app.delete('/api/customer/', deleteCustomers);

app.get('/api/seller', getSeller);

app.listen(port, () => console.log(`Listening on port ${port}`));
