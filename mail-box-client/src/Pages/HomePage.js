import axios from "axios";
import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import { useDispatch, useSelector } from "react-redux";
import { EditorState } from "draft-js";
import { convertToRaw } from "draft-js";
import { NavLink } from "react-router-dom";
import { authActions } from "../Store/AuthSlice";

export default function HomePage(){
    const emailRef=useRef();
    const subjectRef=useRef();

    const dispatch=useDispatch();

    const [editorState,setEditorState]=useState(EditorState.createEmpty());

    async function sendMail(senderEmail, receiverEmail , sentData , receivedData){

            const responseToSender =  await axios.post(`https://mailbox-client-30171-default-rtdb.firebaseio.com/mailbox/${senderEmail}/sentmails.json`,sentData);
            
            await axios.post(`https://mailbox-client-30171-default-rtdb.firebaseio.com/mailbox/${receiverEmail}/receivedmails.json`,receivedData);
          
            console.log(responseToSender,'mail sent suucessfully');    
}


const userEmail=useSelector(state=>state.auth.email);
  async  function submitHandler(event){
        event.preventDefault();

        const receiverEmail=emailRef.current.value;
        const enteredSubject=subjectRef.current.value;

        const mailBody =  convertToRaw(editorState.getCurrentContent()).blocks[0].text;
        
        const sender=userEmail.replace(/[@.]/g,'');

        const receiver=receiverEmail.replace(/[@.]/g,'');


        const sentData={
            receiver:receiverEmail,
            subject:enteredSubject,
            body:mailBody,
            read:false
        }

        const receivedData={
            sender:userEmail,
            subject:enteredSubject,
            body:mailBody,
            read:false
        }



        setEditorState(EditorState.createEmpty());

        sendMail(sender,receiver,sentData,receivedData).then(()=>{
            setEditorState(EditorState.createEmpty())})
    }
    const user=localStorage.getItem('email');

    return(
        <div>
           
        <Button variant="danger" style={{float:'right',fontWeight:'bolder'}} onClick={()=>{dispatch(authActions.logout())}}>Logout</Button>
      <Button  style={{float:'right',fontWeight:'bolder',marginRight:'1cm'}} variant="info">  <NavLink to='/sent'>SENT</NavLink></Button>
      <Button  style={{float:'right',fontWeight:'bolder',marginRight:'1cm'}} variant="info">  <NavLink to='/inbox'>INBOX</NavLink></Button>
        <h2 style={{fontFamily:'cursive',textAlign:'left'}}> Welcome to your mail box!!!</h2> {user}
        <hr></hr> 
        <Form onSubmit={submitHandler}> 
            <Form.Control type="email" placeholder="To"  ref={emailRef}/><hr></hr>
            <Form.Control type="text" placeholder="Subject" ref={subjectRef}/><hr></hr>
        <Editor editorState={editorState}
          onEditorStateChange={(state) => setEditorState(state)}>  </Editor>
            <Button style={{marginLeft:'1rem',marginTop:'1rem',width:'10%'}} type="submit">Send</Button>
        </Form>
        </div>
    )
}