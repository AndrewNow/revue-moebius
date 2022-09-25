import groq from "groq";

export const soumettreUnTexteQuery = groq`
  *[_type == "soumettreUnTexte"] {
    _id,
    title,
    description,
    'slug': linkToNews->slug.current,
    soumission,
    edition,
    "imageUrl": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
    extraInfoTitle,
    extraInfoDescription
  }[0]
`;
