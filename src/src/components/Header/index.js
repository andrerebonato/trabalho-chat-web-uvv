import React from 'react';

export const Header = ({ content, isCorno, hasColor }) => {



    return (
        <h1 style={{ color: hasColor ? 'red' : 'blue' }}>
            {
                isCorno ? "É corno" : "Não eh"
            }
        </h1>
    )
}