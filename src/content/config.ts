import { z, defineCollection } from "astro:content";

const v2 = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.date(),
    }),
});

const instruments = defineCollection({
    schema: ({ image }) =>
        z.object({
            number: z.number(),
            brand: z.string(),
            model: z.string(),
            image: image().refine((img) => img.width >= 1440, {
                message: "Instrument image must be at least 1440 pixels wide!",
            }),
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
