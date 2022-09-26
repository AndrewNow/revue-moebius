export default {
  name: "equipe",
  type: "document",
  title: "Équipe",
  fields: [
    {
      type: "string",
      name: "category",
      title: "Nom du categorie",
      description:
        "Categorie d'équipe, ex: Equipe/Comité de rédaction/Conseil d'administration",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "membres",
      title: "Membres de l'équipe",
      description: "Ajouter des membres de l'équipe du site ci-dessous.",
      type: "array",
      of: [
        {
          type: "object",
          name: "membresData",
          fields: [
            {
              type: "string",
              name: "name",
              title: "Nom du membre",
              validation: (Rule) => Rule.required(),
            },
            {
              type: "string",
              name: "position",
              title: "Position du membre",
            },
            {
              type: "blockContent",
              name: "bio",
              title: "Bio du membre",
              validation: (Rule) => Rule.required(),
            },
            {
              type: "image",
              name: "portrait",
              title: "Portrait",
              description: "En ratio d'aspect 4:5",
            },
            {
              type: "url",
              name: "portfolio",
              title: "Portfolio du membre",
              description: "(optionnel)",
            },
            {
              type: "url",
              name: "instagram",
              title: "Instagram du membre",
              description: "(optionnel)",
            },
          ],
          preview: {
            select: {
              title: "name",
              media: "portrait",
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "category",
    },
  },
};
