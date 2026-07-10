"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/contexts/ToastContext"
import type { DeliveryMethod, GiftOptionItem, StoreSettings } from "@/lib/store-settings.shared"
import { DEFAULT_STORE_SETTINGS } from "@/lib/store-settings.shared"
import { Loader2, Plus, Save, Trash2, Truck, Gift, Percent } from "lucide-react"

export default function StoreSettingsPanel() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/settings")
      if (res.ok) {
        const data = await res.json()
        setSettings(data)
      }
    } catch {
      toast({ title: "Error", description: "Failed to load settings", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Save failed")
      setSettings(data.settings)
      toast({ title: "Saved", description: "Store settings updated successfully", variant: "success" })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save settings",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const updateDeliveryMethod = (index: number, field: keyof DeliveryMethod, value: string | number | boolean) => {
    setSettings((prev) => ({
      ...prev,
      deliveryMethods: prev.deliveryMethods.map((m, i) =>
        i === index ? { ...m, [field]: value } : m
      ),
    }))
  }

  const addDeliveryMethod = () => {
    setSettings((prev) => ({
      ...prev,
      deliveryMethods: [
        ...prev.deliveryMethods,
        {
          id: `method_${Date.now()}`,
          name: "",
          price: 0,
          days: "3–5 business days",
          enabled: true,
        },
      ],
    }))
  }

  const removeDeliveryMethod = (index: number) => {
    setSettings((prev) => ({
      ...prev,
      deliveryMethods: prev.deliveryMethods.filter((_, i) => i !== index),
    }))
  }

  const updateGiftItem = (index: number, field: keyof GiftOptionItem, value: string | number | boolean) => {
    setSettings((prev) => ({
      ...prev,
      giftOptions: {
        ...prev.giftOptions,
        items: prev.giftOptions.items.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      },
    }))
  }

  const addGiftItem = () => {
    setSettings((prev) => ({
      ...prev,
      giftOptions: {
        ...prev.giftOptions,
        items: [
          ...prev.giftOptions.items,
          {
            id: `gift_${Date.now()}`,
            name: "",
            price: 0,
            enabled: true,
          },
        ],
      },
    }))
  }

  const removeGiftItem = (index: number) => {
    setSettings((prev) => ({
      ...prev,
      giftOptions: {
        ...prev.giftOptions,
        items: prev.giftOptions.items.filter((_, i) => i !== index),
      },
    }))
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5" />
            Tax &amp; Billing
          </CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="gstPercentage">GST Percentage (%)</Label>
            <Input
              id="gstPercentage"
              type="number"
              min={0}
              max={28}
              step={0.1}
              value={settings.gstPercentage}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, gstPercentage: Number(e.target.value) }))
              }
            />
            <p className="text-xs text-gray-500">Applied to product subtotal at checkout</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="freeShippingMin">Free Shipping Above (₹)</Label>
            <Input
              id="freeShippingMin"
              type="number"
              min={0}
              value={settings.freeShippingMin}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, freeShippingMin: Number(e.target.value) }))
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Delivery Methods
          </CardTitle>
          <Button type="button" variant="outline" size="sm" onClick={addDeliveryMethod}>
            <Plus className="h-4 w-4 mr-1" />
            Add Method
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {settings.deliveryMethods.map((method, index) => (
            <div
              key={method.id || index}
              className="grid gap-3 p-4 border border-gray-200 rounded-xl bg-white/60"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={method.enabled}
                    onCheckedChange={(checked) => updateDeliveryMethod(index, "enabled", checked)}
                  />
                  <span className="text-sm font-medium">{method.enabled ? "Active" : "Hidden"}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeDeliveryMethod(index)}
                  disabled={settings.deliveryMethods.length <= 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Method Name</Label>
                  <Input
                    value={method.name}
                    onChange={(e) => updateDeliveryMethod(index, "name", e.target.value)}
                    placeholder="e.g. Express Delivery"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Price (₹)</Label>
                  <Input
                    type="number"
                    min={0}
                    value={method.price}
                    onChange={(e) => updateDeliveryMethod(index, "price", Number(e.target.value))}
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <Label className="text-xs">Delivery Time</Label>
                  <Input
                    value={method.days}
                    onChange={(e) => updateDeliveryMethod(index, "days", e.target.value)}
                    placeholder="e.g. 2–3 business days"
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Gift Options
          </CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addGiftItem}
            disabled={!settings.giftOptions.enabled}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Gift Option
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Show gift options at checkout</p>
              <p className="text-sm text-gray-500">When off, customers won&apos;t see the gift section</p>
            </div>
            <Switch
              checked={settings.giftOptions.enabled}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({
                  ...prev,
                  giftOptions: { ...prev.giftOptions, enabled: checked },
                }))
              }
            />
          </div>

          {settings.giftOptions.enabled && (
            <>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white/60">
                <div>
                  <p className="font-medium text-sm">Allow gift message</p>
                  <p className="text-xs text-gray-500">Show message textarea when customer marks order as gift</p>
                </div>
                <Switch
                  checked={settings.giftOptions.allowGiftMessage}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      giftOptions: { ...prev.giftOptions, allowGiftMessage: checked },
                    }))
                  }
                />
              </div>

              <div className="space-y-4">
                {settings.giftOptions.items.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="grid gap-3 p-4 border border-gray-200 rounded-xl bg-white/60"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={item.enabled}
                          onCheckedChange={(checked) => updateGiftItem(index, "enabled", checked)}
                        />
                        <span className="text-sm font-medium">{item.enabled ? "Active" : "Hidden"}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeGiftItem(index)}
                        disabled={settings.giftOptions.items.length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Option Name</Label>
                        <Input
                          value={item.name}
                          onChange={(e) => updateGiftItem(index, "name", e.target.value)}
                          placeholder="e.g. Premium Gift Wrapping"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Price (₹)</Label>
                        <Input
                          type="number"
                          min={0}
                          value={item.price}
                          onChange={(e) => updateGiftItem(index, "price", Number(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} className="bg-primary text-white">
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
