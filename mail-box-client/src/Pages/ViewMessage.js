import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState , useEffect } from 'react';
async function getMessage(email , id){
    let receiver = email ;
    receiver = receiver.replace(/[.@]/g, "")

     const unreadRes =  await fetch(`https://mailbox-client-30171-default-rtdb.firebaseio.com/mailbox/${receiver}/receivedmails/${id}.json`,{
          method:'PATCH',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({read : true})
        })
      const unreadData = await unreadRes.json()
      console.log(unreadData)  
      const response =  await fetch(`https://mailbox-client-30171-default-rtdb.firebaseio.com/mailbox/${receiver}/receivedmails/${id}.json`)
      const data = await response.json();
      console.log(data);
      return data ;

  }


function ViewMessage() {

  const [message , setMessage] = useState({})
  const email = useSelector(state=> state.auth.receiverEmailId)
  const param = useParams()
  const id = param.id ;
  useEffect(()=>{
    getMessage(email , id).then(data=>{
        setMessage(data)
    })
  },[email , id])

  return (
 
          <Card >
            <Card.Header>From: {message.sender}</Card.Header>
            <Card.Body>
              <Card.Title> <h2>{message.subject}</h2></Card.Title>
              <Card.Text>{message.body}</Card.Text>
            </Card.Body>
          </Card>

  );
}

export default ViewMessage ;