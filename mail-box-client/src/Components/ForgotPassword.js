import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);

  const enteredEmail = localStorage.getItem("email");
  function resetPasswordHandler(event) {
    event.preventDefault();

    setIsLoading(true);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBwXOwAnBdsjBSzz1ZdEKkrlHZWgkiUiC8",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          requestType: "PASSWORD_RESET",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <Container>
      <Form onSubmit={resetPasswordHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            Enter the email with which you have registered.
          </Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        {!isLoading && <Button type="submit">Send link</Button>}
        {isLoading && <h3>Sending request....</h3>}
      </Form>
      <h4>
        Already have an account?<NavLink to="/login">Login</NavLink>
      </h4>
    </Container>
  );
}
