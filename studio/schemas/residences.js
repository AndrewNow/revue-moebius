import React from "react";

const RESIDENCY_CATEGORIES = [
  { title: "Artiste", value: "artiste" },
  { title: "Écrivain.e", value: "écrivain" },
  { title: "Hypermédia", value: "hypermédia" },
];

export default {
  name: "residences",
  title: "Résidences",
  type: "document",
  fields: [
    {
      type: "number",
      name: "year",
      title: "Année de résidence",
      description:
        "ex: 2024, 2025, 2026, etc... Ceci va être utilisé pour regrouper les résidences dans l'archive.",
      validation: (Rule) => Rule.required(),
    },
    {
      type: "boolean",
      name: "active",
      initialValue: false,
      options: {
        layout: "checkbox",
      },
      title: "Résidence active? [IMPORTANT]",
      description:
        "Si coché, la résidence est active. Si vide, l'année va être mis dans l'archive.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "residencesData",
      title: "Individus en résidence",
      type: "array",
      of: [
        {
          type: "object",
          name: "residenceItem",
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

            // {
            //   name: "texteDePresentation",
            //   title: "Texte de présentation",
            //   description:
            //     "Faire un lien vers le texte de présentation (non-obligatoire)",
            //   type: "array",
            //   of: [{ type: "reference", to: { type: "numero" } }],
            // },
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
              title: "Contributions",
              description:
                "Faire un lien vers les numéros auxquelles la personne a contribué.",
              type: "array",
              of: [{ type: "reference", to: { type: "numero" } }],
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
                ? RESIDENCY_CATEGORIES.find((option) => option.value === type)
                    .title
                : "undefined title";
              return {
                title: title,
                subtitle: typeTitle,
                media: media,
              };
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "year",
    },
    prepare: (selection) => {
      const { title } = selection;
      return {
        title: `Résidences en ${title}`,
        media: <></>,
      };
    },
  },
};
