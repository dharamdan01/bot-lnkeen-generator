require('dotenv').config();
const express = require('express');
const path = require('path');
const staticRouter = require('./routes/url');
const app = express();
const PORT = process.env.PORT || 5001;
const connectToMongoDB = require('./config/connect');
const client = require('./bot/index');

connectToMongoDB(process.env.MONGO_URI)
.then(async () => {
    console.log('Connected to MongoDB');
    await client.login(process.env.DISCORD_BOT_TOKEN);
})
.catch((err) => console.log('Error connecting to MongoDB:', err));

//middlewares
app.use(express.json());
app.set('views', path.resolve('./views'));

// routes
app.use('/', staticRouter);


app.listen(PORT, () =>  {
    console.log(`Server started at PORT: ${PORT}`);
})


