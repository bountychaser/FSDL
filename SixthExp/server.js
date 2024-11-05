const express = require('express');
const path = require('path');
const {UserRouter} = require('./routes/user');
const {AdminRouter} = require('./routes/admin');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/user', UserRouter);
app.use('/admin', AdminRouter);

app.get('/signup', (req, res) => {
    res.sendFile(path.join( __dirname , './pages/Signup.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './pages/Login.html'));
});

app.get('/landing', (req, res) => {
    res.sendFile(path.join(__dirname, './pages/Landing.html'));
});

app.listen(PORT, ()=>{console.log(`Server is live at ${PORT}`)})