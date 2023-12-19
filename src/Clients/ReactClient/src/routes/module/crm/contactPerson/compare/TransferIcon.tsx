import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TransferIcon = ({handleTransfer}: { handleTransfer(): void} ) => (
    <span onClick={handleTransfer} className="mr-4">
            <FontAwesomeIcon icon="caret-left" size="2x" color="#1ab394" />
    </span>
)

export default TransferIcon;