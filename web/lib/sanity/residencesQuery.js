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
    portfolio, 
    instagram,
    "imageUrl": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
    "slug": slug.current,
  }
  // *[$slug in residenceData[].slug.current][0] {
  //   _id,
  //   "person": residenceData[slug.current == $slug][0] {
  //     _key,
  //     title, 
  //     type,
  //     bio,
  //     photoCredit,
  //     contributions[]->{
  //       "imageUrl": mainImage.asset->url,
  //       "lqip": mainImage.asset->metadata.lqip,
  //       slug,
  //     },
  //     portfolio, 
  //     instagram,
  //     "imageUrl": mainImage.asset->url,
  //     "lqip": mainImage.asset->metadata.lqip,
  //     "slug": slug.current,
  //   }
  // }
`;

export const residencesParentQuery = groq`
  *[_type == "artistesEnResidence"] {
    _id,
    title,
    "slug": slug.current,
  }
`;
export const residencesTextQuery = groq`
  *[_type == "texteDePresentation"] {
    // texteDePresentationData[]->{
    //   _id,
    //   associatedArtist,
    //   associatedNumero,
    //   author,
    //   body,
    //   "slug": slug.current,
    // },
    _id,
    title,
    associatedArtist,
    associatedNumero[0]->{
      "slug": slug.current,
      number
    },
    author,
    body,
    "slug": slug.current,
  }
`;

