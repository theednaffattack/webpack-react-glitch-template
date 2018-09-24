import React from 'react';

import { colourOptions } from '../data/data';
import { colourStyles } from '../styles/colourStyles';
import Select from 'react-select';



export default () => (
  <Select
    closeMenuOnSelect={false}
    defaultValue={[colourOptions[0], colourOptions[1]]}
    isMulti
    options={colourOptions}
    styles={colourStyles}
    onChange={this.handleChange}
    onBlur={this.handleBlur}
  />
);