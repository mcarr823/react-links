import { readFile } from "node:fs/promises"
import { dataFile } from "setup/constants"

export const dynamic = 'force-dynamic' // defaults to auto

/**
 * This API route downloads the contents of `dataFile` (data/links.json)
 * in the original, unaltered Links JSON format.
 * 
 * @returns All links contained within the JSON file
 */
export async function GET(request: Request) {

    const buffer = await readFile(dataFile)

    const headers = new Headers();
    headers.append("Content-Disposition", 'attachment; filename="links.json"');
    headers.append("Content-Type", "application/json");

    return new Response(buffer, { headers });

}
