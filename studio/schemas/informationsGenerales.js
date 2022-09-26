export default {
  name: "informationsGenerales",
  type: "document",
  title: "Informations générales",
  fields: [
    {
      name: "mediaKit",
      type: "file",
      title: "Kit média",
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
              validation: (Rule) => Rule.required(),
            },
            {
              type: "image",
              name: "partnerLogo",
              title: "Logo du partenaire",
              description: "Soumettez le logo d'un partenaire ici.",
              validation: (Rule) => Rule.required(),
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
