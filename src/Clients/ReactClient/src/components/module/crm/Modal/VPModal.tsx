import React from 'react';
import ReactModal from 'react-modal';

import './VPModal.css';

ReactModal.setAppElement('#root');

class VPModal extends React.Component<ReactModal.Props> {
    public render() {
        const { children, ...props } = this.props;
        const moddedProps: ReactModal.Props = {
            className: 'vp-modal',
            overlayClassName: 'vp-modal-overlay',
            ...props
        }
        return (
            <ReactModal {...moddedProps}>
                {children}
            </ReactModal>
        );
    }
}

export default VPModal;
