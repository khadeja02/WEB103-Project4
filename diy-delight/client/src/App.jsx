import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ItemList from './pages/ItemList'
import CreateItem from './pages/CreateItem'
import ItemDetail from './pages/ItemDetail'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/create" element={<CreateItem />} />
        <Route path="/items/:id" element={<ItemDetail />} />
      </Routes>
    </>
  )
}
