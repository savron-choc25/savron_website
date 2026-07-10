import { getCollection } from "@/lib/mongodb"
import {
  DEFAULT_STORE_SETTINGS,
  normalizeStoreSettings,
  type StoreSettings,
} from "@/lib/store-settings.shared"

export async function getStoreSettings(): Promise<StoreSettings> {
  try {
    const collection = await getCollection("settings")
    const doc = await collection.findOne({ key: "store" })
    if (!doc?.settings) return DEFAULT_STORE_SETTINGS
    return normalizeStoreSettings(doc.settings as Partial<StoreSettings>)
  } catch {
    return DEFAULT_STORE_SETTINGS
  }
}

export async function saveStoreSettings(settings: Partial<StoreSettings>) {
  const normalized = normalizeStoreSettings(settings)
  const collection = await getCollection("settings")
  await collection.updateOne(
    { key: "store" },
    {
      $set: {
        key: "store",
        settings: normalized,
        updatedAt: new Date().toISOString(),
      },
    },
    { upsert: true }
  )
  return normalized
}
