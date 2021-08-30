const express = require('express');
const app = express();
const port = 8000;

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const Items = require('./models/Items')
const Users = require('./models/Users')

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/toDoApp',
{
    useNewUrlParser: true, //to avoid encountering error
    useUnifiedTopology: true //to avoid encountering error
});
/* Steps:
    1. Install mongoose and body-parser
    2. Use mongoose.connect to connect to mongoDB instance
    3. Supply mongoDB URL
    4. Define Schema and models 
    5. Create endpoints
*/

// /* Items endpoint */
// // http://locahost:8000/items
// app.get('/items', (req,res) => {
//     Items.find().then(data => {
//         /* console.log(data); */
//         res.send(data)
//     })
// })


app.get('/users', (req,res) => {
    Users.find().then(data => {
        /* console.log(data); */
        res.send(data)
    })
})

const ItemRouter = require('./routes/items');
app.use('/items', ItemRouter);
// /* Get just one item */
// app.get('/items/:id', (req,res) => {
//     Items.findById(req.params.id).then( data => {
//         res.send(data);
    
//     })
// } )

// /* Create a task */
// app.post( '/items', (req,res) => {
//     let newItem = new Items(req.body);
//     newItem.save().then(data => {
//         console.log(data);
//     })  
// })

// /* To update a task*/
// app.put('/items/:id', (req,res) => {
//     Items.findByIdAndUpdate(req.params.id, req.body).then(data =>
//         console.log(data))
// })

// /* To delete a task */
// app.delete( '/items/:id', (req,res) => {
//     Items.deleteOne({_id: req.params.id}).then(data => {
//         console.log(data);
//         if (data.deletedCount > 0) {
//             res.send("Record deleted");
//         } else { res.send("Record not found");}
//     });
// });

// http://locahost:8000/
app.get('/', (req,res) => {res.send("Welcome to your first express application!"); })

app.listen(port, ()=>{console.log(`App is listening to port ${port}`);});

/* 
    Wwe need to separate the routes/routers because:
    1. Too much information on our index.js
    2. can be easily maintained if on a separate location
*/