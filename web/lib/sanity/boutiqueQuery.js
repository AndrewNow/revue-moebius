import groq from "groq";

// Match the content to the slug that was clicked on
export const boutiqueQuery = groq`
  *[_type == "boutique" && slug.current == $slug][0]{
    _id, 
    "id": _id, 
    "name": title,
    title,
    description, 
    number,
    "imageUrl": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
    "slug": slug.current,
    price,
    available,
    publishedAt,
    body,
    currency
  }
`;

// Query for all numeros
// note the "name" entry - we need this because the product data from Sanity
// needs to match how use-shopping-cart wants the data on validateCartItems()
export const boutiqueListQuery = groq`
 *[_type == "boutique"] | order(number desc) {
    _id,  
    "id": _id,
    "name": title,
    description,
    title, 
    "imageUrl": mainImage.asset->url,
    "image": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
    "slug": slug.current,
    price,
    available,
    publishedAt,
    body,
    currency
  }
`;
