const express = require('express');
const {UserRouter} = require('./routes/user');
const PORT = 3000
const app = express();

app.use(express.json());
app.use('/user', UserRouter);

app.listen(PORT, ()=>{console.log(`Server is live at ${PORT}`)})

