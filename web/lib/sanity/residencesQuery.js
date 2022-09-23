import groq from "groq";

// Query for Active residencies. If multiple are active, only select the first.
export const activeResidenciesQuery = groq`
  *[_type == "residences" && active != false] | order(year desc)[0] {
    _id,
    residencesData[] {
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

// Query for residencies page
export const residenciesPageQuery = groq`
  *[$slug in residencesData[].slug.current][0] {
    _id,
    "person": residencesData[slug.current == $slug][0] {
      _key,
      title, 
      type,
      "imageUrl": mainImage.asset->url,
      "lqip": mainImage.asset->metadata.lqip,
      "slug": slug.current,
    }
  }
`;

// Query for NON-ACTIVE residencies. AKA ones for the Archive
export const residencesArchiveQuery = groq`
  *[_type == "residences" && active != true] | order(year desc) {
    _id,
    residencesData[] {
      _key, title, type,
      "slug": slug.current,
    },
    year, 
  }
`;

// Query for an individual person's page

// "imageUrl": mainImage.asset->url,
// "lqip": mainImage.asset->metadata.lqip,
// "slug": slug.current,
