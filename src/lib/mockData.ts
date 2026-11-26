export type Portion = { id: number; nb: number };

export type Cake = {
  id: number;
  titre: string;
  description: string;
  prixPortion: number; // Ariary
  photos: string[]; // filenames under /media/gen or /media/bg
  categorieId: number;
  portions: number[]; // nb_portion values
  likes: number;
  dislikes: number;
};

export type Category = { id: number; nom: string };

export const categories: Category[] = [
  { id: 1, nom: "Mariage et Fiançaille" },
  { id: 2, nom: "Anniversaire" },
  { id: 3, nom: "Enfant" },
  { id: 4, nom: "Noël" },
  { id: 5, nom: "Valentin" },
  { id: 6, nom: "Petit four" },
  { id: 7, nom: "Cocktail" },
];

export const portions: Portion[] = [
  { id: 1, nb: 1 },
  { id: 2, nb: 4 },
  { id: 3, nb: 6 },
  { id: 4, nb: 8 },
  { id: 5, nb: 10 },
  { id: 6, nb: 12 },
  { id: 7, nb: 14 },
  { id: 8, nb: 16 },
  { id: 9, nb: 20 },
  { id: 10, nb: 30 },
];

export const cakes: Cake[] = [
  {
    id: 1,
    titre: "Montagne de Chocolat",
    description:
      "Offrez-en une pour ces fous du chocolat ! Avec son nom personnalisable, son chocolat fondu... ils aimeront à coup sûr !",
    prixPortion: 8000,
    photos: ["montagne.jpg", "hero.jpg", "bg1.jpg", "bg2.jpg"],
    categorieId: 2,
    portions: [6, 8, 10, 12],
    likes: 24,
    dislikes: 2,
  },
  {
    id: 2,
    titre: "Bible dorée",
    description:
      "Mariage ? Fiançailles ? La bible sera toujours là pour vous. Commandez un gâteau en forme de bible avec un texte sacré écrit selon vos demandes.",
    prixPortion: 9000,
    photos: ["bible.jpg", "bg3.jpg", "bg4.jpg", "hero.jpg"],
    categorieId: 1,
    portions: [20, 30],
    likes: 18,
    dislikes: 1,
  },
  {
    id: 3,
    titre: "Manoir De Batman",
    description:
      "Pour vos enfants qui aiment les super-héros ! Offrez ce gâteau pour son anniversaire. Envoyez-nous photos ou animations, on personnalise pour vous !",
    prixPortion: 10000,
    photos: ["batman.jpg", "bg5.jpg", "bg1.jpg", "bg2.jpg"],
    categorieId: 3,
    portions: [10, 12, 14, 16],
    likes: 31,
    dislikes: 3,
  },
  {
    id: 4,
    titre: "Love",
    description:
      "Oh mon cœur, je t'aime... hihi. Un joli gâteau personnalisé, fait spécialement pour votre amour.",
    prixPortion: 7000,
    photos: ["love.jpg", "bg3.jpg", "bg4.jpg", "hero.jpg"],
    categorieId: 5,
    portions: [4, 6, 8, 10],
    likes: 42,
    dislikes: 0,
  },
];

export const formatAriary = (n: number) =>
  new Intl.NumberFormat("fr-MG").format(n) + " Ar";

export const imgFor = (photo: string) =>
  photo.startsWith("bg") ? `/media/bg/${photo}` : `/media/gen/${photo}`;