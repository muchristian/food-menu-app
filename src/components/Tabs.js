import React from 'react';

function Tabs(props) {
    const { categories, itemSelect, selectedItem } = props;
    return (
        <>
        {categories.map((category, index) => (
            <li class="nav-item" key={category._id} onClick={() => itemSelect(category)}>
            <a class={ category.name === selectedItem.name ? "nav-link active" : "nav-link"}>{category.name}</a>
        </li>
        ))}
        
        </>
    );
}

export default Tabs;