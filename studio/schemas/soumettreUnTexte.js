export default {
  name: "soumettreUnTexte",
  title: "Protocols & appels en cours",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titre principale",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description principale",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "linkToNews",
      title: "Lien au publication de nouvelles",
      description:
        "Créer un lien vers un article de presse contenant plus d'informations sur les dates limites de soumission. ***IMPORTANT*** - Si un appel est fermé, videz ce champ.",
      type: "reference",
      to: { type: "nouvelles" },
    },
    {
      name: "soumission",
      title: "Description pour la protocole de soumission",
      description:
        "Pour ajouter un lien couriel, cliquez sur URL et utilisez le format suivant: mailto:courriel@gmail.com. Pour un sauter une ligne/créér un nouveau paragraphe, assurez-vous d'appuyer deux fois sur le bouton « enter ». Si vous n'appuyez qu'une seule fois sur « enter », le fichier markdown ne saura pas créer une nouvelle ligne.",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "edition",
      title: "Description pour la protocole d'édition",
      description:
        "Pour ajouter un lien couriel, cliquez sur URL et utilisez le format suivant: mailto:courriel@gmail.com. Pour un sauter une ligne/créér un nouveau paragraphe, assurez-vous d'appuyer deux fois sur le bouton « enter ». Si vous n'appuyez qu'une seule fois sur « enter », le fichier markdown ne saura pas créer une nouvelle ligne.",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "extraInfoTitle",
      title: "Titre pour informations supplémentaires",
      placeholder: "Pour les auteurices qui n’ont pas la résidence canadienne;",
      type: "string",
    },
    {
      name: "extraInfoDescription",
      title: "Description pour informations supplémentaires",
      placeholder:
        "La Revue Mœbius est subventionnée par le Conseil des arts du Canada, le Conseil des arts et des lettres du Québec, et le Conseil des arts de Montréal, et sa mission première est de diffuser le travail de création littéraire des auteurices du Canada. La Revue souhaite par ailleurs entretenir la richesse de ses liens avec la francophonie et accepte les soumissions d’auteurs et d’autrices de partout à travers le monde. C’est pour nous une fierté d’avoir reçu, et parfois publié, des textes de grande qualité en provenance entre autres de Belgique, de Haïti, de Suisse, d’Algérie, du Brésil, de France et des États-Unis. Toutefois, sur les douze textes retenus pour publication dans la section thématique de chaque numéro (en réponse à l’appel de texte), deux seulement peuvent provenir d’auteurices qui ne sont pas résident·e·s canadien·n·e·s.",
      type: "string",
    },
  ],

  preview: {
    select: {
      title: "title",
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
