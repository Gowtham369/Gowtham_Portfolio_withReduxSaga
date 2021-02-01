import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

export default function Contact() {
  const validemail = useSelector((state) => state.validemail);
  const validemailres = useSelector((state) => state.validemailres);
  const validname = useSelector((state) => state.validname);
  const validnameres = useSelector((state) => state.validnameres);
  const validmessage = useSelector((state) => state.validmessage);
  const showSuccess = useSelector((state) => state.contactRequestSuccessStatus);
  const showFail = useSelector((state) => state.contactRequestFailedStatus);

  const dispatch = useDispatch();

  function sendEmail(e) {
    e.preventDefault();
    if (e.target.elements.namedItem("user_name").value === "") {
      dispatch({ type: "INVALID_NAME", payload: "Name is required" });
    } else if (
      !/^[\w-_.]{3,}$/.test(e.target.elements.namedItem("user_name").value)
    ) {
      dispatch({
        type: "INVALID_NAME",
        payload:
          "Name can only have alphabets, numericals, '-', '_' and '.' and should have min length of 3.",
      });
    } else if (e.target.elements.namedItem("user_email").value === "") {
      dispatch({ type: "INVALID_EMAIL", payload: "Email is required" });
      dispatch({ type: "VALID_NAME" });
    } else if (
      !/^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})$/.test(
        e.target.elements.namedItem("user_email").value
      )
    ) {
      dispatch({ type: "INVALID_EMAIL", payload: "Email given is not valid" });
      dispatch({ type: "VALID_NAME" });
    } else if (e.target.elements.namedItem("message").value === "") {
      dispatch({ type: "INVALID_MESSAGE" });
      dispatch({ type: "VALID_NAME" });
      dispatch({ type: "VALID_EMAIL" });
    } else {
      dispatch({ type: "VALID_EMAIL" });
      dispatch({ type: "VALID_MESSAGE" });
      dispatch({ type: "VALID_NAME" });
      /* var thisformData = new FormData();
      thisformData.append(
        "user_name",
        e.target.elements.namedItem("user_name").value
      );
      thisformData.append(
        "user_email",
        e.target.elements.namedItem("user_email").value
      );
      thisformData.append(
        "message",
        e.target.elements.namedItem("message").value
      );
      for (var pair of thisformData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      } */
      dispatch({
        type: "CONTACT_REQUESTED",
        formData: e.target /* thisformData */,
      });
      e.target.reset();
    }
  }
  return (
    <div className="contact" id="contact">
      <div data-aos="fade-right">Get in touch with me</div>
      <Form
        data-aos="fade-up-right"
        className="contact-form"
        onSubmit={sendEmail}
      >
        <Form.Control type="text" placeholder="Name" name="user_name" />
        {validname ? <></> : <div>{validnameres}</div>}

        <Form.Control placeholder="Email" name="user_email" />
        {validemail ? <></> : <div>{validemailres}</div>}
        <Form.Control as="textarea" placeholder="Message" name="message" />
        {validmessage ? <></> : <div>Message cannot be empty</div>}
        {showSuccess ? (
          <Alert dismissible>Contact request Recieved</Alert>
        ) : (
          <></>
        )}
        {showFail ? (
          <Alert dismissible>Contact request failed, Try later.</Alert>
        ) : (
          <></>
        )}

        <Button type="submit" value="Send">
          Submit
        </Button>
      </Form>
    </div>
  );
}
