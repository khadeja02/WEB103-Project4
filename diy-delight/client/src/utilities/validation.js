import { BASE_MODELS, findById } from './options'

// Checks whether the currently selected features are a possible combination.
// Returns { valid: boolean, message?: string }
export const checkCombo = (selections) => {
  const base = findById(BASE_MODELS, selections.base_model)

  if (!base) {
    return { valid: false, message: 'Please choose a base model.' }
  }

  // Slip-Ons have no laces, so lace_style must be "none".
  if (!base.hasLaces && selections.lace_style !== 'none') {
    return {
      valid: false,
      message: `${base.name} shoes don't have laces. Please choose "No Laces" for the lace style.`
    }
  }

  // Laced shoes cannot have lace_style "none".
  if (base.hasLaces && selections.lace_style === 'none') {
    return {
      valid: false,
      message: `${base.name} shoes need laces. Please choose Flat or Rope laces.`
    }
  }

  return { valid: true }
}

// Given a base model id, returns the list of lace_style ids that are
// compatible with it (used to disable incompatible options in the UI).
export const compatibleLaceStyles = (baseModelId) => {
  const base = findById(BASE_MODELS, baseModelId)
  if (!base) return []
  return base.hasLaces ? ['flat', 'rope'] : ['none']
}
