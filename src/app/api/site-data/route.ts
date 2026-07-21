import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSiteData, updateSiteData } from "@/lib/siteData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getSiteData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session || session.value !== "authenticated") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const updatedData = await updateSiteData(body);
    return NextResponse.json({ success: true, data: updatedData });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error updating data" }, { status: 500 });
  }
}
