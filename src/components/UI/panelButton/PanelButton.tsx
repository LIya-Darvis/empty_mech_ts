import React from 'react';
import classes from './PanelButton.module.css';

const PanelButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.panel_button}>
            {children}
        </button>
    );
};

export default PanelButton;