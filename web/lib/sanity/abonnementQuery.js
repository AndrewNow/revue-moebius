import groq from "groq";

export const abonnementQuery = groq`
 *[_type == "abonnements"] | order(number desc) {
    _id,  
    "id": _id,
    "name": title,
    price,
    currency,
    type,
    duration,
    location
  }
`;
