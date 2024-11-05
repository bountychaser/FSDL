const { Router } = require('express');
const UserRouter = Router();
const {usermd} = require(__dirname + '/db.js');
const jwt = require('jsonwebtoken');
const {z} = require('zod');
const SECRECT_KEY = 'chinmay123';
const path = require('path');


function auth(req, res, next) {
const token = req.headers.authorization;
const isValid = jwt.verify(token, SECRECT_KEY);
if(isValid){
    req.body.id = isValid.id;
    console.log(isValid.id);
    next();  
}
else{
    res.status(400).json({message: "Invalid Token"});
}
}

UserRouter.post('/signin', async function (req, res) {
const {Email: email, Password : password} = req.body;

const response = await usermd.findOne({ Email: email});
if(response){
    const token = jwt.sign({id:response._id.toString(), Password: password}, SECRECT_KEY);
    //res.json({token:token});
    res.sendFile(path.join(__dirname , '../pages/home.html'));
}
else{
    res.status(400).json({message:'Invalid Credentials'});
}   
})


const nameRegex = /^[A-Za-z]+$/;
const signupschema = z.object({
    FirstName: z.string().min(2,"Atleast 2 Characters needed").max(50,'Name is too long.Please take birth again').regex(nameRegex,'Name should only contain alphabets.'),
    LastName: z.string().min(2,"Atleast 2 Characters needed").max(50,'Name is too long.Please take birth again').regex(nameRegex, 'Name should only contain alphabets.'),
    Password: z.string().min(8,'Password should contain atleast 8 characters').refine((val)=>/[!@#$%^&*(){}+-.<>]/.test(val),'Password should contain atleast one special character').refine((val)=>/[A-Z]/.test(val), 'Password should contain at least one Uppercase Character.'),
    Email: z.string().email('Invalid email address'),
})
UserRouter.post('/signup', async function (req, res) {
    console.log(req.body);
    try{
const validatedData = signupschema.parse(req.body);

const {FirstName: fname, LastName: lname, Email : email, Password: password} = validatedData;
    
    await usermd.create(
        {
            FirstName: fname,
            LastName: lname,
            Email: email,
            Password: password
        }
    );


    res.send(`
        <body>
        <div style="display: flex; justify-content: center;">
        <div>
          <h1 style = "margin-left:60px">Signup Successful!</h1><br>
          <img src = "https://t4.ftcdn.net/jpg/09/20/94/51/360_F_920945163_CIufUQjmtVKejLqYpLv1RrHTNvkdgqQC.jpg">
        </div>
        </div>
        </body>
      `);
    }catch(error){
        if(error instanceof z.ZodError){
            res.status(400).json({error:error})
        }
        else{
            res.status(400).json({message:'User already signed up'})
        }
    }
})


UserRouter.get('/purchases', auth , async function (req, res) {
    
     
    }
)


module.exports = {
 UserRouter: UserRouter
}