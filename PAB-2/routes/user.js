const {Router} = require('express');
const UserRouter = Router();
const {usermd, itemsmd} = require('../db.js');
const{z} = require('zod');
SECRET_KEY = 'chinmay';
const jwt = require('jsonwebtoken');

const nameRegex = /^[A-Za-z]+$/;
const signupschema = z.object({
    FirstName: z.string().min(2,"Atleast 2 Characters needed").max(50,'Name is too long.Please take birth again').regex(nameRegex,'Name should only contain alphabets.'),
    LastName: z.string().min(2,"Atleast 2 Characters needed").max(50,'Name is too long.Please take birth again').regex(nameRegex, 'Name should only contain alphabets.'),
    Password: z.string().min(8,'Password should contain atleast 8 characters').refine((val)=>/[!@#$%^&*(){}+-.<>]/.test(val),'Password should contain atleast one special character').refine((val)=>/[A-Z]/.test(val), 'Password should contain at least one Uppercase Character.'),
    Email: z.string().email('Invalid email address'),
})

function auth(req, res, next) {
    const token = req.headers.authorization;
    const isValid = jwt.verify(token, SECRET_KEY);
    if(isValid){
        req.body.id = isValid.id;
        console.log(isValid.id);
        next();  
    }
    else{
        res.status(400).json({message: "Invalid Token"});
    }
 }


UserRouter.post('/signup', async function (req, res) {
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
        
        
            res.send(
                res.json({
                    message: 'User created successfully'
                })
            );
            }catch(error){
                if(error instanceof z.ZodError){
                    res.status(400).json({error:error})
                }
                else{
                    res.status(400).json({message:'User already signed up'})
                }
            }
        })

        UserRouter.post('/signin', async function (req, res) {
            const {Email: email, Password : password} = req.body;
            
            const response = await usermd.findOne({ Email: email});
            if(response){
                const token = jwt.sign({id:response._id.toString(), Password: password}, SECRET_KEY);
                //res.json({token:token});
                res.json({token : token});
            }
            else{
                res.status(400).json({message:'Invalid Credentials'});
            }   
            })

        UserRouter.post('/items' ,auth, async function (req, res) {
            const id = req.body.id;
            const name =req.body.itemName;


            await itemsmd.create(
                {
                    userID : id,
                    itemName : name
                }
            ).then(res.json({message: 'Item created successfully'}))


        })
        
module.exports = {
    UserRouter: UserRouter
   }