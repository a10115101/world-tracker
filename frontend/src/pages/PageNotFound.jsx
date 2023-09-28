import CancelButton from "../features/map/record/button/CancelButton";
import styles from "./PageNotFound.module.css";

function PageNotFound() {
  return (
    <div className={styles.container}>
      <div>
        <h1>Sorry, 404 page not found!</h1>
        <CancelButton>Back</CancelButton>
      </div>
    </div>
  );
}

export default PageNotFound;
