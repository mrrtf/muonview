import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { pickBy } from "lodash";
import { actions as viewActions } from "../../ducks/view";
import { encode } from "../../categories";

const Polygon = ({ poly, fillColor, classname }) => {
  const dispatch = useDispatch();
  const element = useRef(null);

  const st = {
    fill: fillColor || "red",
    fillOpacity: fillColor ? 1 : 0,
  };

  let comp = <p>Polygon is not defined</p>;

  if (poly) {
    // window.getComputedStyle()
    //
    comp = (
      <polygon
        className={classname}
        ref={element}
        id={encode(poly.id)}
        key={encode(poly.id)}
        data-value={poly.value}
        points={poly.vertices.map((v) => [v.x, v.y].join(","))}
        style={st}
        onMouseEnter={() => {
          dispatch(
            viewActions.setCurrentElement({
              ...poly,
              style: pickBy(
                window.getComputedStyle(element.current),
                (value, key) => key.startsWith("stroke")
              ),
            })
          );
        }}
        onMouseOut={() => {
          dispatch(viewActions.setCurrentElement(null));
        }}
      />
    );
  }
  return comp;
};
Polygon.propTypes = {
  poly: PropTypes.shape({
    id: PropTypes.Object,
    vertices: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
      })
    ),
    value: PropTypes.number,
  }),
  fillColor: PropTypes.string,
  classname: PropTypes.string,
};

export default Polygon;
