import groq from "groq";

// Match the content to the slug that was clicked on
export const nouvellesQuery = groq`
  *[_type == "nouvelles" && slug.current == $slug][0]{
    _id,
    title,
    publishedAt,
    "slug": slug.current,
    "categories": category[]->{title, slug},
    "imageUrl": mainImage.asset->url,
    body,
  }
`;

// Display all articles of type "nouvelles"
export const nouvellesListQuery = groq`
  *[_type == "nouvelles"]{
    _id,
    title,
    publishedAt,
    "category": categories[]->{title, color},
    "slug": slug.current,
    "imageUrl": mainImage.asset->url,
  }
`;

// Display all articles, except for the featured one
export const nouvellesListHomepageQuery = groq`
  *[_type == "nouvelles" && !defined(featured)]{
    _id,
    title,
    publishedAt,
    "category": categories[]->{title, color},
    "slug": slug.current,
    "imageUrl": mainImage.asset->url,
  }
`;

// Query for only the featured article on the home page.
export const nouvellesFeaturedQuery = groq`
  *[_type == "nouvelles" && featured == true]{
    _id,
    title,
    publishedAt,
    "category": categories[]->{title, color},
    "slug": slug.current,
    "imageUrl": mainImage.asset->url,
  }[0]
`;
