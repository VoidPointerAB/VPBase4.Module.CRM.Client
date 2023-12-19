import React, { FunctionComponent } from 'react';
import Linkify from 'react-linkify';
import punycode from 'punycode';

interface TextBoxWithLinksProps {
    className: string;
}

const componentDecorator = (href: string, text: string, key: number) => (
    <a href={href} key={key} target="_blank" rel="noopener noreferrer">
        {punycode.toASCII(text)}
    </a>
);

export const TextBoxWithLinks: FunctionComponent<TextBoxWithLinksProps> = props => {
    return (
        <div className={props.className} style={{ whiteSpace: 'pre-line' }}>
            <Linkify componentDecorator={componentDecorator}>{props.children}</Linkify>
        </div>
    );
};
