import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const v2 = defineCollection({
    loader: glob({
        base: "./src/data/v2/",
        pattern: "**/[^_]*.md",
    }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.date(),
    }),
});

const instruments = defineCollection({
    loader: glob({
        base: "./src/data/instruments/",
        pattern: "**/[^_]*.md",
    }),
    schema: ({ image }) =>
        z.object({
            number: z.number(),
            brand: z.string(),
            model: z.string(),
            image: image(),
            body: z.string(),
            neck: z.string(),
            profile: z.string(),
            radius: z.string(),
            fretboard: z.string(),
            frets: z.string(),
            scale: z.string(),
            nut: z.string(),
            pickups: z.string(),
            url: z.string(),
            date: z.string(),
        }),
});

export const collections = { v2, instruments };
