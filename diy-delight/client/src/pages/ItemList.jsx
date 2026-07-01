import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SneakerPreview from '../components/SneakerPreview'
import { getAllItems, deleteItem } from '../services/CustomItemsAPI'
import { BASE_MODELS, findById } from '../utilities/options'

export default function ItemList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadItems = async () => {
    try {
      const data = await getAllItems()
      setItems(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this sneaker design?')) return
    try {
      await deleteItem(id)
      setItems((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <div className="page">Loading...</div>

  return (
    <div className="page">
      <h1>My Sneakers</h1>
      {error && <p className="error-message">{error}</p>}

      {items.length === 0 ? (
        <p>
          No sneakers yet. <Link to="/create">Design your first one!</Link>
        </p>
      ) : (
        <div className="item-grid">
          {items.map((item) => (
            <div className="item-card" key={item.id}>
              <SneakerPreview
                upperColorId={item.upper_color}
                soleColorId={item.sole_color}
                baseModelId={item.base_model}
              />
              <h3>{findById(BASE_MODELS, item.base_model)?.name || item.base_model}</h3>
              <p>Size {item.size} &middot; ${Number(item.total_price).toFixed(2)}</p>
              <div className="card-actions">
                <Link to={`/items/${item.id}`}>View / Edit</Link>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
