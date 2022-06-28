import groq from "groq";

// Match the content to the slug that was clicked on
export const baladoQuery = groq`
  *[_type == "balado" && slug.current == $slug][0]{
    _id,  
    title, 
    number,
    "imageUrl": mainImage.asset->url,
    "slug": slug.current,
    publishedAt,
    body,
    embed,
  }
`;

// Query for all balados for the balados page (only need title + number + image)
export const baladoListQuery = groq`
 *[_type == "balado"] | order(number desc) {
    _id,  
    title, 
    number,
    "imageUrl": mainImage.asset->url,
    "slug": slug.current,
    publishedAt,
  }
`;
