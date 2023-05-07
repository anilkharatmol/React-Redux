import { Badge, Button, Card, Container, Image, ListGroup } from "react-bootstrap";
import {  useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { authActions } from "../Store/AuthSlice";

async function getMails(email) {

  let emailID = email;
  emailID = emailID.replace(/[.@]/g, "");
  console.log(emailID);

  try {
    // const userEmail = localStorage.getItem("email");

    // if (userEmail !== email) {
    //   return;
    // }

    const response = await fetch(
      `https://mailbox-client-30171-default-rtdb.firebaseio.com/mailbox/${emailID}/receivedmails.json`
    );
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    alert(error);
  }
}

async function deleteMail(receiver,id){
  await fetch(`https://mailbox-client-30171-default-rtdb.firebaseio.com/mailbox/${receiver.replace(/[.@]/g,"")}/receivedmails/${id}.json`,{
    method:'DELETE'
  })


}



const Inbox = () => {
  const history=useHistory();
  const dispatch=useDispatch();
  const receiver = useSelector(state=>state.auth.email);
  const [recievedMailsList, setRecievedMailsList] = useState({});



  useEffect(() => {
   const i= setInterval(()=>{
      getMails(receiver).then((data) => {
        setRecievedMailsList(data);
      });
    },2000)
    return()=>clearInterval(i)
   
  }, [receiver]);


 const deleteEmailHandler = async(id) => {
  await deleteMail(receiver, id);
 setRecievedMailsList(prev => {
   delete prev[id] ;
   return {...prev}
 });
};
 

let count=0;  
  
  const Emails = [];
  for (let key in recievedMailsList) {
    const id = key;
    const subject = recievedMailsList[key].subject;
    const receivedFrom = recievedMailsList[key].sender;
    const read=recievedMailsList[key].read;

    if(!read){count++}

    Emails.push(
      <ListGroup key={id} id={id}>
        Received From:{receivedFrom}
        <ListGroup.Item style={{cursor:'pointer'}} onClick={()=>{history.replace(`/${id}`)
     dispatch(authActions.Inbox()) }}>
        {!read && <Image style={{width:'20px',height:'20px'}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Location_dot_blue.svg/96px-Location_dot_blue.svg.png"/>} 
          <h1>{subject}</h1>
      </ListGroup.Item>
      <Button variant="danger" style={{float:"right",width:'20%'}} onClick={()=>{deleteEmailHandler(id)}}>Delete</Button>
      </ListGroup>
    );
  }

 
 


  return (
    <>
    <Button   variant="info"><NavLink to='/homepage'>Compose</NavLink></Button>
      <Container>
        <Card style={{ padding: "40px", margin: "40px" }}>
            <Card.Title> My Inbox <Badge>{count}</Badge></Card.Title>
          <Card.Body>{Emails}</Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Inbox;





