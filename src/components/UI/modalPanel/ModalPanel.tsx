import React from 'react';
import classes from './ModalPanel.module.css';

// console.log("modallllll");

const ModalPanel = ({children, open, setOpen}) => {

    // const rootClasses = [classes.modal_panel]

    // if (open) {
    //     rootClasses.push(classes.active);
    // }

    return (
        
        <div className={classes.modal_panel} onClick={() => setOpen(false)}>
            <div className={classes.modal_panel_content} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default ModalPanel;