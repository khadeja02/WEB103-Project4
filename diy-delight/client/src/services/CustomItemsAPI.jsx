const BASE_URL = '/api/custom-items'

export const getAllItems = async () => {
  const res = await fetch(BASE_URL)
  if (!res.ok) throw new Error('Failed to fetch items')
  return res.json()
}

export const getItem = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`)
  if (!res.ok) throw new Error('Failed to fetch item')
  return res.json()
}

export const createItem = async (item) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to create item')
  }
  return res.json()
}

export const updateItem = async (id, item) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to update item')
  }
  return res.json()
}

export const deleteItem = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete item')
  return res.json()
}
