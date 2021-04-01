import React from 'react';
import _ from 'lodash';
import { pure } from 'recompose';

const Pagination = (props) => {
    const { dataLength, pageSize, currPage, prevPage, nextPage, onPageChange } = props;
    const pagesCount = Math.ceil(dataLength / pageSize);
    console.log(dataLength)
    console.log(pageSize)
    console.log(pagesCount)
    const pages = _.range(1, pagesCount + 1)
    console.log(pages)
    return (
        <div class="pagination_rounded pull-right">
    <ul>
        <li> <a class="prev" onClick={prevPage}> <i class="fa fa-angle-left" aria-hidden="true"></i> Prev </a> </li>
        {pages.map(page => (
            <li key={page} class={page === currPage ? 'hidden-xs active' : 'hidden-xs'}>
            <a class="" onClick={() => onPageChange(page)}>{page}</a>
            </li>
        ))}
        <li><a class="next" onClick={() => nextPage(pages.length)}> Next <i class="fa fa-angle-right" aria-hidden="true"></i></a> </li>
    </ul>
</div>
        
    )
}

export default pure(Pagination);