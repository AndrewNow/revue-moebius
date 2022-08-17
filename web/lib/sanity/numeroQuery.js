import groq from "groq";

// Match the content to the slug that was clicked on
export const numeroQuery = groq`
  *[_type == "numero" && slug.current == $slug][0]{
    _id,  
    title, 
    number,
    secondaryNumber,
    "image": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
    "slug": slug.current,
    price,
    available,
    publishedAt,
    directedBy,
    isbn,
    pages,
    authors,
    codirectors,
    body,
    currency
  }
`;

// Query for the feature hero on the home page
export const numeroHomepageQuery = groq`
 *[_type == "numero"] | order(number desc) {
    _id,  
    title, 
    number,
    secondaryNumber,
    "slug": slug.current,
    "image": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
  }[0]
`;

// Query 7 articles for the homepage Numeros carousel
export const numeroHomepageCarouselQuery = groq`
 *[_type == "numero"] | order(number desc)[0..7] {
    _id,  
    title, 
    number,
    publishedAt,
    "slug": slug.current,
    "image": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
  }
`;

// Query for numeros page
// Only take the data we'll need to render the grid 

export const numeroPageQuery = groq`
 *[_type == "numero"] | order(number desc) {
    _id,  
    "id": _id,
    title, 
    number,
    secondaryNumber,
    "image": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
    "slug": slug.current,
  }
`;

export const numeroVenteQuery = groq`
 *[_type == "numero"] | order(number desc) {
    _id,  
    "id": _id,
    "name": title,
    title, 
    number,
    secondaryNumber,
    "image": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
    "slug": slug.current,
    price,
    available,
    currency
  }
`;


// Query for read more articles, showing results that are not equal to the current article
export const numeroReadMoreQuery = groq`
 *[_type == "numero" && !(slug.current == $slug)] | order(number desc) {
    _id,  
    title, 
    number,
    secondaryNumber,
    "image": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
    "slug": slug.current,
    price,
    available,
    publishedAt,
    directedBy,
    isbn,
    pages,
    authors,
    codirectors,
    body,
    currency
  }
`;

// Query for all numeros for use-shopping-cart
// note the "name" entry - we need this because the product data from Sanity
// needs to match how use-shopping-cart wants the data on validateCartItems()
export const numeroListQuery = groq`
 *[_type == "numero"] | order(number desc) {
    _id,  
    "id": _id,
    "name": title,
    title, 
    number,
    secondaryNumber,
    "image": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
    "slug": slug.current,
    price,
    available,
    publishedAt,
    directedBy,
    isbn,
    pages,
    authors,
    codirectors,
    body,
    currency
  }
`;

export const allPurchasableProductQuery = groq`
   *[_type in ["numero", "abonnements", "boutique"]] | order(number desc) {
    _id,  
    "id": _id,
    "name": title,
    title, 
    number,
    secondaryNumber,
    // "imageUrl": mainImage.asset->url,
    "image": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
    "slug": slug.current,
    price,
    available,
    publishedAt,
    directedBy,
    isbn,
    pages,
    authors,
    codirectors,
    body,
    currency,
    type,
    duration,
    location
  }
`;
