import type { StoreSettings } from "@/lib/store-settings.shared"
import { getGiftAddonsTotal } from "@/lib/store-settings.shared"

export function calculateOrderTotals(
  subtotal: number,
  shippingMethodId: string,
  selectedGiftIds: string[],
  settings: StoreSettings
) {
  const enabledMethods = settings.deliveryMethods.filter((m) => m.enabled)
  const selected =
    enabledMethods.find((m) => m.id === shippingMethodId) || enabledMethods[0]

  const shippingBase = selected?.price ?? 0
  const shipping = subtotal >= settings.freeShippingMin ? 0 : shippingBase
  const giftWrap =
    settings.giftOptions.enabled
      ? getGiftAddonsTotal(selectedGiftIds, settings)
      : 0
  const gst = Math.round(subtotal * (settings.gstPercentage / 100))
  const total = subtotal + shipping + giftWrap + gst

  return {
    subtotal,
    shipping,
    giftWrap,
    gst,
    total,
    gstPercentage: settings.gstPercentage,
    shippingMethod: selected,
  }
}
