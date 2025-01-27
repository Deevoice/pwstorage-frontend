import React from 'react';
import Link from 'next/link';
import MainLayout from '@/layouts/MainLayout';
import styles from '@/styles/main.module.css';

const HomePage: React.FC = () => {
    return (
        <MainLayout>
            <div className={styles['main-page']}>
                <div className="">
                    <img className={styles["main-page__logo"]} src="https://cdn-icons-png.flaticon.com/512/3211/3211316.png" alt="" />
                    <div className={styles["main-page_title"]}>
                        <h1 className={styles["main-page__title"]}>PASSWORD STORAGE</h1>
                        <div className={styles["beta-slat"]}>Beta</div>
                    </div>
                </div>
                <div className="">
                    <h2 className={styles["main-page__slogan"]}>YOUR KEY TO RELIABILITY</h2>

                    <div className={styles["main-btns"]}>
                        <Link className={`${styles['main-page__btn']} ${styles['priority-color']}`} href="/signup">SIGN UP</Link>
                        <Link className={styles["main-page__btn"]} href="/login">LOG IN</Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default HomePage;
