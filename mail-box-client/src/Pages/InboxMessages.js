import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState , useEffect } from 'react';
async function getData(email , id){
    let receiver = email ;
    receiver = receiver.replace(/[.@]/g, "")

    console.log(receiver);

     const unread =  await fetch(`https://mailbox-client-30171-default-rtdb.firebaseio.com/mailbox/${receiver}/receivedmails/${id}.json`,{
          method:'PATCH',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({read : true})
        })
      const unreadData = await unread.json()
      console.log(unreadData)  
      const response =  await fetch(`https://mailbox-client-30171-default-rtdb.firebaseio.com/mailbox/${receiver}/receivedmails/${id}.json`)
      const data = await response.json();
      console.log(data);
      return data ;

  }


function InboxMessages() {

  const [data , setData] = useState({})
  const email = localStorage.getItem('email');
  const param = useParams()
  const id = param.id ;
  useEffect(()=>{
    getData(email , id).then(data=>{
        setData(data)
    })
  },[email , id])
  

  return (
          <Card >
            <Card.Header>From: {data.sender}</Card.Header>
            <Card.Body>
              <Card.Title> <h2>{data.subject}</h2></Card.Title>
              <Card.Text>{data.body}</Card.Text>
            </Card.Body>
          </Card>
  );
}

export default InboxMessages ;