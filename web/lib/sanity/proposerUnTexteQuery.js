import groq from "groq";

export const proposerUnTexteQuery = groq`
    *[_type == "proposerUnTexte"]{
    _id,
    title,
    description,
    linkToNews,
    soumission,
    edition,
    "imageUrl": mainImage.asset->url,
    extraInfoTitle,
    extraInfoDescription
  }[0]
`;
