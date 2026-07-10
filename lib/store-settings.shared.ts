export interface DeliveryMethod {
  id: string
  name: string
  price: number
  days: string
  enabled: boolean
}

export interface GiftOptionItem {
  id: string
  name: string
  price: number
  enabled: boolean
}

export interface GiftOptions {
  enabled: boolean
  allowGiftMessage: boolean
  items: GiftOptionItem[]
}

export interface StoreSettings {
  gstPercentage: number
  freeShippingMin: number
  deliveryMethods: DeliveryMethod[]
  giftOptions: GiftOptions
}

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  gstPercentage: 5,
  freeShippingMin: 2000,
  deliveryMethods: [
    { id: "standard", name: "Standard Delivery", price: 749, days: "5–7 business days", enabled: true },
    { id: "express", name: "Express Delivery", price: 1349, days: "2–3 business days", enabled: true },
    { id: "local", name: "Local Delivery (Mumbai/Thane)", price: 199, days: "1–2 business days", enabled: true },
  ],
  giftOptions: {
    enabled: true,
    allowGiftMessage: true,
    items: [
      { id: "gift_wrap", name: "Premium Gift Wrapping", price: 499, enabled: true },
    ],
  },
}

function normalizeGiftItems(input: Partial<GiftOptions> | undefined): GiftOptionItem[] {
  const legacyWrapPrice = (input as { giftWrapPrice?: number } | undefined)?.giftWrapPrice

  const rawItems =
    input?.items ??
    (legacyWrapPrice != null
      ? [{ id: "gift_wrap", name: "Premium Gift Wrapping", price: legacyWrapPrice, enabled: true }]
      : DEFAULT_STORE_SETTINGS.giftOptions.items)

  const items = rawItems
    .filter((item) => item.name?.trim())
    .map((item, index) => ({
      id: item.id?.trim() || `gift_${index + 1}`,
      name: item.name.trim(),
      price: Math.max(0, Number(item.price) || 0),
      enabled: item.enabled !== false,
    }))

  return items.length > 0 ? items : DEFAULT_STORE_SETTINGS.giftOptions.items
}

export function normalizeStoreSettings(input: Partial<StoreSettings>): StoreSettings {
  const deliveryMethods = (input.deliveryMethods ?? DEFAULT_STORE_SETTINGS.deliveryMethods)
    .filter((m) => m.name?.trim())
    .map((m, index) => ({
      id: m.id?.trim() || `method_${index + 1}`,
      name: m.name.trim(),
      price: Math.max(0, Number(m.price) || 0),
      days: m.days?.trim() || "3–5 business days",
      enabled: m.enabled !== false,
    }))

  return {
    gstPercentage: Math.min(28, Math.max(0, Number(input.gstPercentage) ?? DEFAULT_STORE_SETTINGS.gstPercentage)),
    freeShippingMin: Math.max(0, Number(input.freeShippingMin) ?? DEFAULT_STORE_SETTINGS.freeShippingMin),
    deliveryMethods: deliveryMethods.length > 0 ? deliveryMethods : DEFAULT_STORE_SETTINGS.deliveryMethods,
    giftOptions: {
      enabled: input.giftOptions?.enabled ?? DEFAULT_STORE_SETTINGS.giftOptions.enabled,
      allowGiftMessage: input.giftOptions?.allowGiftMessage ?? DEFAULT_STORE_SETTINGS.giftOptions.allowGiftMessage,
      items: normalizeGiftItems(input.giftOptions),
    },
  }
}

export function getGiftAddonsTotal(selectedGiftIds: string[], settings: StoreSettings): number {
  if (!selectedGiftIds.length) return 0

  const enabledItems = settings.giftOptions.items.filter((item) => item.enabled)
  return enabledItems
    .filter((item) => selectedGiftIds.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0)
}
