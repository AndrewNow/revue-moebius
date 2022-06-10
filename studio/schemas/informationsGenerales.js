export default {
  name: "informationsGenerales",
  type: "document",
  title: "Informations Générales",
  fields: [
    {
      name: "url",
      type: "url",
      title: "Footer images",
    },
    {
      name: "Partenaires",
      title: "Logos des partenaires",
      description: "Ajouter des partenaires pour le footer du site ci-dessous.",
      type: "array",
      of: [
        {
          type: "object",
          name: "partner info",
          fields: [
            {
              type: "string",
              name: "partnershipName",
              title: "Nom du partenaire",
            },
            {
              type: "image",
              name: "partnerLogo",
              title: "Logo du partenaire",
              description: "Soumettez le logo d'un partenaire ici.",
            },
          ],
          preview: {
            select: {
              title: "partnershipName",
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
    },
  },
};
