import styles from './App.module.css';
import { useEffect, useState } from "react"
import OptionsButton from './components/OptionsButton/OptionsButton';
import Table from './components/Table/Table';
import SidePanel from './components/SidePanel/SidePanel';

const data = require("./products.json");

function App() {

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [averagePrice, setAveragePrice] = useState(0)
  const [mostExpensive, setMostExpensive] = useState({})
  const [cheapest, setCheapest] = useState({})
  const [categories, setCategories] = useState([])
  const [manufactures, setManufactures] = useState([])

  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    setProducts(data.map((x, i) => { x.column = i + 1; return x }))
    setCategories([... new Set(data.map(x => x.category))])
    setManufactures([... new Set(data.map(x => x.manufacturer))])
  }, [])

  useEffect(() => {
    if (products.length > 0) {
      const totalCost = [...filteredProducts].map(x => x.price).reduce((a, c) => { a += c; return a }, 0);
      const temp = [...filteredProducts].sort((a, b) => b.price - a.price);
      setTotalQuantity(filteredProducts.length)
      setTotalPrice(totalCost)
      setAveragePrice((totalCost / filteredProducts.length).toFixed(2))
      setMostExpensive(temp[0])
      setCheapest(temp[temp.length - 1])
    }
  }, [filteredProducts])
  useEffect(() => {
    if (products.length > 0) {
      setFilteredProducts(products)
    }
  }, [products])

  return (
    <div className={styles.App}>
      <SidePanel categories={categories} setFilteredProducts={setFilteredProducts} products={products} manufactures={manufactures} setIsPanelOpen={setIsPanelOpen} isPanelOpen={isPanelOpen} />
      <OptionsButton click={() => setIsPanelOpen(prevState => !prevState)} />
      <Table data={filteredProducts} totalPrice={totalPrice} totalQuantity={totalQuantity} averagePrice={averagePrice} mostExpensive={mostExpensive} cheapest={cheapest} setData={setFilteredProducts} />
    </div>
  );
}

export default App;
