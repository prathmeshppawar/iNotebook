import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [creds, setCreds] = useState({name:"", email:"", password:"", cpassword:""})
    let navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:4000/api/auth/createuser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: creds.name, email: creds.email, password: creds.password})
          });
          const json = await response.json();
          console.log(json);
          if(json.success===0){
            //redirect
            localStorage.setItem('token', json.authToken);
            navigate("/");
          }else if(json.success===1){
            alert(json.errors[0].msg);
            console.log(json.errors);
          }else if(json.success===2){
            alert(json.error);
          }
    }
    const handleChange = (e) =>{
        setCreds({...creds, [e.target.name]: e.target.value})
    }
  return (
    <div className='my-2'>
        <h2>Create an account to use iNotebook</h2>
            <form className='my-2' onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name </label>
                    <input type="text" className="form-control" id="name" name='name' value={creds.name} required minLength={3} onChange={handleChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={creds.email} required onChange={handleChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={creds.password} required minLength={5} onChange={handleChange} id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name='cpassword' value={creds.cpassword} required minLength={5} onChange={handleChange} id="cpassword" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
  )
}

export default Signup
