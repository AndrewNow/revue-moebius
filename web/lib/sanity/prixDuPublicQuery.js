import groq from "groq";

// Match the content to the slug that was clicked on
export const prixDuPublicQuery = groq`
  *[_type == "prixDuPublic" && slug.current == $slug][0]{
    _id,
    title,
    author,
    "slug": slug.current,
    associatedNumero[]->{number, slug},
    associatedNouvelles[]->{slug},
    body,
  }
`;

// Display all articles of type "prixDuPublic"
export const prixDuPublicListQuery = groq`
  *[_type == "prixDuPublic"]{
    _id,
    title,
    author,
    "slug": slug.current,
    associatedNumero[]->{number, slug},
    associatedNouvelles[]->{slug},
    body,
  }
`;

