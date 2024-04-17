import prisma from "@/lib/turso";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
    // Get the id from the query string
    const url = req?.url || "";
    if (url === "") {
        return NextResponse.json({ message: "No URL provided" }, { status: 400 });
    }
    const id = parseInt(url.split('=')[1]);

    const deletedGroup = await prisma.userGroups.delete({
        where: {
            id: id
        }
    });

    if (!deletedGroup) {
        return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }

    // Redirect to the /home/admin page
    return NextResponse.redirect(url.split('/api')[0] + "/home/admin");
}