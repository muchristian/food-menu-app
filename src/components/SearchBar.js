import React from 'react';

function SearchBar(props) {
    const { value, change } = props;
    return (
        <form class="search-content">
                <input type="text" class="form-control" onChange={change} name="keyword" placeholder="Search..."/>
                <span class="search-button"><i class="ti ti-search"></i></span>
            </form>
    );
}

export default SearchBar;