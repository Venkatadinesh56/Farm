const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err);
});

// User schema
mongoose.connect('mongodb://127.0.0.1:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err);
});

// User schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  name: String,
  number: String,
  password: { type: String, required: true },
  cartitems: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    Id: Number,
    name: String,
    imgurl1: String,
    imgurl2: String,
    stock: String,
    introduction: String,
    description: String,
    Packaging: String,
    Package: String,
    Quantity: Number,
    MRP: Number,
    discount_percent: String,
    bought: String,
    storage: String,
    country_of_origin: String,
    for_sale: String
  }],
  address: [{
    name: String,
    number: String,
    pincode: String,
    houseNumber: String,
    area: String,
    landmark: String,
    town: String,
    state: String
  }],
  orders: [{
    product: Object,
    address: Object,
    paymentDetails: Object,
    totalAmount: Number,
    orderDate: {
      type: Date,
      default: Date.now
    },
    orderStatus: {
      type: String,
      enum: ['In Progress', 'Completed', 'Cancelled'],
      default: 'In Progress'
    }
  }]
});






const User = mongoose.model('User', userSchema, 'users');


// Signup route
app.post('/signup', async (req, res) => {
  const { email, name, number, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required' });
  }

  try {
    const newUser = new User({ email, name, number, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error saving user', err);
    res.status(500).json({ message: 'Error saving user' });
  }
});





app.post('/login', async (req, res) => {
  const { lemail, lpassword } = req.body;

  try {
    const user = await User.findOne({ email: lemail });

    if (!user || user.password !== lpassword) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.status(200).json({ success: true, message: 'Login successful', email: user.email });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


// Endpoint to fetch user details by email
app.get('/userdetails', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Save address route




// Endpoint to save address
// Endpoint to save address
app.post('/address', async (req, res) => {
  const { table, name, number, pincode, houseNumber, area, landmark, town, state } = req.body;

  if (!table) {
    return res.status(400).json({ message: 'Email (table) is required' });
  }

  try {
    // Find user by email (table)
    const user = await User.findOne({ email: table });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create new address object
    const newAddress = {
      name,
      number,
      pincode,
      houseNumber,
      area,
      landmark,
      town,
      state
    };

    // Push new address into the user's address array
    user.address.push(newAddress);

    // Save updated user document
    await user.save();

    res.status(201).json({ message: 'User address created successfully' });
  } catch (err) {
    console.error('Error saving user address', err);
    res.status(500).json({ message: 'Error saving user address' });
  }
});


// Endpoint to get all addresses for a given table
app.get('/address', async (req, res) => {
  const { table } = req.query;

  if (!table) {
    return res.status(400).json({ message: 'Table name (email) is required' });
  }

  try {
    const user = await User.findOne({ email: table });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const addresses = user.address; // Assuming user.address is the array of addresses
    res.status(200).json(addresses);
  } catch (err) {
    console.error('Error fetching user addresses', err);
    res.status(500).json({ message: 'Error fetching user addresses' });
  }
});

// Endpoint to update an address by id for a given table
app.put('/address/:id', async (req, res) => {
  const { id } = req.params;
  const { table, name, number, pincode, houseNumber, area, landmark, town, state } = req.body;

  if (!table) {
    return res.status(400).json({ message: 'Table name (email) is required' });
  }

  try {
    const user = await User.findOne({ email: table });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the address by id in the user's address array
    const addressToUpdate = user.address.id(id); // Assuming user.address is a Mongoose subdocument array

    if (!addressToUpdate) {
      return res.status(404).json({ message: 'Address not found' });
    }

    // Update fields of the address
    addressToUpdate.name = name;
    addressToUpdate.number = number;
    addressToUpdate.pincode = pincode;
    addressToUpdate.houseNumber = houseNumber;
    addressToUpdate.area = area;
    addressToUpdate.landmark = landmark;
    addressToUpdate.town = town;
    addressToUpdate.state = state;

    // Save updated user document
    await user.save();

    res.sendStatus(204);
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).send('Internal Server Error');
  }

});

// Endpoint to delete an address by id for a given table
app.delete('/address/:id', async (req, res) => {
  const { id } = req.params;
  const { table } = req.query;

  if (!table) {
    return res.status(400).json({ message: 'Table name (email) is required' });
  }

  try {
    const user = await User.findOne({ email: table });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove address from user's address array
    user.address.pull(id); // Assuming address ids are stored in the array

    // Save updated user document
    await user.save();

    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).send('Internal Server Error');
  }
});




const templeSchema=new mongoose.Schema({
  Id:Number,
  temple_name:String,
  imgurl1:String,
  imgurl2:String,
  temple_legend:String,
  significance:String,
  timings_mon_thrus:String,
  timings_fri:String,
  annaprasadam_details:String,
  contact_details:String,
  Google_Maps_Location:String,
  });
  
  const Temple=mongoose.model('Temple',templeSchema,'Templedata');
  app.get('/tdata',async (req,res) =>{
    try{
      const templedetails=await Temple.find();
      res.json(templedetails);
    }
    catch (err){
      console.err("Error retrieving users",err);
      res.status(500).json({message:'Error retrieving users'});
    }
  })

const VisitorSchema = new mongoose.Schema({
  visiter_day: Date,
  visiter_time: String,
  visiter_name: String,
  visiter_email: String,
  visiter_number: String,
  vister_reason: String,
  vister_address: String,
  visiter_gender: String,
  visiter_transport: String,
  visiter_message: String,
  visiter_district: String,
  visiter_state: String,
});

const Visitor = mongoose.model('Visitor', VisitorSchema, 'Visitors');

app.post('/api/visit', async (req, res) => {
  try {
    const visitor = new Visitor(req.body);
    await visitor.save();
    res.status(201).send(visitor);
  } catch (error) {
    res.status(400).send(error);
  }
});

  





  const productSchema = new mongoose.Schema({
    Id: Number,
    name: String,
    imgurl1: String,
    imgurl2: String,
    stock: String,
    introduction: String,
    description: String,
    Packaging: String,
    Package: String,
    Quantity: Number,
    MRP: Number,
    discount_percent: String,
    bought: String,
    storage: String,
    country_of_origin: String,
    for_sale: String,
  });
  const Product = mongoose.model('Product', productSchema, 'productdetails');
app.get('/pdetails', async (req, res) => {
    try {
        const logins = await Product.find();
        res.json(logins);
    } catch (err) {
        console.error('Error retrieving users', err);
        res.status(500).json({ message: 'Error retrieving users' });
    }
});











// POST method to add a product
app.post('/users', async (req, res) => {
  const { table, name, imgurl1, imgurl2, stock, introduction, description, Packaging, Package, Quantity, MRP, discount_percent, bought, storage, country_of_origin, for_sale } = req.body;

  if (!table) {
    return res.status(400).send({ message: 'Table name (email) is required' });
  }

  try {
    const user = await User.findOne({ email: table });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const product = new Product({
      name,
      imgurl1,
      imgurl2,
      stock,
      introduction,
      description,
      Packaging,
      Package,
      Quantity,
      MRP,
      discount_percent,
      bought,
      storage,
      country_of_origin,
      for_sale
    });

    user.cartitems.push(product); // Assuming cartitems is the array of products in user schema

    await user.save();

    // Send success response
    res.status(201).json({ message: 'Product added successfully', product });

  } catch (error) {
    // Handle error
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Error adding product', error });
  }
});

app.get('/cart/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const cartItems = user.cartitems;
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error retrieving cart items:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});



// Endpoint to fetch cart items for a user by email
app.get('/cart', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return only the cartitems array
    res.status(200).json(user.cartitems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});











// Endpoint to delete a cart item by ID for a given email

app.delete('/cart/:id', async (req, res) => {
  const { id } = req.params; // Extract the item ID from request params
  const { email } = req.body; // Extract the email from request body

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.error("User not found for email: ${email}");
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the cart item by its ID within the user's cartitems array
    const cartItem = user.cartitems.id(id);
    if (!cartItem) {
      console.error("Cart item not found for ID: ${id}");
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // Remove the cart item
    user.cartitems.pull(id);

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: 'Cart item deleted successfully' });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});









// Endpoint to update quantity of a cart item by ID
app.put('/cart/:id', async (req, res) => {
  const itemId = req.params.id;
  const { quantity } = req.body;

  try {
    const user = await User.findOne({ email: req.body.table });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the cart item by its ID within the user's cartitems array
    const cartItem = user.cartitems.id(itemId);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // Update the quantity in the cart item
    cartItem.Quantity = quantity;
    await user.save();

    res.status(200).json({ message: 'Cart item quantity updated successfully' });
  } catch (error) {
    console.error('Error updating cart item quantity', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});





app.post('/api/orders', async (req, res) => {
  const { orderData, email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'User email is required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the new order to the user's orders array
    user.orders.push(orderData);
    await user.save();

    res.status(201).json({ message: 'Order placed successfully', order: orderData });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Failed to place order', error });
  }
});




// Fetch all orders for a user by email
app.get('/api/orders', async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email }).populate('orders');
    if (user) {
      res.status(200).json(user.orders);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Failed to fetch user orders', error);
    res.status(500).json({ message: 'Failed to fetch user orders', error });
  }
});


// Update route for cancelling an order by ID
// Update route for cancelling an order by ID
app.put('/api/orders/:id/cancel', async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const order = user.orders.id(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.orderStatus = 'Cancelled';
    await user.save();

    res.status(200).json(order);
  } catch (error) {
    console.error('Failed to cancel order', error);
    res.status(500).json({ message: 'Failed to cancel order', error });
  }
});



// Update route for marking an order as completed by ID

app.put('/api/orders/:id/completed', async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const order = user.orders.id(id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      order.orderStatus = 'Completed';
      await user.save();
  
      res.status(200).json(order);
    } catch (error) {
      console.error('Failed to cancel order', error);
      res.status(500).json({ message: 'Failed to cancel order', error });
    }
  });





















// Start server
app.listen(port, () => {
  console.log('Server is running on port ${port}');
});
