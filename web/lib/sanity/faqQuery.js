import groq from "groq";

export const faqQuery = groq`
*[_type=="faq"][0]{
    faqData
  }`;
