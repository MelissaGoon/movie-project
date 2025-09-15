import styles from '../styles/modules/HeroCard.module.css';
import { ASSETS_FOLDER_PATH } from '../globals/global-variables';

const HeroCard = () => {
    // TODO: add props
    return (
        <article className={styles.card}>
            <div className={styles.card_text}>
                <h2>Movie Title</h2>
                <div className={styles.info}>
                    <p>date</p>
                    <p>age-rating</p>
                </div>

                <div className={styles.rating}>
                    <img src={`${ASSETS_FOLDER_PATH}star-red.svg`} alt="A red star icon" />
                    <p>5/10</p>
                </div>

                <div className={styles.credits}>
                    <p><strong>Director:</strong> Lorem, ipsum.</p>
                    <p><strong>Writer:</strong> Lorem, ipsum.</p>

                </div>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quia ipsa quo rem dolor eum, officiis quos nemo magni
                    provident fugit doloremque et corporis voluptas? Eos ipsa
                    numquam quisquam maiores minima!</p>
            </div>

            <img src="" alt="" />


        </article>
    )
}

export default HeroCard