import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminPassword, setAdminPassword } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session || session.value !== "authenticated") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const currentSavedPassword = await getAdminPassword();

    if (currentPassword !== currentSavedPassword) {
      return NextResponse.json({ success: false, message: "Incorrect current passcode" }, { status: 400 });
    }

    if (newPassword.length < 4) {
      return NextResponse.json({ success: false, message: "New passcode must be at least 4 characters long" }, { status: 400 });
    }

    await setAdminPassword(newPassword);

    return NextResponse.json({ success: true, message: "Passcode updated successfully" });
  } catch (error) {
    console.error("Error in change-password route:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
