const router =require('express').Router();
const Items = require('../models/Items');

/* Items endpoint */
// http://locahost:8000/items
router.get('/', (req,res) => {
    Items.find().then(data => {
        /* console.log(data); */
        res.send(data)
    })
});

/* Get just one item */
router.get('/:id', (req,res) => {
    
    Items.findById(req.params.id).then( data => {
        res.send(data);
    
    })
} )

/* Create a task */
router.post( '/', (req,res) => {
    let newItem = new Items(req.body);
    newItem.save().then(data => {
        console.log(data);
    })  
})

/* To update a task*/
router.put('/:id', (req,res) => {
    Items.findByIdAndUpdate(req.params.id, req.body).then(data =>
        console.log(data))
})

/* To delete a task */
router.delete( '/:id', (req,res) => {
    Items.deleteOne({_id: req.params.id}).then(data => {
        console.log(data);
        if (data.deletedCount > 0) {
            res.send("Record deleted");
        } else { res.send("Record not found");}
    });
});

module.exports = router;