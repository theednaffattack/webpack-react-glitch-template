import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import { colourOptions } from '../data/data';
import { colourStyles } from '../styles/colourStyles';


export default ({colourOptions, defaultValues, handleBlur, handleChange, isMulti, error, touched}) => {
  return (
    <div>
      <Select
        closeMenuOnSelect={true}
        components={makeAnimated()}
        defaultValue={defaultValues}
        isMulti={isMulti}
        options={colourOptions}
        styles={colourStyles}
        onChange={handleChange}
        onBlur={handleBlur}
      />

        {!!error &&
          touched && (
            <div style={{ color: 'red', marginTop: '.5rem' }}>{error}</div>
          )}
    </div>
  );
}