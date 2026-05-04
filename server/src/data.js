export const movies = [
  {
    _id: "324544",
    title: "In the Lost Lands",
    overview:
      "A queen sends the powerful sorceress Gray Alys to the Lost Lands in search of magical power.",
    poster_path: "https://image.tmdb.org/t/p/original/dDlfjR7gllmr8HTeN6rfrYhTdwX.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/op3qmNhvwEvyT7UFyPbIfQmKriB.jpg",
    genres: [{ id: 28, name: "Action" }, { id: 14, name: "Fantasy" }, { id: 12, name: "Adventure" }],
    release_date: "2025-02-27",
    original_language: "en",
    vote_average: 6.4,
    runtime: 102,
    casts: [
      { name: "Milla Jovovich", profile_path: "https://image.tmdb.org/t/p/original/usWnHCzbADijULREZYSJ0qfM00y.jpg" },
      { name: "Dave Bautista", profile_path: "https://image.tmdb.org/t/p/original/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg" }
    ]
  },
  {
    _id: "1232546",
    title: "Until Dawn",
    overview:
      "One year after her sister disappears, Clover and friends are trapped in a repeating night of terror.",
    poster_path: "https://image.tmdb.org/t/p/original/juA4IWO52Fecx8lhAsxmDgy3M3.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/icFWIk1KfkWLZnugZAJEDauNZ94.jpg",
    genres: [{ id: 27, name: "Horror" }, { id: 9648, name: "Mystery" }],
    release_date: "2025-04-23",
    original_language: "en",
    vote_average: 6.4,
    runtime: 103,
    casts: [
      { name: "Ella Rubin", profile_path: "https://image.tmdb.org/t/p/original/nTSPtzWu6deZTJtWXHUpACVznY4.jpg" },
      { name: "Michael Cimino", profile_path: "https://image.tmdb.org/t/p/original/mGAPQG2OKTgdKFkp9YpvCSqcbgY.jpg" }
    ]
  },
  {
    _id: "552524",
    title: "Lilo & Stitch",
    overview: "A lonely Hawaiian girl befriends a runaway alien and rebuilds her family.",
    poster_path: "https://image.tmdb.org/t/p/original/mKKqV23MQ0uakJS8OCE2TfV5jNS.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg",
    genres: [{ id: 10751, name: "Family" }, { id: 35, name: "Comedy" }, { id: 878, name: "Sci-Fi" }],
    release_date: "2025-05-17",
    original_language: "en",
    vote_average: 7.1,
    runtime: 108,
    casts: [
      { name: "Maia Kealoha", profile_path: "https://image.tmdb.org/t/p/original/uZNtbPHowlBYo74U1qlTaRlrdiY.jpg" },
      { name: "Chris Sanders", profile_path: "https://image.tmdb.org/t/p/original/qY4W0zfGBYzlCyCC0QDJS1Muoa0.jpg" }
    ]
  },
  {
    _id: "668489",
    title: "Havoc",
    overview: "A cop fights through a corrupt city's underworld to save a politician's son.",
    poster_path: "https://image.tmdb.org/t/p/original/ubP2OsF3GlfqYPvXyLw9d78djGX.jpg",
    backdrop_path: "https://image.tmdb.org/t/p/original/65MVgDa6YjSdqzh7YOA04mYkioo.jpg",
    genres: [{ id: 28, name: "Action" }, { id: 80, name: "Crime" }, { id: 53, name: "Thriller" }],
    release_date: "2025-04-25",
    original_language: "en",
    vote_average: 6.5,
    runtime: 107,
    casts: [
      { name: "Tom Hardy", profile_path: "https://image.tmdb.org/t/p/original/lJm89neuiVlYISEqNpGZA5kTAnP.jpg" },
      { name: "Jessie Mei Li", profile_path: "https://image.tmdb.org/t/p/original/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg" }
    ]
  }
];

export const timeSlots = ["06:30", "09:30", "12:00", "16:30", "20:00"];

export const makeDates = (count = 6) => {
  const now = new Date();
  return Array.from({ length: count }).map((_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    return d.toISOString().slice(0, 10);
  });
};

