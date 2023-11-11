import React from 'react';
import classes from './ModalPanel.module.css';

console.log("modallllll");

const ModalPanel = ({children, ...props}) => {

    const rootClasses = [classes.myModal]

    // if (visible) {
    //     rootClasses.push(classes.active);
    // }

    return (
        
        <div className={[classes.modal_panel].join(' ')}>
            <div className={classes.modal_panel_content}>
                {children}
                {/* панель настроек допустим */}
            </div>
        </div>
    );
};

export default ModalPanel;