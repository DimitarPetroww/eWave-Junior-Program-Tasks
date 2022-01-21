import styles from "./OptionsButton.module.css";

const OptionsButton = ({ click }) => {
    return <button className={styles.btn} onClick={click}>Options</button>
}

export default OptionsButton;