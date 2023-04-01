import React from 'react';

function Hit({hit}) {
    return (
        <div>
            <article>
                <img src={hit.image} alt={hit.name} />
                {/* <p>{hit.categories[0]}</p>
                <h1>{hit.name}</h1>
                <p>${hit.price}</p> */}
                </article>
        </div>
    );
}

export default Hit;