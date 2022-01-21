import { useState } from "react";
import styles from "./Table.module.css";

const Table = ({ data, totalQuantity, totalPrice, averagePrice, mostExpensive, cheapest, setData }) => {
    const [isAscendingColumn, setIsAscendingColumn] = useState(false);
    const [isAscendingPrice, setIsAscendingPrice] = useState(true);
    const [isAscendingCategory, setIsAscendingCategory] = useState(true);
    const [isAscendingManufacturer, setIsAscendingManufacturer] = useState(true);
    const [isAscendingDate, setIsAscendingDate] = useState(true);



    const sort = (isAscending, setIsAscending, criterion) => {
        if (isAscending) {
            setData(prevState => [...prevState].sort((a, b) => isNaN(a[criterion]) ? a[criterion].localeCompare(b[criterion]) : a[criterion] - b[criterion]))
        } else {
            setData(prevState => [...prevState].sort((a, b) =>isNaN(a[criterion]) ? b[criterion].localeCompare(a[criterion]) : b[criterion] - a[criterion]))
        }
        setIsAscending(prevState => !prevState)
    }
    const sortDates = () => {
        if (isAscendingDate) {
            setData(prevState => [...prevState].sort((a, b) => new Date(a.productionDate) - new Date(b.productionDate)))
        } else {
            setData(prevState => [...prevState].sort((a, b) => new Date(b.productionDate) - new Date(a.productionDate)))
        }
        setIsAscendingDate(prevState => !prevState)
    }

    return (
        <section className={styles["table-wrapper"]}>
            <header className={styles["table-header"]}>
                <ul>
                    <li>Total Quantity: {totalQuantity}</li>
                    <li>Total cost: {totalPrice}$</li>
                    <li>Average price: {averagePrice}$</li>
                    <li>Most expensive product: {mostExpensive?.manufacturer} {mostExpensive?.category} - {mostExpensive?.price}$</li>
                    <li>Cheapest product: {cheapest?.manufacturer} {cheapest?.category} - {cheapest?.price}$ </li>
                </ul>
            </header>
            <table className={styles["product-table"]}>
                <thead>
                    <tr>
                        <th onClick={() => sort(isAscendingColumn, setIsAscendingColumn, "column")}># </th>
                        <th onClick={() => sort(isAscendingPrice, setIsAscendingPrice, "price")}>Price</th>
                        <th onClick={() => sort(isAscendingCategory, setIsAscendingCategory, "category")}>Category</th>
                        <th onClick={() => sort(isAscendingManufacturer, setIsAscendingManufacturer, "manufacturer")}>Manufacturer</th>
                        <th onClick={sortDates}>Production Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((x) => {
                        return <tr key={x._id}>
                            <td>
                                {x.column}
                            </td>
                            <td>
                                {x?.price}
                            </td>
                            <td>
                                {x?.category}
                            </td>
                            <td>
                                {x?.manufacturer}
                            </td>
                            <td>
                                {x?.productionDate}
                            </td>
                        </tr>;
                    })}
                </tbody>
            </table>
        </section>
    );
}

export default Table;