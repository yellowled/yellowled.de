import { z, defineCollection } from "astro:content";

const v2 = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.date(),
    }),
});

const instruments = defineCollection({
    schema: z.object({
        number: z.number(),
        brand: z.string(),
        model: z.string(),
        image: z.string(),
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

const wamwz = defineCollection({
    schema: z.object({
        artist: z.string(),
        title: z.string(),
        tweet: z.string(),
        date: z.date(),
    }),
});

export const collections = { v2, instruments, wamwz };
