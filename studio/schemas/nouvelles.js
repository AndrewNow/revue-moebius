export default {
  name: "nouvelles",
  title: "Nouvelles",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titre",
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
      name: "featured",
      title: "Article vedette?",
      description:
        "Si vert, l'article en question deviendrai l'article vedette sur la page d'accueil. Il est préférable de désactiver ce boutton pour les articles précédemment en vedette.",
      type: "boolean",
      initialValue: false,
      validation: (Rule) => Rule.required(),
    },
    // {
    //   name: "author",
    //   title: "Author",
    //   type: "reference",
    //   to: { type: "author" },
    // },
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
      name: "categories",
      title: "Catégorie d'article",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "Date de publication",
      type: "datetime",
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
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      });
    },
  },
};
