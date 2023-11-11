import React from 'react';
import classes from './ModalPanel.module.css';

// console.log("modallllll");

const ModalPanel = ({children, visible, setVisible}) => {

    const rootClasses = [classes.modal_panel]

    if (visible) {
        rootClasses.push(classes.active);
    }

    return (
        
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.modal_panel_content} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default ModalPanel;