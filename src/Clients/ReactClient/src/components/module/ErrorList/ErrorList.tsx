import React from 'react'

interface IErrorListProps {
    errors: string[]
}

const ErrorList = (props: IErrorListProps) => {

    let content = null;

    if (props.errors.length > 0) {
        const elements = props.errors.map((error: string) => <li key={error}>{error}</li>);

        content = (
        <div className="error-list">
            <h3>Errors:</h3>
            <ul>
                {elements}
            </ul>
        </div>);

    }

    return content;
};

export default ErrorList;