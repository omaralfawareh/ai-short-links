import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    if (!id) {
        return new NextResponse("Not Found", { status: 404 });
    }

    try {
        const kv = getCloudflareContext().env.SHORT_LINKS_KV;
        const destination = await kv.get(id);


        if (!destination) {
            return new NextResponse("Not Found", { status: 404 });
        }
        return NextResponse.redirect(destination, 301);
    } catch (error) {
        console.error("Error fetching from KV:", error);
        return NextResponse.json(
            { error: "Failed to fetch redirect", source: id },
            { status: 500 }
        );
    }
}
