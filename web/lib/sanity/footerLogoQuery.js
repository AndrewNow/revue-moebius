import groq from "groq";

export const footerLogoQuery = groq`
*[_type=="informationsGenerales"]{
    Partenaires[] {
      ...,
      "imageUrl": partnerLogo.asset->url,
    }
  }`;
