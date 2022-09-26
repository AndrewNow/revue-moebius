export default {
  name: "numero",
  title: "Numéros",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "number",
      title: "Numéro d'édition",
      description: "ex: Entrer 208 pour « Moebius 208 »",
      type: "number",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "secondaryNumber",
      title: "Numéro d'édition secondaire",
      description: "ex: Entrer 209 pour « Moebius xxx - 209 »",
      type: "number",
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
    },
    {
      name: "currency",
      title: "Devise",
      description:
        "**IMPORTANT**: Conservez ce champ de données défini sur « cad ». Ceci est nécessaire pour Stripe. La page de vente générera probablement une erreur si elle n'est pas définie sur cad.",
      type: "string",
      initialValue: "cad",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "available",
      title: "En vente?",
      description: "Si vert, l'article en question est disponible à la vente.",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "publishedAt",
      title: "Date de publication",
      type: "date",
    },
    {
      name: "directedBy",
      title: "Dirigé par...",
      type: "string",
    },
    {
      name: "isbn",
      title: "ISBN",
      type: "string",
    },
    {
      name: "pages",
      title: "Nombre de pages",
      type: "number",
    },
    {
      name: "authors",
      title: "Noms des auteurs/autrices",
      description:
        "Séparez les noms par des virgules, ex: « Sayaka, Valérie, ... » etc.",
      type: "string",
    },
    {
      name: "codirectors",
      title: "Noms des codirecteurs/codirectrices",
      description:
        "Séparez les noms par des virgules, ex: « Sayaka, Valérie, ... » etc.",
      type: "string",
    },
    // {
    //   name: "author",
    //   title: "Author",
    //   type: "reference",
    //   to: { type: "author" },
    // },
    // {
    //   name: "podcast",
    //   title: "Référence d'épisode de podcast",
    //   type: "array",
    //   of: [{ type: "reference", to: { type: "podcast" } }],
    // },
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
