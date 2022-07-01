import groq from "groq";

export const faqQuery = groq`
*[_type=="faq"]{
    faqData
  }`;
