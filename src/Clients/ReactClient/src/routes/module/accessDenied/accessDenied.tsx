import React from 'react';

export const AccessDenied = (props: any) => (
    <div style={{ textAlign: 'center' }}>
        <h1>You do not have permission to view this page</h1>
        <button className="btn btn-lg btn-primary" onClick={() => props.history.goBack()}>
            Go back to previous page
        </button>
    </div>
);
