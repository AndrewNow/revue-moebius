import groq from "groq";

// Match the content to the slug that was clicked on
export const baladoQuery = groq`
  *[_type == "balado" && slug.current == $slug][0]{
    _id,  
    title, 
    number,
    secondNumber,
    discussion,
    interviews,
    animation,
    color, 
    textcolor,
    "imageUrl": decorativeImage.asset->url,
    "lqip": decorativeImage.asset->metadata.lqip,
    "slug": slug.current,
    publishedAt,
    body,
    embed,
  }
`;

// Query for all balados for the balados page (only need title + number + image)
export const baladoListQuery = groq`
 *[_type == "balado"] | order(publishedAt desc) {
    _id,  
    title, 
    number,
    secondNumber,
    "imageUrl": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
    "slug": slug.current,
    publishedAt,
  }
`;

// Query for the featured balado on the home page
export const featuredBaladoQuery = groq`
 *[_type == "balado"] | order(publishedAt desc) {
    _id,  
    title,
    number,
    secondNumber,
    embed,
    "imageUrl": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
  }[0]
`;


