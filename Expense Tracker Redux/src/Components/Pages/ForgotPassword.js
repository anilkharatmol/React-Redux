import { useState } from 'react';
import classes from '../SignUp/SignUp.module.css';
import { NavLink } from 'react-router-dom';

export default function ForgotPassword(){

    const[isLoading,setIsLoading]=useState(false)

const enteredEmail=localStorage.getItem('email');
    function resetPasswordHandler(event){
        event.preventDefault();

        setIsLoading(true);

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBwXOwAnBdsjBSzz1ZdEKkrlHZWgkiUiC8',{
          method:'POST',
          body:JSON.stringify({
            email:enteredEmail,
            requestType:'PASSWORD_RESET'
          }),
          headers:{
            'Content-Type':'application/json'
          }
        }).then(res=>{setIsLoading(false)
            return res.json()}).then(data=>{console.log(data);})
      }

      return(
        <div className={classes.form}>
            <form onSubmit={resetPasswordHandler}>
                <div className={classes.control}>
                <label htmlFor="email">Enter the email with which you have registered.</label><br></br>
                <input type="email" placeholder='Email'></input>
                </div>
                <div className={classes.actions}>
                    {!isLoading &&<button type='submit'>Send link</button>}
                    {isLoading && <h3>Sending request....</h3>}
                </div>
            </form>
            <h4>Already have an account?<NavLink to='/login'>Login</NavLink></h4>
        </div>
      )
}