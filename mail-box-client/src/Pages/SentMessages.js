import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useState , useEffect } from 'react';
import { useSelector } from 'react-redux';
async function getMessage(email , id){
    let sender = email ;
    sender = sender.replace(/[.@]/g, "")

     const unreadRes =  await fetch(`https://mailbox-client-30171-default-rtdb.firebaseio.com/mailbox/${sender}/sentmails/${id}.json`,{
          method:'PATCH',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({read : true})
        })
      const unreadData = await unreadRes.json()
      console.log(unreadData)  
      const response =  await fetch(`https://mailbox-client-30171-default-rtdb.firebaseio.com/mailbox/${sender}/sentmails/${id}.json`)
      const data = await response.json();
      console.log(data);
      return data ;

  }


function SentMessages() {

  const [message , setMessage] = useState({})
  const userEmail = useSelector(state=>state.auth.email);
  const param = useParams()
  const id = param.id ;
  useEffect(()=>{
    getMessage(userEmail , id).then(data=>{
        setMessage(data)
    })
  },[userEmail , id])


  return (
          <Card >
            <Card.Header>Sent to: {message.receiver}</Card.Header>
            <Card.Body>
              <Card.Title> <h2>{message.subject}</h2></Card.Title>
              <Card.Text>{message.body}</Card.Text>
            </Card.Body>
          </Card>

  );
}

export default SentMessages ;