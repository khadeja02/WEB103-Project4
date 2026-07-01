// Central place for all customizable feature options.
// Editing prices/colors here updates the whole app.

export const BASE_MODELS = [
  { id: 'runner', name: 'Runner', basePrice: 60, hasLaces: true },
  { id: 'hightop', name: 'High-Top', basePrice: 75, hasLaces: true },
  { id: 'slipon', name: 'Slip-On', basePrice: 55, hasLaces: false }
]

export const UPPER_COLORS = [
  { id: 'red', name: 'Red', hex: '#e74c3c', price: 0 },
  { id: 'blue', name: 'Blue', hex: '#3498db', price: 0 },
  { id: 'black', name: 'Black', hex: '#2c3e50', price: 0 },
  { id: 'white', name: 'White', hex: '#ecf0f1', price: 0 },
  { id: 'green', name: 'Green', hex: '#27ae60', price: 5 }
]

export const SOLE_COLORS = [
  { id: 'white', name: 'White', hex: '#ecf0f1', price: 0 },
  { id: 'black', name: 'Black', hex: '#2c3e50', price: 0 },
  { id: 'red', name: 'Red', hex: '#e74c3c', price: 8 }
]

export const LACE_STYLES = [
  { id: 'flat', name: 'Flat Laces', price: 0 },
  { id: 'rope', name: 'Rope Laces', price: 6 },
  { id: 'none', name: 'No Laces (Slip-On only)', price: 0 }
]

export const SIZES = [7, 8, 9, 10, 11, 12, 13]

export const findById = (list, id) => list.find((item) => item.id === id)
