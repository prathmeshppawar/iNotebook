import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const [creds, setCreds] = useState({email:"", password:""})
    let navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:4000/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: creds.email, password: creds.password})
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            //redirect
            localStorage.setItem('token', json.authToken);
            navigate("/");
          }else{
            alert("Invalid Creds");
          }
    }
    const handleChange = (e) =>{
        setCreds({...creds, [e.target.name]: e.target.value})
    }
    return (
        <div className='my-2'>
            <h2>Login to continue to iNotebook</h2>
            <form className='my-2' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={creds.email} onChange={handleChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={creds.password} onChange={handleChange} id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
