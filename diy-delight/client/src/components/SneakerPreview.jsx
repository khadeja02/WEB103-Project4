import { UPPER_COLORS, SOLE_COLORS, findById } from '../utilities/options'

// Renders a simple sneaker illustration whose colors update live
// based on the selected upper_color and sole_color.
export default function SneakerPreview({ upperColorId, soleColorId, baseModelId }) {
  const upper = findById(UPPER_COLORS, upperColorId)?.hex || '#bbb'
  const sole = findById(SOLE_COLORS, soleColorId)?.hex || '#bbb'
  const isHighTop = baseModelId === 'hightop'

  return (
    <div className="sneaker-preview">
      <svg viewBox="0 0 300 180" width="100%" height="220">
        {/* Sole */}
        <path
          d="M20 150 Q10 170 40 172 L260 172 Q280 172 270 150 L250 140 L40 140 Z"
          fill={sole}
          stroke="#00000022"
        />
        {/* Upper body */}
        <path
          d="M40 140 L45 90 Q60 60 110 55 L190 55 Q230 55 245 90 L250 140 Z"
          fill={upper}
          stroke="#00000022"
        />
        {/* High-top ankle collar */}
        {isHighTop && (
          <path
            d="M90 55 Q90 20 130 15 L190 15 Q210 20 205 55 Z"
            fill={upper}
            stroke="#00000022"
          />
        )}
        {/* Laces area */}
        <g stroke="#ffffffcc" strokeWidth="3">
          <line x1="120" y1="65" x2="150" y2="80" />
          <line x1="150" y1="65" x2="120" y2="80" />
          <line x1="120" y1="85" x2="150" y2="100" />
          <line x1="150" y1="85" x2="120" y2="100" />
        </g>
      </svg>
    </div>
  )
}
