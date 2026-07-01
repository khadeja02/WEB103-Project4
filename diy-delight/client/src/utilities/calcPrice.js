import { BASE_MODELS, UPPER_COLORS, SOLE_COLORS, LACE_STYLES, findById } from './options'

// Calculates the total price for a given set of selections.
// selections = { base_model, upper_color, sole_color, lace_style }
export const calcTotalPrice = (selections) => {
  const base = findById(BASE_MODELS, selections.base_model)
  const upper = findById(UPPER_COLORS, selections.upper_color)
  const sole = findById(SOLE_COLORS, selections.sole_color)
  const lace = findById(LACE_STYLES, selections.lace_style)

  const total =
    (base?.basePrice || 0) +
    (upper?.price || 0) +
    (sole?.price || 0) +
    (lace?.price || 0)

  return Number(total.toFixed(2))
}
