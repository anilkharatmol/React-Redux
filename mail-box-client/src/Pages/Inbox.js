import { Button, Card, Container, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

async function getMails(email) {
  let emailID = email;
  emailID = emailID.replace(/[.@]/g, "");

  try {
    const userEmail = localStorage.getItem("email");

    if (userEmail !== email) {
      return;
    }
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

const Inbox = () => {
  const receiver = useSelector((state) => state.auth.receiverEmailId);
  const [recievedMailsList, setRecievedMailsList] = useState({});

  
  const Emails = [];
  for (let key in recievedMailsList) {
    const id = key;
    const subject = recievedMailsList[key].subject;
    const receivedFrom = recievedMailsList[key].sender;
    const body=recievedMailsList[key].body;
    Emails.push(
      <ListGroup key={id}>
        Received From:{receivedFrom}
        <ListGroup.Item><h1>{subject}</h1>
        <p>{body}</p></ListGroup.Item>{" "}
      </ListGroup>
    );
  }
  useEffect(() => {
    getMails(receiver).then((data) => {
      setRecievedMailsList(data);
    });
  }, [receiver]);

  console.log(recievedMailsList);

  return (
    <>
    <Button   variant="info"><NavLink to='/homepage'>Compose</NavLink></Button>
      <Container>
        <Card style={{ padding: "40px", margin: "40px" }}>
          <Card.Title> My Inbox</Card.Title>
          <Card.Body>{Emails}</Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Inbox;
