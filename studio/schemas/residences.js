import React from "react"

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
      name: "residenceData",
      title: "Individus en résidence",
      type: "array",
      of: [{ type: "reference", to: { type: "artistesEnResidence" } }],
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
