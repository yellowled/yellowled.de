export interface PageData {
    title: string;
    description?: string;
    url: string;
}

import { getCollection } from "astro:content";
import { glob } from "glob";
import matter from "gray-matter";

export const prerender = true;

export async function GET() {
    const data: PageData[] = [];

    const archiv = await getCollection("v2");

    archiv.map((item) => {
        data.push({
            title: item.data.title,
            description: item.data.description,
            url: `/archiv/${item.id}/`,
        });
    });

    const recipes = await getCollection("recipes");
    recipes.map((recipe) => {
        data.push({
            title: recipe.data.title,
            description: recipe.data.search,
            url: `/cooks/${recipe.id}`,
        });
    });

    const pages = await glob("*.md", { cwd: "src/pages" });

    const errorPageIndex = pages.indexOf("404.md");
    pages.splice(errorPageIndex, 1);

    pages.map((file) => {
        const page = matter.read(`src/pages/${file}`);
        const slug = file.slice(0, -3);
        const url = slug === "index" ? "/" : `/${slug}`;

        data.push({
            title: page.data.title,
            description: page.data.description,
            url,
        });
    });

    return new Response(JSON.stringify(data));
}
