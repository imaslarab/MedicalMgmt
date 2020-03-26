import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('body');

export default function Modal({children, ...props}) {

    const customStyles = {
        content : {
            position              : 'absolute',
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)',
            width                 : '680px',
            maxWidth              : '90%' ,
            padding               : '0',
            borderRadius          : '8px'
        },
        overlay : {
            background: 'rgba(0, 0, 0, 0.6)'
        }
    };

    return (
        <ReactModal {...props} style={customStyles}>
            {children}
        </ReactModal>
    );
}
