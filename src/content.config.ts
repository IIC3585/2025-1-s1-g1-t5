import { defineCollection, z } from "astro:content";
import { getMovies } from "@/content/loader/movies";

const apiURL = new URL(
  import.meta.env.API_URL_CATS ?? "https://api.thecatapi.com/v1/images/search?limit=100"
);

const cats = defineCollection({
  loader: async () => {
    const response = await fetch(apiURL, {
      method: "GET",
      headers: {
        "x-api-key": import.meta.env.API_KEY_CATS ?? "",
      },
    });
    const data = await response.json();
    return data;
  },
  schema: z.object({
    id: z.string(),
    url: z.string(),
    width: z.number(),
    height: z.number(),
  }),
});

const movies = defineCollection({
  loader: async () => {
    const data = await getMovies();
    return data.map((movie: any) => ({
      ...movie,
      id: movie.slug,
    }));
  },
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    us_gross: z.number(),
    worldwide_gross: z.number(),
    production_budget: z.number(),
    release_date: z.string(),
    imdb_rating: z.number(),
    imdb_votes: z.number(),
    img_url: z.string(),
    major_genre: z.string()
  })
});


export const collections = { cats , movies };
