const {Router} = require('express');
const AdminRouter = Router();
const {adminmd, coursesmd} = require(__dirname + '/db.js');
const {z} = require('zod');
const jwt  = require('jsonwebtoken');
const admin_SECRET_KEY = 'chinmay08';


function auth(req, res, next){
    const token = req.headers.authorization;
    const isValid = jwt.verify(token, admin_SECRET_KEY);
    if(isValid) {
        req.body.id = isValid.id;
        next();
    }
    else{
       res.json({message: 'Invalid Token'});
    }
}


AdminRouter.post('/courses',auth, async function(req, res){
    const {Title:title, Description: desc,Price: price,id : aID} = req.body;

    await coursesmd.create({
        Title: title,
        Description: desc,
        Price: price,
        adminID: aID,
    });
    res.json({message: 'course Created'});
})


AdminRouter.put('/courses',auth,async function(req, res){
    const {Title : title, Description : description, Price : price, CourseID: cID, id : id} = req.body;
    await coursesmd.updateOne(
        {
            _id:cID, adminID: id
        },{
            title: title, description: description, price: price
        });
    res.json({message : "Course Updated"});        
})

AdminRouter.post('/signin',async function(req, res) {
    const email = req.body.Email;
    const password = req.body.Password;

    const response = await adminmd.findOne({Email: email});

    if(response){
        const token = await jwt.sign({id:response._id.toString(), email: email}, admin_SECRET_KEY);
        res.json({token : token});
    }
    else{
        res.json({message: 'Invalid Credentials'});
    }
})


nameregex = /[!@#$%^&*()_+<>]/;
const signupschema = z.object({
    FirstName: z.string().min(2,'Name is too short').regex(/^[A-Za-z]+$/, 'First Name should not contain any special characters'),
    LastName: z.string().min(2, 'Name is too short').regex(/^[A-Za-z]+$/, 'Last Name should not contain any special characters'),
    Email :  z.string().email('Invalid Email'),
    Password : z.string().refine((val)=>nameregex.test(val)).refine((val)=>/[0-9]/.test(val))
})
AdminRouter.post('/signup', async  function(req, res) {

    try{
    const validatedData = signupschema.parse(req.body);

    const fname = validatedData.FirstName;
    const lname = validatedData.LastName;
    const email = validatedData.Email;
    const pasword = validatedData.Password;
 
    await adminmd.create({
      FirstName: fname,
      LastName: lname,
      Email: email,
      Password: pasword
    });

    res.json({'message': 'Signup Successfull'});
}catch(error){
    if(error instanceof z.ZodError){
        res.status(400).json({message: error});
    }
    else{
        res.status(400).json({message: 'User alreday exist'});
    }
}
})


module.exports = {
    AdminRouter: AdminRouter
}