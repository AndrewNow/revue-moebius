export default {
  name: "boutique",
  title: "Boutique",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titre",
      type: "string",

      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Briève description",
      description: "Idéalement pas plus que 2 phrases",
      type: "string",

      validation: (Rule) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "Image de couverture",
      type: "image",
      options: {
        hotspot: true,
      },

      validation: (Rule) => Rule.required(),
    },
    {
      name: "price",
      title: "Prix",
      description:
        "Ajoutez les sous sous forme de zéros, par ex: 1799 = 17.99$.",
      type: "string",
      options: {
        hidden: true,
      },

      validation: (Rule) => Rule.required(),
    },
    {
      name: "currency",
      title: "Devise",
      description:
        "**IMPORTANT**: Conservez ce champ de données défini sur « cad ». Ceci est nécessaire pour Stripe. La page de vente générera probablement une erreur si elle n'est pas définie sur cad.",
      type: "string",
      intialValue: "cad",

      validation: (Rule) => Rule.required(),
    },
    {
      name: "available",
      title: "En vente?",
      description: "Si vert, l'article en question est disponible à la vente.",
      type: "boolean",
      initialValue: true,
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "Date de l'évenement",
      description: "Le cas échéant.",
      type: "date",
    },
    {
      name: "body",
      title: "Contenu",
      description:
        "Pour un sauter une ligne/créér un nouveau paragraphe, assurez-vous d'appuyer deux fois sur le bouton « enter ». Si vous n'appuyez qu'une seule fois sur « enter », le fichier markdown ne saura pas créer une nouvelle ligne.",
      type: "blockContent",
    },
  ],
  initialValue: {
    currency: "cad",
  },
  orderings: [
    {
      title: "Numéro d'édition",
      name: "numberOrderDesc",
      by: [{ field: "number", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      subtitle: "number",
    },
  },
};
