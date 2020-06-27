import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectors } from '../../reducers';
import { actions } from '../../ducks/area';

const ValueSelector = ({ name, value, setValue }) => {
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <label htmlFor={name}>{name}</label>
      <input id={name} value={value} type="text" onChange={onChange} />
    </div>
  );
};

const AreaSelector = ({
  area, setXmin, setXmax, setYmin, setYmax,
}) => (
  <>
    <form noValidate>
      <ValueSelector name="xmin" value={area.xmin} setValue={setXmin} />
      <ValueSelector name="ymin" value={area.ymin} setValue={setYmin} />
      <ValueSelector name="xmax" value={area.xmax} setValue={setXmax} />
      <ValueSelector name="ymax" value={area.ymax} setValue={setYmax} />
    </form>
  </>
);

AreaSelector.propTypes = {
  area: PropTypes.shape({
    xmin: PropTypes.string.isRequired,
  }).isRequired,
  setXmin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  area: selectors.area(state),
});

const mapDispathToProps = (dispatch) => ({
  setXmin: (value) => dispatch(actions.setXmin(value)),
  setXmax: (value) => dispatch(actions.setXmax(value)),
  setYmin: (value) => dispatch(actions.setYmin(value)),
  setYmax: (value) => dispatch(actions.setYmax(value)),
});

export default connect(mapStateToProps, mapDispathToProps)(AreaSelector);
