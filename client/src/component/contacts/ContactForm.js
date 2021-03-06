import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext'

const ContactForm = () =>  {
    const contactContext = useContext(ContactContext)

    const { addContact, current, clearCurrent, updateContact } = contactContext;

    useEffect(() => {
        if(current !== null) {
            setContact(current)
        } else{
            setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
            })
        }
    }, [ contactContext, current ]);

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const inputStyle = {width: '100%', margin: '1rem 0'};
    const radioStyle = {marginRight: '-130px', marginLeft: '80px'};

    const { name, email, phone, type } = contact;

    const onChange = e => setContact({
        ...contact, [e.target.name] : e.target.value
    });

    const onSubmit = e => {
       e.preventDefault();
       if(current === null) {
        addContact(contact);
       } else{
           updateContact(contact);
           clearAll();
       }
    }

    const clearAll = () => {
        clearCurrent();
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-primary text-center'>{ current? 'Edit Contact' : 'Add A Contact' }</h2>
            <input style={inputStyle} className='form-control' type='text' placeholder='Name' name='name' value={name} onChange={onChange} />
            <input style={inputStyle} className='form-control' type='text' placeholder='Email' name='email' value={email} onChange={onChange} />
            <input style={inputStyle} className='form-control' type='text' placeholder= 'Phone' name='phone' value={phone} onChange={onChange} />
            <h5 className='text-center'>Contact Type</h5>
            <input style={radioStyle} type='radio' name='type' value='personal' checked={type === 'personal'} onChange={onChange} />Personal{' '}<br/>
            <input style={radioStyle} type='radio' name='type' value='professional' checked={type === 'professional'} onChange={onChange} /> Professional{' '}
           <div>
            <input type='submit' value={current? 'Update Contact' : 'Add Contact'} className=' btn btn-primary btn-block' />
            </div>
            {current && <div>
              <button className='btn btn-light btn-block' onClick={clearAll}>Clear</button>
                </div>}
        </form>
    )
}

export default ContactForm
