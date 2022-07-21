import groq from "groq";

export const footerLogoQuery = groq`
*[_type=="informationsGenerales"]{
    Partenaires[] {
      ...,
      "imageUrl": partnerLogo.asset->url,
      "lqip": partnerLogo.asset->metadata.lqip,
      "mediaKitPDF": mediaKit.asset->url
    }
  }`;
