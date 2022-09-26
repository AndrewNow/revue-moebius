export default {
  name: "balado",
  title: "Moebius-Balado",
  type: "document",
  fields: [
    {
      name: "number",
      title: "Numéro d'édition",
      description:
        "ex: Entrer 208 pour «Mœbius-balado n°208». Laissez ce champ vide s'il s'agit d'un balado spécial, ex: Spécial Prix du public, etc.",
      type: "number",
    },
    {
      name: "secondNumber",
      title: "Numéro d'édition supplémentaire",
      description:
        "ex: Entrer 209 pour «Mœbius-balado n°208 & 209». Laissez ce champ vide s'il s'agit d'un balado spécial, ex: Spécial Prix du public, etc.",
      type: "number",
    },
    {
      name: "title",
      description:
        "Ce champ de donnés est UNIQUEMENT pour les balados spéciaux, ex: «Spécial Prix du public 2025».",
      title: "Titre",
      type: "string",
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
      name: "color",
      title: "Couleur de fond",
      type: "colorPicker",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "textcolor",
      title: "Couleur de texte",
      description:
        "Soit Noir: #353535 ou Blanc: #FFFFF8. Consultez ce lien pour vérifier que le contraste est adéquat https://webaim.org/resources/contrastchecker/",
      type: "colorPicker",
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
      title: "Date de création",
      type: "date",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "discussion",
      title: "discussion",
      type: "array",
      of: [
        {
          type: "string",
          name: "name",
          title: "Nom du membre",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "interviews",
      title: "Entrevues et lectures",
      type: "array",
      of: [
        {
          type: "string",
          name: "name",
          title: "Nom du membre",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "animation",
      title: "Animation",
      type: "array",
      of: [
        {
          type: "string",
          name: "name",
          title: "Nom du membre",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "body",
      title: "Contenu",
      description:
        "Pour un sauter une ligne/créér un nouveau paragraphe, assurez-vous d'appuyer deux fois sur le bouton « enter ». Si vous n'appuyez qu'une seule fois sur « enter », le fichier markdown ne saura pas créer une nouvelle ligne.",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "embed",
      title: "Spotify",
      description: "Copiez le lien Spotify ici.",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
  orderings: [
    {
      title: "Date de création originale",
      name: "creationDate",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      number: "number",
      title: "title",
      numberTwo: "secondNumber",
      media: "mainImage",
    },
    prepare: (selection) => {
      const { title, number, numberTwo, media } = selection;
      const prepareNumber = numberTwo
        ? `N°${number} & ${numberTwo}`
        : `N°${number}`;
      const prepareTitle = title ? title : prepareNumber;
      const prepareSubtitle = title ? "Spécial" : "Mœbius-balado";
      return {
        title: prepareTitle,
        subtitle: prepareSubtitle,
        media: media,
      };
    },
  },
};
