import groq from "groq";

export const categoryQuery = groq`
  *[_type == "category"] | order(_updatedAt desc){
    title,
    color
  } 
`;
