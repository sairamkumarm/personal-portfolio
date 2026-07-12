export const VIEW_OPTIONS = [
  { value: "profile", label: "profile" },
  { value: "json", label: "json" },
] as const

export type ContentKey = (typeof VIEW_OPTIONS)[number]["value"]

export const DEFAULT_VIEW: ContentKey = "profile"

export function isContentKey(value: string | null | undefined): value is ContentKey {
  return Boolean(value) && VIEW_OPTIONS.some((option) => option.value === value)
}

export function resolveContentKey(value: string | null | undefined): ContentKey {
  return isContentKey(value) ? value : DEFAULT_VIEW
}
