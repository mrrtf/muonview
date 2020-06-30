import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectors } from '../../reducers';
import { describeId, isValid } from '../../categories';

export const PureCurrentElement = ({ id, value }) => {
  if (!id) {
    return (
      <div>
        <p>No current element under the (mouse) cursor.</p>
      </div>
    );
  }
  return (
    <div>
      <ul>
        <li>
          {describeId(id)}
          {isValid(id) ? '' : <span>[ Invalid ID ]</span>}
        </li>
        {value ? (
          <li>
            <span>Value</span>
            {value}
          </li>
        ) : null}
      </ul>
    </div>
  );
};
PureCurrentElement.propTypes = {
  id: PropTypes.object,
  value: PropTypes.number,
};

export default connect((state) => {
  const ce = selectors.currentElement(state);
  return ce || {};
})(PureCurrentElement);
