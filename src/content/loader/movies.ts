import rawMovies from "@/content/data/movies.json";

export async function getMovies() {
  return rawMovies.map((movie) => {
    const title = movie["Title"].toString() as string || "untitled" as string;
    console.log(`Processing movie: ${title}`);

    return {
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title,
      us_gross: movie["US Gross"] ?? 0,
      worldwide_gross: movie["Worldwide Gross"] ?? 0,
      production_budget: movie["Production Budget"] ?? 0,
      release_date: movie["Release Date"] ?? "N/A",
      imdb_rating: movie["IMDB Rating"] ?? 0,
      imdb_votes: movie["IMDB Votes"] ?? 0,
      img_url: movie["Img"] ?? "",
      major_genre: movie["Major Genre"] ?? "Sin género"
    };
  });
}
