import groq from "groq";

export const categoryQuery = groq`
 *[_type == "category"] {
    title, color
  }
`