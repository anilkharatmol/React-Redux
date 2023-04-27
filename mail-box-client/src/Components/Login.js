import { useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Form,Button,Card } from 'react-bootstrap';


export default function Login(){
    
    const history=useHistory();


    const emailRef=useRef('');
    const passwordRef=useRef('');

    function submitHandler(event){
        event.preventDefault();
        const enteredEmail=emailRef.current.value;
        const enteredPassword=passwordRef.current.value;

        localStorage.setItem('email',enteredEmail);

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBwXOwAnBdsjBSzz1ZdEKkrlHZWgkiUiC8',
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
              if(response.ok){
                 return response.json();
              }
              else{
                return response.json().then(()=>{
                    let errormessage='Authentication Failed!'
                  
                    throw new Error(errormessage);
                    })
               
              }
            }).then((data)=>{localStorage.setItem('token',data.idToken)
               console.log(`User has successfully loggen in`)
            history.replace('/homepage')
         ;}).catch(err=>{alert(err.message)})
        }

        
    return(

<Card style={{ width: '23rem' ,border:'2px solid black',margin:'14rem auto'}}>
            <Form className='mt-3' onSubmit={submitHandler}>
                <h1 style={{textAlign:'center'}}>Login</h1>
                <Form.Group className="mb-3">
                <Form.Control  type="email" placeholder="Email" required ref={emailRef}/>
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Control type="password" placeholder="Password" minLength="8" required ref={passwordRef}/>
          <p style={{textAlign:'center',marginTop:'3px'}}> <NavLink to='/forgotpassword' >Forgot password?</NavLink></p>
                </Form.Group>
                <Button style={{marginBottom:'5px',width:'100%'}} variant='primary' type='submit'>Login</Button>
            </Form>
            <h6 style={{textAlign:'center'}}>Don't have an account?<NavLink to='/'>Signup</NavLink></h6>
        </Card>
    )
}