import React from 'react';
import styles from './Page.module.scss';

const Page = ({ children }) => {
    return (
        <div className={styles.page}>
            <div className={styles.grid}>
                {children}
            </div>
        </div>
    );
};

export default Page;
