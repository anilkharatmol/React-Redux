import { Badge, Button, Card, Container, Image, ListGroup } from "react-bootstrap";
import {  useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { authActions } from "../Store/AuthSlice";
import useFetch from "../Hooks/useFetch";

// async function getMails(email) {

//   let emailID = email;
//   emailID = emailID.replace(/[.@]/g, "");
//   console.log(emailID);

//   try {
//     const response = await fetch(
//       `https://mailbox-client-30171-default-rtdb.firebaseio.com/mailbox/${emailID}/receivedmails.json`
//     );
//     const data = await response.json();
//     console.log(data);
//     if (!response.ok) {
//       throw new Error(data.error);
//     }
//     return data;
//   } catch (error) {
//     alert(error);
//   }
// }

async function deleteMail(receiver,id){
  await fetch(`https://mailbox-client-30171-default-rtdb.firebaseio.com/mailbox/${receiver}/receivedmails/${id}.json`,{
    method:'DELETE'
  })


}



const Inbox = () => {
  const history=useHistory();
  const dispatch=useDispatch(); 
  const receiver =localStorage.getItem('email');
  // const [receivedMailsList, setReceivedMailsList] = useState({});



  // useEffect(() => {
  //  const i= setInterval(()=>{
  //     getMails(receiver).then((data) => {
  //       setRecievedMailsList(data);
  //     });
  //   },2000)
  //   return()=>clearInterval(i)
   
  // }, [receiver]);

 let emailID = receiver.replace(/[.@]/g, "");

 

const [data]=useFetch(`https://mailbox-client-30171-default-rtdb.firebaseio.com/mailbox/${emailID}/receivedmails.json`);
  
  console.log(data);


 const deleteEmailHandler = async(id) => {
  await deleteMail(emailID, id);
   delete data[id] ;
   return {...data}
}
 

let count=0;  
  
  const Emails = [];
  for (let key in data) {
    const id = key;
    const subject = data[key].subject;
    const receivedFrom = data[key].sender;
    const read=data[key].read;

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





