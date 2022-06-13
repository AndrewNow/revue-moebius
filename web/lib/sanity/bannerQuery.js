import groq from "groq";

export const bannerQuery = groq`
*[_type=="banner"]{
    title, link
  }[0]`;
