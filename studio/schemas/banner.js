export default {
  name: "banner",
  title: "Contenu pour la bannière d'alerte",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Contenu",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "link",
      title: "Lien interne",
      description:
        "Pour créér un lien, copier la partie du lien qui suit notre nom de domaine, ex: /numeros/il-faut-que-tu-ruines-tout, et non revuemoebius.com/numeros/il-faut-que... etc.",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
};
