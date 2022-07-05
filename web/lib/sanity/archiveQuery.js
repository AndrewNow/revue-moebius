import groq from "groq";

// Match the content to the slug that was clicked on
export const archiveQuery = groq`
  *[_type == "archive" && slug.current == $slug][0]{
    _id,  
    title, 
    number,
    "imageUrl": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
    "slug": slug.current,
    publishedAt,
    directedBy,
    isbn,
    pages,
    authors,
    codirectors,
    body
  }
`;

// Query for all numeros for the archive page (only need title + number + image)
export const archiveListQuery = groq`
 *[_type == "archive"] | order(number desc) {
    _id,  
    title, 
    number,
    "imageUrl": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
    "slug": slug.current,
  }
`;


// Query for read more articles, only get 3.
export const archiveReadMoreQuery = groq`
 *[_type == "archive" && !(slug.current == $slug)] | order(number desc) {
    _id,  
    title, 
    number,
    "imageUrl": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
    "slug": slug.current,
    publishedAt,
    directedBy,
    isbn,
    pages,
    authors,
    codirectors,
    body
  }
`;

