import groq from "groq";

// Query for Active residencies. If multiple are active, only select the first.
export const activeResidenciesQuery = groq`
  *[_type == "residences" && active != false] | order(year desc)[0] {
    residencesData[] {
      _id,
      title, 
      type,
      "imageUrl": mainImage.asset->url,
      "lqip": mainImage.asset->metadata.lqip,
    },
    year, 
  }
`;

// Query for residencies page
export const residenciesPageQuery = groq`
  *[_type == "residences" && active != false] | order(year desc)[0] {
    residencesData[] {
      _id,
      title, 
      type,
      shortBio,
      instagram,
      portfolio,
      "imageUrl": mainImage.asset->url,
      "lqip": mainImage.asset->metadata.lqip,
    },
    year, 
  }
`;

// Query for NON-ACTIVE residencies. AKA ones for the Archive
export const residencesArchiveQuery = groq`
  *[_type == "residences" && active != true] | order(year desc) {
    _id,
    residencesData[] {
      title, type
    },
    year, 
  }
`;

// Query for an individual person's page

// "imageUrl": mainImage.asset->url,
// "lqip": mainImage.asset->metadata.lqip,
// "slug": slug.current,
