// Run with: npm run reset-db
// Drops (if exists) and recreates the custom_items table.
import { pool } from './database.js'

const dropTable = `DROP TABLE IF EXISTS custom_items;`

const createTable = `
CREATE TABLE custom_items (
  id SERIAL PRIMARY KEY,
  base_model VARCHAR(50) NOT NULL,
  upper_color VARCHAR(50) NOT NULL,
  sole_color VARCHAR(50) NOT NULL,
  lace_style VARCHAR(50) NOT NULL,
  size INTEGER NOT NULL,
  total_price NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
`

const run = async () => {
  try {
    await pool.query(dropTable)
    console.log('Dropped existing custom_items table (if it existed)')
    await pool.query(createTable)
    console.log('Created custom_items table')
  } catch (err) {
    console.error('Error resetting database:', err)
  } finally {
    await pool.end()
  }
}

run()
