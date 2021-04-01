import _ from "lodash";

function paginate(data, pageNber, pageSize) {
    const startIndex = (pageNber - 1) * pageSize;
    return _(data)
    .slice(startIndex)
    .take(pageSize)
    .value()
}

export default paginate;