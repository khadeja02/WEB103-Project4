import { pool } from '../config/database.js'

// GET all custom items
export const getAllItems = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM custom_items ORDER BY created_at DESC'
    )
    res.status(200).json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch items' })
  }
}

// GET a single custom item by id
export const getItemById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'SELECT * FROM custom_items WHERE id = $1',
      [id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' })
    }
    res.status(200).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch item' })
  }
}

// POST a new custom item
export const createItem = async (req, res) => {
  try {
    const { base_model, upper_color, sole_color, lace_style, size, total_price } = req.body

    if (!base_model || !upper_color || !sole_color || !lace_style || !size || total_price == null) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const result = await pool.query(
      `INSERT INTO custom_items (base_model, upper_color, sole_color, lace_style, size, total_price)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [base_model, upper_color, sole_color, lace_style, size, total_price]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create item' })
  }
}

// PUT (update) an existing custom item
export const updateItem = async (req, res) => {
  try {
    const { id } = req.params
    const { base_model, upper_color, sole_color, lace_style, size, total_price } = req.body

    const result = await pool.query(
      `UPDATE custom_items
       SET base_model = $1, upper_color = $2, sole_color = $3, lace_style = $4, size = $5, total_price = $6
       WHERE id = $7 RETURNING *`,
      [base_model, upper_color, sole_color, lace_style, size, total_price, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' })
    }
    res.status(200).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update item' })
  }
}

// DELETE a custom item
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      'DELETE FROM custom_items WHERE id = $1 RETURNING *',
      [id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' })
    }
    res.status(200).json({ message: 'Item deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to delete item' })
  }
}
