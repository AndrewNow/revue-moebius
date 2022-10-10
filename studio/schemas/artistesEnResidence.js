import React from "react";

const RESIDENCY_CATEGORIES = [
  { title: "Artiste", value: "artiste" },
  { title: "Écrivain.e", value: "écrivain" },
  { title: "Hypermédia", value: "hypermédia" },
];

export default {
  name: "artistesEnResidence",
  title: "Artistes en résidence",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Nom de l'individu",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "type",
      title: "Type de résidence",
      type: "string",
      options: {
        list: RESIDENCY_CATEGORIES,
        layout: "dropdown",
      },
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
      name: "mainImage",
      title: "Image de couverture",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "photoCredit",
      title: "Crédit photo",
      description: "Non-obligatoire. Entrez seulement le nom.",
      type: "string",
    },
    {
      name: "texteDePresentationData",
      title: "Texte de présentation",
      description:
        "Faire un lien vers le texte de présentation",
      type: "array",
      of: [{ type: "reference", to: { type: "texteDePresentation" } }],
    },
    {
      name: "shortBio",
      title: "Mini bio",
      description:
        "Pour un sauter une ligne/créér un nouveau paragraphe, assurez-vous d'appuyer deux fois sur le bouton « enter ». Si vous n'appuyez qu'une seule fois sur « enter », le fichier markdown ne saura pas créer une nouvelle ligne.",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "bio",
      title: "Bio",
      description:
        "Pour un sauter une ligne/créér un nouveau paragraphe, assurez-vous d'appuyer deux fois sur le bouton « enter ». Si vous n'appuyez qu'une seule fois sur « enter », le fichier markdown ne saura pas créer une nouvelle ligne.",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "contributions",
      title: "Contributions d'artiste",
      description:
        "Faire un lien vers les numéros auxquelles la personne a contribué.",
      type: "array",
      of: [{ type: "reference", to: { type: "numero" } }],
    },
    {
      name: "contributionsEcrivain",
      title: "Contributions d'écrivain.e.s",
      description:
        "Créer un lien vers les textes d'écrivain.es.",
      type: "array",
      of: [{ type: "reference", to: { type: "contributionsEcrivain" } }],
    },
    {
      type: "url",
      name: "portfolio",
      title: "Portfolio de l'individu",
      description: "Non-obligatoire.",
    },
    {
      type: "url",
      name: "instagram",
      title: "Instagram de l'individu",
      description: "Non-obligatoire.",
    },
  ],
  preview: {
    select: {
      type: "type",
      title: "title",
      media: "mainImage",
    },
    prepare: (selection) => {
      const { title, media, type } = selection;
      const typeTitle = type
        ? RESIDENCY_CATEGORIES.find((option) => option.value === type).title
        : "undefined title";
      return {
        title: title,
        subtitle: typeTitle,
        media: media,
      };
    },
  },
};
