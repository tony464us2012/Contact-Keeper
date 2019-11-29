const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const Contact = require('../Models/Contact')
const User = require('../Models/User')


router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({
            user: req.user.id
        }).sort({
            date: -1
        });
        res.json(contacts)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

router.post('/', auth, async (req, res) => {
  
    const { name, email, phone, type } = req.body;

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });

        const contact = await newContact.save();
        res.send(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');

    }
});

router.put('/:id', auth, async (req, res) => {
    const{ name, email, phone, type } = req.body;
    //Build contact object
const contactFields = {};
if(name) contactFields.name = name;
if(email) contactFields.email = email;
if(phone) contactFields.phone = phone;
if(type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(400).json({ msg: 'Contact not found' });

        //Make sure user owns the contacts
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not Authorized' });
        }

        contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactFields }, { new: true });
        res.send(contact);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(400).json({ msg: 'Contact not found' });

        //Make sure user owns the contacts
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not Authorized' });
        }

        await Contact.findByIdAndRemove(req.params.id)
        res.send('Contact Removed');

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


module.exports = router;