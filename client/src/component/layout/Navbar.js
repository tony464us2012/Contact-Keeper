import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Authcontext from '../../context/auth/authContext'
import ContactContext from '../../context/contact/contactContext'

const Navbar = ({ title, icon }) => {
    const authContext = useContext(Authcontext);
    const contactContext = useContext(ContactContext);

    const { clearContacts } = contactContext

    const { isAuthenticated, logout, user } = authContext;

    const onLogout = () => {
        logout();
        clearContacts()
    }

    const authLinks = (
        <Fragment>
            <li>Hello { user && user.name }</li>
            <li>
                <a onClick={onLogout} href='#!'>
                    <i className='fas fa-sign-out-alt'></i><span className='hide-sm'>Logout</span>
                </a>
            </li>
        </Fragment>
    );
  
    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/register'>Register</Link> 
            </li>
            <li>
                <Link to='/login'>Login</Link> 
            </li>
        </Fragment>
    );
    const style = {
        backgroundColor: 'brown'
    }

    return (
<div className= "navbar bg-secondary" style= {style}>
            <h1>
                <i className= {icon} /> {title}
            </h1>
            <ul>
              { isAuthenticated ? authLinks : guestLinks }
            </ul>
        </div>
    )
};

Navbar.protoTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
};

Navbar.defaultProps = {
    title: 'Phone Book',
    icon: 'far fa-address-book'
}

export default Navbar