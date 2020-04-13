const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const SubAccountModel = mongoose.model('SubAccount')
const requireAuth = require('../middlewares/requireAuth')


const router = express.Router();

//GET
router.get('/subaccounts', (req, res) => {
    SubAccountModel.find(function(err, subaccounts) {
        if (err) {
            console.log(err);
        } else {
            res.json(subaccounts);
        }
    })
});

//fIND ID
router.get('/subaccounts/:id', (req, res) => {
    let id = req.params.id;
    SubAccountModel.findById(id, function(err, subaccount) {
        res.json(subaccount);
    });
});

//CREATE
router.post('/subaccounts/create', async (req, res) => {
    
    const { SubAcct, SubDesc, SubGroup, Active } = req.body;
    if(req){
        console.log(req.body);
    }
    try {
        const subaccount = new SubAccountModel({ SubAcct, SubDesc, SubGroup, Active });
        await subaccount.save();
        res.send('<p>Successfully Created</p>');
    } catch (error) {
       return res.status(422).send(error.message)
    }
});

//UPDATE ID
router.post('/subaccounts/update/:id', async (req, res) => {
    const { SubAcct, SubDesc, SubGroup, Active } = req.body;
    SubAccountModel.findById(req.params.id, function(err, subaccount) {
        if (!subaccount)
        res.status(404).send("data is not found");
        else
        subaccount.SubAcct = SubAcct;
        subaccount.SubDesc = SubDesc;
        subaccount.SubGroup = SubGroup;
        subaccount.Active = Active;
        subaccount.save().then(subaccount => {
            res.json('Sub Account updated!');
        })
        .catch(err => {
            res.status(400).send("Update not possible");
        });
    });
});



module.exports = router