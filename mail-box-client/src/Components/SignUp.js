import {  useRef } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function SignUp(){

    const emailRef=useRef('');
    const passwordRef=useRef('');
    const confirmPasswordRef=useRef('');

    function submitHandler(event){
        event.preventDefault();
        const enteredEmail=emailRef.current.value;
        const enteredPassword=passwordRef.current.value;
        const enteredConfirmPassword=confirmPasswordRef.current.value;

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBwXOwAnBdsjBSzz1ZdEKkrlHZWgkiUiC8',
            {
              method:'POST',
              body:JSON.stringify({
                email:enteredEmail,
                password:enteredPassword,
                returnSecureToken:true
              }),
                headers:{
                  'Content-Type':'application/json'
              }
            }).then(response=>{
              if(response.ok && enteredPassword===enteredConfirmPassword){
                 return response.json();
              }
              else{
                return response.json().then(()=>{
                  let errormessage='Authentication Failed!';
                  throw new Error(errormessage);
                  })
              }
            }).then((data)=>{console.log(`${data.email} User has successfully signed up`);}).catch(err=>{alert(err.message)})
    }

    return(
        <Card style={{ width: '23rem' ,border:'2px solid black',margin:'14rem auto'}}>
            <Form className='mt-3' onSubmit={submitHandler}>
                <h1 style={{textAlign:'center'}}>Sign up</h1>
                <Form.Group className="mb-3">
                <Form.Control  type="email" placeholder="Email" required ref={emailRef}/>
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Control type="password" placeholder="Password" minLength="8" required ref={passwordRef}/>
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Control type="password"  placeholder="Confirm Password" required ref={confirmPasswordRef}/>
                </Form.Group>
    
                <Button style={{marginLeft:'3.6cm',marginBottom:'5px'}} variant='primary' type='submit'>Sign up</Button>
            </Form>
            <h6 style={{textAlign:'center'}}>Already have an account?<NavLink to='/login'>Login</NavLink></h6>
        </Card>
    
    )
}