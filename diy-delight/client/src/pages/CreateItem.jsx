import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SneakerPreview from '../components/SneakerPreview'
import { BASE_MODELS, UPPER_COLORS, SOLE_COLORS, LACE_STYLES, SIZES } from '../utilities/options'
import { calcTotalPrice } from '../utilities/calcPrice'
import { checkCombo, compatibleLaceStyles } from '../utilities/validation'
import { createItem } from '../services/CustomItemsAPI'

const initialState = {
  base_model: 'runner',
  upper_color: 'red',
  sole_color: 'white',
  lace_style: 'flat',
  size: 9
}

export default function CreateItem() {
  const navigate = useNavigate()
  const [selections, setSelections] = useState(initialState)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const allowedLaces = compatibleLaceStyles(selections.base_model)
  const totalPrice = calcTotalPrice(selections)

  const handleChange = (field, value) => {
    setError('')
    setSelections((prev) => {
      const updated = { ...prev, [field]: value }
      // Stretch feature: auto-correct lace style if it becomes incompatible
      if (field === 'base_model') {
        const allowed = compatibleLaceStyles(value)
        if (!allowed.includes(updated.lace_style)) {
          updated.lace_style = allowed[0]
        }
      }
      return updated
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const combo = checkCombo(selections)
    if (!combo.valid) {
      setError(combo.message)
      return
    }

    setSaving(true)
    try {
      await createItem({
        ...selections,
        size: Number(selections.size),
        total_price: totalPrice
      })
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="page">
      <h1>Design Your Sneaker</h1>
      <div className="builder-layout">
        <SneakerPreview
          upperColorId={selections.upper_color}
          soleColorId={selections.sole_color}
          baseModelId={selections.base_model}
        />

        <form onSubmit={handleSubmit} className="builder-form">
          {error && <p className="error-message">{error}</p>}

          <label>
            Base Model
            <select
              value={selections.base_model}
              onChange={(e) => handleChange('base_model', e.target.value)}
            >
              {BASE_MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} (+${m.basePrice})
                </option>
              ))}
            </select>
          </label>

          <label>
            Upper Color
            <select
              value={selections.upper_color}
              onChange={(e) => handleChange('upper_color', e.target.value)}
            >
              {UPPER_COLORS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} {c.price ? `(+$${c.price})` : ''}
                </option>
              ))}
            </select>
          </label>

          <label>
            Sole Color
            <select
              value={selections.sole_color}
              onChange={(e) => handleChange('sole_color', e.target.value)}
            >
              {SOLE_COLORS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} {c.price ? `(+$${c.price})` : ''}
                </option>
              ))}
            </select>
          </label>

          <label>
            Lace Style
            <select
              value={selections.lace_style}
              onChange={(e) => handleChange('lace_style', e.target.value)}
            >
              {LACE_STYLES.map((l) => (
                <option key={l.id} value={l.id} disabled={!allowedLaces.includes(l.id)}>
                  {l.name} {l.price ? `(+$${l.price})` : ''}
                </option>
              ))}
            </select>
          </label>

          <label>
            Size
            <select
              value={selections.size}
              onChange={(e) => handleChange('size', e.target.value)}
            >
              {SIZES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <div className="price-tag">Total: ${totalPrice.toFixed(2)}</div>

          <button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save My Sneaker'}
          </button>
        </form>
      </div>
    </div>
  )
}
