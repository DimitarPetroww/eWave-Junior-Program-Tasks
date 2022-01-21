import styles from "./SidePanel.module.css";

import { ReactComponent as Close } from "../../closeIcon.svg"
import { useState, useRef } from "react";

const SidePanel = ({ categories, setFilteredProducts, products, manufactures, setIsPanelOpen, isPanelOpen }) => {
    const [filterCategories, setFilterCategories] = useState([]);
    const [filterManufacturers, setFilterManufacturers] = useState([])
    const [isCategoryExcept, setIsCategoryExcept] = useState(false)
    const [isManufactureExcept, setIsManufactureExcept] = useState(false)
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)


    const categoryForm = useRef(null);
    const manufactureForm = useRef(null);
    const priceForm = useRef(null);

    const changeCategories = (e) => {
        if (!e.target.checked) {
            setFilterCategories(prevState =>
                prevState.filter(x => x != e.target.value)
            )
        } else {
            setFilterCategories(prevState => [...prevState, e.target.value])
        }
    }
    const changeManufacturers = (e) => {
        if (!e.target.checked) {
            setFilterManufacturers(prevState => 
                prevState.filter(x => x != e.target.value)
            )
        } else {
            setFilterManufacturers(prevState => [...prevState, e.target.value])
        }
    }
    const changeMin = (e) => {
        if (e.target.value >= 0) {
            setMin(e.target.value)
        }
    }
    const changeMax = (e) => {
        if (e.target.value >= 0) {
            setMax(e.target.value)
        }
    }
    const submit = () => {
        let isFiltered = false;
        if (filterCategories.length > 0) {
            isFiltered = true;
            setFilteredProducts(prevState => prevState.filter(x => isCategoryExcept ? !filterCategories.includes(x.category) : filterCategories.includes(x.category)))
        }
        if (min) {
            isFiltered = true;
            setFilteredProducts(prevState => prevState.filter(x => x.price >= min))
        }
        if (max) {
            isFiltered = true;
            setFilteredProducts(prevState => prevState.filter(x => x.price <= max))
        }
        if (filterManufacturers.length > 0) {
            isFiltered = true;
            setFilteredProducts(prevState => prevState.filter(x => isManufactureExcept ? !filterManufacturers.includes(x.manufacturer) : filterManufacturers.includes(x.manufacturer)))
        }

        if(!isFiltered) {
            reset();
        }else {
            categoryForm.current.reset();
            manufactureForm.current.reset();
            setIsPanelOpen(false);
        }
    }
    const reset = () => {
        setFilteredProducts(products)
        setIsPanelOpen(false);
        categoryForm.current.reset();
        manufactureForm.current.reset();
        setMin(0)
        setMax(0)
        setIsManufactureExcept(false)
        setIsCategoryExcept(false)
        setFilterManufacturers([])
        setFilterCategories([])
    }
    return (
        <aside className={`${styles.sidePanel} ${isPanelOpen ? "": styles.hidden}`}>
            <button onClick={() => setIsPanelOpen(false)}><Close /></button>
            <article className={styles["sidePanel-header"]}>
                <button onClick={submit}>Apply</button>
                <button onClick={reset}>Reset</button>
            </article>
            <form className={styles["sidePanel-category"]} ref={categoryForm}>
                <h3>Filter by category</h3>
                {categories.map((x, i) => {
                    return <div key={i}>
                        <input type="checkbox" id={x} name={x} onChange={changeCategories} value={x} />
                        <label htmlFor={x}>{x}</label>
                    </div>
                })}
                <div className={styles["sidePanel-except"]}>
                    <input type="checkbox" id="except" name="except" onChange={(e) => setIsCategoryExcept(e.target.checked)} />
                    <label htmlFor="except">All except</label>
                </div>
            </form>
            <form className={styles["sidePanel-price"]} ref={priceForm}>
                <h3>Filter by price</h3>
                <div>
                    <label htmlFor="min">From: </label>
                    <input type="number" id="min" name="min" min="0" onChange={changeMin} value={min === 0 ? "" : min} />
                    <label htmlFor="max">To: </label>
                    <input type="number" id="max" name="max" min="0" onChange={changeMax} value={max === 0 ? "" : max} />
                </div>
            </form>
            <form className={styles["sidePanel-manufacture"]} ref={manufactureForm}>
                <h3>Filter by manufacture</h3>
                {manufactures.map((x, i) => {
                    return <div key={i}>
                        <input type="checkbox" id={x} name={x} onChange={changeManufacturers} value={x} />
                        <label htmlFor={x}>{x}</label>
                    </div>
                })}
                <div className={styles["sidePanel-except"]}>
                    <input type="checkbox" id="except" name="except" onChange={(e) => setIsManufactureExcept(e.target.checked)} />
                    <label htmlFor="except">All except</label>
                </div>
            </form>
        </aside>
    )
}

export default SidePanel;