import groq from "groq";


// Query for all numeros for the archive page (only need title + number + image)
export const archiveListQuery = groq`
 *[_type == "archive"] | order(number desc) {
    _id,  
    title, 
    number,
    "imageUrl": mainImage.asset->url,
    "slug": slug.current,
  }
`;


// // Query for all numeros
// export const archiveListQuery = groq`
//  *[_type == "archive"] | order(number desc) {
//     _id,  
//     title, 
//     number,
//     "imageUrl": mainImage.asset->url,
//     "slug": slug.current,
//     publishedAt,
//     directedBy,
//     isbn,
//     pages,
//     authors,
//     codirectors,
//     body
//   }
// `;
