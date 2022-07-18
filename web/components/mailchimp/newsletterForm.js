import { useState } from "react";
import { decode } from "html-entities";
import styled, { keyframes } from "styled-components";
import { breakpoints } from "../../utils/breakpoints";

const NewsletterForm = ({ status, message, onValidated }) => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);

  //.:*~*:._.:*~*:._.:*~*:._.:*~*
  //
  //  Handle form sumbit
  //
  //.:*~*:._.:*~*:._.:*~*:._.:*~*
  // /**
  //  * @return {{value}|*|boolean|null}
  //  */
  const handleFormSubmit = () => {
    setError(null);
    if (!email) {
      setError("Please enter a valid email address");
      return null;
    }
    const isFormValidated = onValidated({ EMAIL: email });
    // On success return true
    return email && email.indexOf("@") > -1 && isFormValidated;
  };

  //.:*~*:._.:*~*:._.:*~*:._.:*~*
  //
  //  Handle input key event
  //
  //.:*~*:._.:*~*:._.:*~*:._.:*~*
  // /**
  //  * @param event
  //  */
  const handleInputKeyEvent = (event) => {
    setError(null);
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      handleFormSubmit();
    }
  };

  //.:*~*:._.:*~*:._.:*~*:._.:*~*
  //
  //  Extract message from string
  //
  //.:*~*:._.:*~*:._.:*~*:._.:*~*
  // /**
  //  * @param {String} message
  //  * @return {null|*}
  //  */
  const getMessage = (message) => {
    if (!message) {
      return null;
    }
    const result = message?.split("-") ?? null;
    if ("0" !== result?.[0]?.trim()) {
      return decode(message);
    }
    const formattedMessage = result?.[1]?.trim() ?? null;
    return formattedMessage ? decode(formattedMessage) : null;
  };

  //.:*~*:._.:*~*:._.:*~*:._.:*~*
  //
  //  Style bottom bar
  //
  //.:*~*:._.:*~*:._.:*~*:._.:*~*

  // if no error or status, render white
  let statusColor = "var(--static-cream)";
  let textColor = "var(--static-cream)";

  if (status === "error" || error) {
    // if error, make status red
    statusColor = "var(--color-error)";
    textColor = "var(--color-error)";
  }

  if (status === "success") {
    // if success, make status green
    statusColor = "var(--color-success)";
    textColor = "var(--color-success)";
  }

  return (
    <>
      <Flex>
        <Input
          // pass in the value the user has entered (their email)
          onChange={(event) => setEmail(event?.target?.value ?? "")}
          type="email"
          placeholder="Inscrivez-vous à notre infolettre..."
          // in case user hits Enter instead of submit
          onKeyUp={(event) => handleInputKeyEvent(event)}
          style={{
            borderBottom: `1px solid ${statusColor}`,
            color: textColor,
            borderRadius: "0px!important",
            WebkitAppearance: "none",
          }}
        />
        <SubmitButton onClick={handleFormSubmit}>
          <small>S'inscrire</small>
        </SubmitButton>
        <MessageWrapper>
          {status === "sending" && <Sending>Envoi en cours</Sending>}
          {status === "error" || error ? (
            <small>
              <Error
                dangerouslySetInnerHTML={{
                  __html: error || getMessage(message),
                }}
              />
            </small>
          ) : null}
          {status === "success" && status !== "error" && !error && (
            <small>
              <Success dangerouslySetInnerHTML={{ __html: decode(message) }} />
            </small>
          )}
        </MessageWrapper>
      </Flex>
    </>
  );
};

export default NewsletterForm;

const Flex = styled.div`
  display: flex;
  height: 100%;
  position: relative;

  @media (max-width: ${breakpoints.m}px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  width: 65%;
  border: none;
  border-top: 1px solid var(--color-black);
  background: var(--static-black);
  color: var(--static-cream);
  /* border: 1px dotted grey; */
  font-family: "Surt";
  font-size: 3.3333vw;
  line-height: 100%;
  padding: 2rem 3.75vw;
  -webkit-appearance: none;
  -webkit-border-radius: 0;

  ::placeholder {
    color: var(--color-grey) !important;
    margin: 0;
    padding: 0;
    font-size: 3.3333vw;
    line-height: 100%;
    font-family: "Surt";
  }

  @media (max-width: ${breakpoints.m}px) {
    width: 100%;
  }

  @media (max-width: ${breakpoints.s}px) {
    font-size: 22px;
    ::placeholder {
      font-size: 22px;
    }
  }
  @media (max-width: ${breakpoints.xs}px) {
    font-size: 18px;
    ::placeholder {
      font-size: 18px;
    }
  }
`;

const SubmitButton = styled.button`
  color: grey;
  background: none;
  width: 35%;
  cursor: pointer;
  border-top: 1px solid var(--color-black) !important;
  border-left: 1px solid var(--static-cream) !important;
  border-bottom: 1px solid var(--static-cream) !important;
  color: var(--static-cream);
  transition: var(--transition);
  :hover {
    background: var(--color-grey);
  }

  @media (max-width: ${breakpoints.m}px) {
    width: 100%;
    border-bottom: 1px solid var(--static-cream);
    border-left: none !important;
    height: 100%;
  }
`;

const Error = styled.div`
  color: var(--color-error);
`;

const Success = styled.div`
  color: var(--color-success);
`;

const ellipsis = keyframes`
  to {
    width: 40px;    
  }
`;

const Sending = styled.small`
  color: var(--static-cream);
  ::after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    -webkit-animation: ellipsis steps(4, end) 900ms infinite alternate;
    animation: ${ellipsis} steps(4, end) 900ms infinite alternate;
    content: "...";
    width: 0px;
  }
`;

const MessageWrapper = styled.div`
  padding: 0rem 3.75vw;
  margin: 0.5rem 0;
  position: absolute;
  bottom: 0;
  left: 0;
  max-width: 60vw;

  @media (max-width: ${breakpoints.m}px) {
    max-width: none;
    bottom: auto;
    top: 30%;
  }
`;
