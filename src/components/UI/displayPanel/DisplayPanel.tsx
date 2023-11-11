import React from 'react';
import classes from './DisplayPanel.module.css';

const DisplayPanel = ({children, ...props}) => {
    return (
        <div className={classes.display_panel}>
            {children}
        </div>
    );
};

export default DisplayPanel;