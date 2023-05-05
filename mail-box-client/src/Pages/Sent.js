import { Button, Card, Container, Image, ListGroup } from "react-bootstrap";
import {  useDispatch } from "react-redux";
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
    const response = await fetch(
      `https://mailbox-client-30171-default-rtdb.firebaseio.com/mailbox/${emailID}/sentmails.json`
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

async function deleteMail(sender,id){
  await fetch(`https://mailbox-client-30171-default-rtdb.firebaseio.com/mailbox/${sender.replace(/[.@]/g,"")}/sentmails/${id}.json`,{
    method:'DELETE'
  })


}



const Sent = () => {
  const dispatch=useDispatch();  
  const history=useHistory();
  const userEmail = localStorage.getItem("email");

  const [sentMailsList, setSentMailsList] = useState({});



  useEffect(() => {
    getMails(userEmail).then((data) => {
      setSentMailsList(data);
    });
  }, [userEmail]);


 const deleteEmailHandler = async(id) => {
    await deleteMail(userEmail, id);
   setSentMailsList(prev => {
     delete prev[id] ;
     return {...prev}
   });
  };

  
  
  const Emails = [];
  for (let key in sentMailsList) {
    const id = key;
    const subject = sentMailsList[key].subject;
    const sentTo = sentMailsList[key].receiver;
    const read=sentMailsList[key].read;


    Emails.push(
      <ListGroup key={id} id={id}>
        sent to:{sentTo}
        <ListGroup.Item style={{cursor:'pointer'}} onClick={()=>{history.replace(`/${id}`)
    dispatch(authActions.Sent())}}>
        {!read && <Image style={{width:'20px',height:'20px'}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Location_dot_blue.svg/96px-Location_dot_blue.svg.png"/>} 
          <h1>{subject}</h1>
      </ListGroup.Item>
      <Button variant="danger" style={{float:"right",width:'20%'}} onClick={()=>{deleteEmailHandler(id)}}>Delete</Button>
      </ListGroup>
    );
  }
 


  return (
    <>
    <Button  variant="info"><NavLink to='/homepage'>Compose</NavLink></Button>
      <Container>
        <Card style={{ padding: "40px", margin: "40px" }}>
            <Card.Title> Sent Mails</Card.Title>
          <Card.Body>{Emails}</Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Sent;
