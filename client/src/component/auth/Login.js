import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';


const Login = (props) => {

    const authContext = useContext(AuthContext);
    const { login, error, clearErrors, isAuthenticated } = authContext;

    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    useEffect(() => {
        if(isAuthenticated) {
            props.history.push('/')
        }
        if(error === 'Invalid Credentials') {
            setAlert(error, 'danger');
            clearErrors()}
        //eslint-disable-next-line
        }, [isAuthenticated]);

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const { email, password } = user;

    const onChange = e => 
        setUser({
            ...user, [ e.target.name ]: e.target.value
        });

    const onSubmit = e => {
        e.preventDefault();
        if(email === '' || password === '') {
            setAlert('Please fill in all fields', 'danger')
        } else{
            login({
           email,
           password
       })
      }
    }

    const inputStyle = {marginLeft: '20px'}
    


    return (
        <div className="auth-body">
        <div className='form-container'>
            <h1 className='text-center title'>
                Account <span className='text-warning'>Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='email'>Email:</label>
                    <input style={inputStyle} type='email' name='email' value={email} onChange={onChange} required/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password:</label>
                    <input style={inputStyle} type='password' name='password' value={password} onChange={onChange} required/>
                </div>
                <input type='submit' value='Login' className='btn btn-secondary btn-block' />
            </form>
        </div>
        </div>
    )
}

export default Login