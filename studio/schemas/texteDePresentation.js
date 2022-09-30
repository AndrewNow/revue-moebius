export default {
  name: "texteDePresentation",
  title: "Textes de présentation",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "author",
      title: "Auteur",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "associatedNumero",
      title: "Numéro associé",
      type: "array",
      of: [{ type: "reference", to: { type: "numero" } }],
    },
    {
      name: "associatedArtist",
      title: "Artiste en résidence associé",
      description:
        "Ceci est nécessaire pour le bouton 'retour' trouvé à la fin du texte",
      type: "array",
      of: [{ type: "reference", to: { type: "artistesEnResidence" } }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "body",
      title: "Contenu",
      description:
        "Pour un sauter une ligne/créér un nouveau paragraphe, assurez-vous d'appuyer deux fois sur le bouton « enter ». Si vous n'appuyez qu'une seule fois sur « enter », le fichier markdown ne saura pas créer une nouvelle ligne.",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    },
  ],

  preview: {
    select: {
      title: "title",
      author: "author",
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      });
    },
  },
};
