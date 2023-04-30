import axios from "axios";
import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import { authActions } from "../Store/AuthSlice";
import { useDispatch } from "react-redux";
import { EditorState } from "draft-js";
import { convertToRaw } from "draft-js";


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


  async  function submitHandler(event){
        event.preventDefault();

        const receiverEmail=emailRef.current.value;
        const enteredSubject=subjectRef.current.value;

        const mailBody =  convertToRaw(editorState.getCurrentContent()).blocks[0].text;

        const userEmail=localStorage.getItem('email');

        const sender=userEmail.replace(/[@.]/g,'');

        const receiver=receiverEmail.replace(/[@.]/g,'');


        const sentData={
            receiver:receiverEmail,
            subject:enteredSubject,
            body:mailBody
        }

        const receivedData={
            sender:userEmail,
            subject:enteredSubject,
            body:mailBody
        }



        setEditorState(EditorState.createEmpty());

        sendMail(sender,receiver,sentData,receivedData).then(()=>{
            setEditorState(EditorState.createEmpty())})
    }

    return(
        <div>
        <Button variant="danger" style={{float:'right',fontWeight:'bolder'}} onClick={()=>{dispatch(authActions.logout())}}>Logout</Button>
        <h2 style={{fontFamily:'cursive',textAlign:'left'}}> Welcome to your mail box!!!</h2>
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