import { NextRequest, NextResponse } from "next/server"
import { DEFAULT_STORE_SETTINGS } from "@/lib/store-settings.shared"
import { getStoreSettings, saveStoreSettings } from "@/lib/store-settings.server"

export async function GET() {
  try {
    const settings = await getStoreSettings()
    return NextResponse.json(settings)
  } catch (error) {
    console.error("Failed to fetch store settings:", error)
    return NextResponse.json(DEFAULT_STORE_SETTINGS)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const settings = await saveStoreSettings(body)
    return NextResponse.json({ message: "Settings saved", settings })
  } catch (error) {
    console.error("Failed to save store settings:", error)
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return PUT(request)
}
