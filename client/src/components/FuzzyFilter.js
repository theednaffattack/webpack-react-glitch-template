import React, {Component} from 'react';
import fuzzyFilterFactory from 'react-fuzzy-filter';

// these components share state and can even live in different components
const {InputFilter, FilterResults} = fuzzyFilterFactory();

class FuzzyFilter extends Component {
  render() {
    const items = [
      { name: 'first', meta: 'first|123', tag: 'a' },
      { name: 'second', meta: 'second|443', tag: 'b' },
      { name: 'third', meta: 'third|623', tag: 'a' },
    ];
    const fuseConfig = {
      keys: ['meta', 'tag']
    };
    return (
      <div>
        <InputFilter debounceTime={200} />
        <div>Any amount of content between</div>
        <FilterResults
          items={items}
          fuseConfig={fuseConfig}>
          {filteredItems => {
            return(
              <div>
                {filteredItems.map(item => <div>{item.name}</div>)}
              </div>
            )
          }}
        </FilterResults>
      </div>
    );
  }
}

module.exports = { FuzzyFilter };