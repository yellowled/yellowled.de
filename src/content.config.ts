import { z } from "astro/zod";
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

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

export const collections = { instruments };
