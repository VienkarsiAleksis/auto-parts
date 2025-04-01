import React, { useEffect } from 'react';
import style from '../Products/Product.module.scss';

const Alert = ({ message, onClose, color }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`${style.alert} ${style.slideIn}`} style={{ backgroundColor: color }}>
            <span>{message}</span>
            <button className={style.closeButton} onClick={onClose}>×</button>
        </div>
    );
};

export default Alert;