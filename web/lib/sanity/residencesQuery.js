import groq from "groq";

export const homepageResidenciesQuery = groq`
*[_type == "residences" && active != false] | order(year desc)[0] {
    _id,
    residenceData[]-> {
      _key,
      title, 
      type,
      "imageUrl": mainImage.asset->url,
      "lqip": mainImage.asset->metadata.lqip,
      "slug": slug.current,
    },
  }
`;

// Query for Active residencies. If multiple are active, only select the first.
export const activeResidenciesQuery = groq`
  *[_type == "residences" && active != false] | order(year desc)[0] {
    _id,
    residenceData[]->{
      _key,
      title, 
      type,
      shortBio,
      instagram,
      portfolio,
      "imageUrl": mainImage.asset->url,
      "lqip": mainImage.asset->metadata.lqip,
      "slug": slug.current,
    },
    year, 
  }
`;

// Query for NON-ACTIVE residencies. AKA ones for the Archive
export const residencesArchiveQuery = groq`
  *[_type == "residences" && active != true] | order(year desc) {
    _id,
    residenceData[]->{
      _key, title, type,
      "slug": slug.current,
    },
    year, 
  }
`;

// Query for residencies page of a given artist
export const residenciesPageQuery = groq`
  *[_type == "artistesEnResidence" && slug.current == $slug][0] {
    _id,
    title, 
    type,
    bio,
    photoCredit, 
    texteDePresentationData[0]->{
      _id,
      associatedArtist,
      associatedNumero,
      author,
      body,
      "slug": slug.current,
    },
    contributions[]->{
      "imageUrl": mainImage.asset->url,
      "lqip": mainImage.asset->metadata.lqip,
      slug,
    },
    contributionsEcrivain[]->{
      "slug": slug.current,
      title
    },
    portfolio, 
    instagram,
    "imageUrl": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
    "slug": slug.current,
  }
`;

export const residencesTextQuery = groq`
  *[_type == "texteDePresentation"] {
    _id,
    title,
    associatedArtist[0]->{
      "slug": slug.current,
      title,
    },
    associatedNumero[0]->{
      "slug": slug.current,
      number
    },
    author,
    body,
    "slug": slug.current,
  }
`;

export const residencesEcrivainQuery = groq`
  *[_type == "contributionsEcrivain" && defined(slug.current)] {
    _id,
    title,
    associatedArtist[0]->{
      "slug": slug.current,
      title,
    },
    associatedNumero[0]->{
      "slug": slug.current,
      number
    },
    body,
    "slug": slug.current,
  }
`;
