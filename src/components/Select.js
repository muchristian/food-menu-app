import React from 'react';
import Select from 'react-select';

export default ({ onChange, options, value }) => {
    const defaultValue = (options, value) => {
        return options ? options.find(option=>option.value === value): ""
    }
    return (
        <div>
            <Select
                value={defaultValue(options, value)}
                onChange={value=>onChange(value)}
                options={options}
                />
        </div>
    );
}