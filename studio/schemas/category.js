export default {
  name: "category",
  title: "Catégories d'articles",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Catégorie d'article",
      type: "string",
    },
    {
      name: "color",
      title: "Couleur de tag (format Hex, ex: #ffffff)",
      description: "Ne pas changer!",
      type: "colorPicker",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
};
