import MailchimpSubscribe from "react-mailchimp-subscribe";
import NewsletterForm from "./newsletterForm";

const MailchimpFormContainer = () => {
  const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL;
  // component structure taken from here https://dev.to/gedalyakrycer/create-an-email-list-with-react-mailchimp-965
  // and here for NewsletterForm https://imranhsayed.medium.com/adding-mailchimp-subscribe-newsletter-in-next-js-react-application-7c776daae710
  return (
    <MailchimpSubscribe
      url={MAILCHIMP_URL}
      render={({ subscribe, status, message }) => {
        return (
          <NewsletterForm
            status={status}
            message={message}
            onValidated={(formData) => subscribe(formData)}
          />
        );
      }}
    />
  );
};

export default MailchimpFormContainer;
