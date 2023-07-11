import groq from "groq";

// Match the content to the slug that was clicked on
export const nouvellesQuery = groq`
  *[_type == "nouvelles" && slug.current == $slug][0]{
    _id,
    title,
    publishedAt,
    hypermediaCreditsReference[]->{
      title, 
      "slug": slug.current
    },
    hypermediaCreditsString,
    hypermediaLink,
    "slug": slug.current,
    "categories": categories[]->{title, slug},
    "imageUrl": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
    body,
  }
`;

// Display all articles of type "nouvelles"
export const nouvellesListQuery = groq`
  *[_type == "nouvelles" ] | order(publishedAt desc) {
    _id,
    title,
    publishedAt,
    "category": categories[]->{title, color},
    "slug": slug.current,
    "imageUrl": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
  }
`;

// Display all articles of type nouvelles that have a category of hypermedia
export const hypermediaListQuery = groq`
 *[_type == "nouvelles" && categories[0]->title == "Hypermédia" ] | order(publishedAt desc) {
    _id,
    title,
    publishedAt,
    hypermediaCreditsReference,
    hypermediaCreditsString,
    "category": categories[]->{title, color},
    "slug": slug.current,
    "imageUrl": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
  }
`;

// Display all articles, except for the featured one
export const nouvellesListHomepageQuery = groq`
  *[_type == "nouvelles" && (!defined(featured) || featured == false)] | order(publishedAt desc) {
    _id,
    title,
    publishedAt,
    "category": categories[]->{title, color},
    "slug": slug.current,
    "imageUrl": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
  }
`;

// Query for only the featured article on the home page.
export const nouvellesFeaturedQuery = groq`
  *[_type == "nouvelles" && featured == true] | order(publishedAt desc) [0] {
    _id,
    title,
    publishedAt,
    featured,
    "category": categories[]->{title, color},
    "slug": slug.current,
    "imageUrl": mainImage.asset->url,
    "lqip": mainImage.asset->metadata.lqip,
  }
`;
