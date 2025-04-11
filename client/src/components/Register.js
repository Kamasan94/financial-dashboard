import axios from "axios";
import React, { useState } from "react";

const Register = ({ setLoggedInUser }) => {

    const [formData, setFormData] = useState({
        username : '',
        password : ''
    });
    const [message, setMessage] = useState('');
    
    const {username, password} = formData;
    
    const onChange = e => setFormData({...formData, [e.target.name] : e.target.value});
    
    const onSubmit = async e => {
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:3000/api/auth/register', {username, password});
            localStorage.setItem('token', res.data.token);
            console.log("Register successfully");
            
        }
        catch(error){
            setMessage(error);
            console.error(error);
        }
    };
    
    
    return (
        <div className="auth-form">
            <h2>Register</h2>
            <form onSubmit={onSubmit}>
                <input type="text"
                    placeholder="Username"
                    value={username}
                    onChange={onChange}
                    name="username"
                    required
                />
                <input type="password"
                    placeholder="Password"
                    value={password}
                    onChange={onChange}
                    name="password"
                    required
                />
                <button type="submit">Register</button>
            </form>
            <p className="message">{message}</p>
        </div>
    );
};

export default Register;