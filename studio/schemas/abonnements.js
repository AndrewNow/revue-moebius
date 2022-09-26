import React from "react";

const TYPE_OPTIONS = [
  { title: "Regulier", value: "regular" },
  { title: "Étudiant", value: "student" },
  { title: "Institution", value: "institution" },
];
const DURATION_OPTIONS = [
  { title: "Un an", value: "1 an" },
  { title: "Deux ans", value: "2 ans" },
];
const LOCATION_OPTIONS = [
  { title: "Canada", value: "canada" },
  { title: "États-Unis", value: "usa" },
  { title: "International", value: "international" },
];

export default {
  name: "abonnements",
  title: "Abonnements",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titre",
      description:
        "Nom de l'abonnement, ex: « Individu (un an) ». Ce titre va apparaitre sur le reçu et dans le panier.",
      type: "string",
    },
    {
      name: "price",
      title: "Prix",
      description:
        "Ajoutez les sous sous forme de zéros, par ex: 1799 = 17.99$.",
      type: "string",
    },
    {
      name: "currency",
      title: "Devise",
      description:
        "**IMPORTANT**: Conservez ce champ de données défini sur « cad ». Ceci est nécessaire pour Stripe. La page de vente générera probablement une erreur si elle n'est pas définie sur cad.",
      type: "string",
      initialValue: "cad",
      options: {
        hidden: true,
      },
    },
    {
      name: "type",
      title: "Statut",
      type: "string",
      options: {
        list: TYPE_OPTIONS,
        layout: "dropdown",
      },
    },
    {
      name: "duration",
      title: "Durée",
      type: "string",
      options: {
        list: DURATION_OPTIONS,
        layout: "dropdown",
      },
    },
    {
      name: "location",
      title: "Lieu",
      type: "string",
      options: {
        list: LOCATION_OPTIONS,
        layout: "dropdown",
      },
    },
  ],
  preview: {
    select: {
      duration: "duration",
      type: "type",
      location: "location",
    },
    prepare: ({ duration, location, type }) => {
      const typeTitle = type
        ? TYPE_OPTIONS.find((option) => option.value === type).title
        : "undefined title";
      const durationTitle = duration
        ? DURATION_OPTIONS.find((option) => option.value === duration).title
        : "undefined duration";
      const locationTitle = location
        ? LOCATION_OPTIONS.find((option) => option.value === location).title
        : "undefined location";
      return {
        title: `${typeTitle} — ${durationTitle}`,
        subtitle: `${locationTitle}`,
        media: <></>,
      };
    },
  },
};
