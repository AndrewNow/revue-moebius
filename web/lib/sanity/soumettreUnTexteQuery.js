import groq from "groq";

export const soumettreUnTexteQuery = groq`
  *[_type == "soumettreUnTexte"] {
    _id,
    title,
    description,
    'slug': linkToNews->slug.current,
    soumission,
    edition,
    extraInfoTitle,
    extraInfoDescription
  }[0]
`;
