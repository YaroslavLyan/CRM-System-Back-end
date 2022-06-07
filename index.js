const express = require('express');
const app = express();
// const session = require('express-session');
const PORT = process.env.PORT || 3006;
const path = require('path');
const cors = require('cors')
//helmet -helps protect the application from certain web vulnerabilities (HTTP header settings).
const helmet = require('helmet');
const lidRoutes = require('./routes/lid');
const ordersRoutes = require('./routes/orders');
const adminsRoutes = require('./routes/admins');
const clientsRoutes = require('./routes/clients');
const statusRoutes = require('./routes/status');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/order');
const workRoutes = require('./routes/work');
const eventsRoutes = require('./routes/events');
const { authMiddleware } = require('./middlewares/auth');


app.use(cors())

app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.json()); //parse json requests (doesn't work without it)



app.use(helmet());
app.use('/api/', authMiddleware);

app.use('/api/', authRoutes);
app.use('/api/orders/', ordersRoutes);
app.use('/api/admins/', adminsRoutes);
app.use('/api/clients/', clientsRoutes);
app.use('/api/status/', statusRoutes);
app.use('/api/lid/', lidRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/work', workRoutes);
app.use('/api/events', eventsRoutes);




async function start() {
    try {
      app.listen(PORT);//listening to the server
    } catch (e) {
      console.log(e);
    }
  }
  
  start();

