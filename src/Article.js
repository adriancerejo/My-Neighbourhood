import React from 'react';

const Article = ( { name, author, desc, urlImg }) => {
    return (
        <div className="article-container">
            <img src={urlImg} alt="" width="100" height="100"></img>
            <h4 className="article-title">{name}</h4>
            <div className="article-desc">{desc}</div>
            <div className="article-author">By: {author}</div>
        </div>
    )
}

export default Article;