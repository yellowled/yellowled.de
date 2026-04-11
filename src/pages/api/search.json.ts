export interface PageData {
    title: string;
    description?: string;
    url: string;
}

import { glob } from "glob";
import matter from "gray-matter";

export const prerender = true;

export async function GET() {
    const data: PageData[] = [];

    const pages = await glob("*.md", { cwd: "src/pages" });

    // Add each Markdown page's frontmatter as a search entry
    pages.forEach((file) => {
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
