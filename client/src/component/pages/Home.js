import React, { useContext, useEffect } from 'react'
import Contacts from '../contacts/Contacts'
import ContactForm from '../contacts/ContactForm'
import ContactFiltered from '../contacts/ContactFilter'
import AuthContext from '../../context/auth/authContext'

const Home = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
        //eslint-disable-next-line
    }, []);

    return (
        <div className='home-cont'>
            <div className="dash-cont">
                <div>
                <ContactForm />
                </div>
                <div>
                    <ContactFiltered />
                    <Contacts />
                </div>
            </div>
        </div>
    )
}

export default Home
