import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import Target from "./Target";

const svgPoint = (x, y, svg) => {
  const point = svg.createSVGPoint();
  point.x = x;
  point.y = y;
  return point.matrixTransform(svg.getScreenCTM().inverse());
};

const cursorPoint = (event, svg) => svgPoint(event.clientX, event.clientY, svg);

const SVGView = ({
  geo,
  children,
  initialOffset = { x: 0, y: 0 },
  initialZoom = 1,
}) => {
  const [point, setPoint] = useState(null);
  const [panStart, setPanStart] = useState(null);
  const [zoom, setZoom] = useState(initialZoom);
  const [translation, setTranslation] = useState({
    x: initialOffset.x,
    y: initialOffset.y,
  });
  const isPanning = () => panStart != null;

  const limitZoomRange = (z) => Math.min(Math.max(0.1, z), 10);

  const svgRef = useRef();
  if (!geo) {
    return null;
  }

  if (translation === 0) {
    return null;
  }

  const vx = geo.sx;
  const vy = geo.sy;

  const transform = `translate(${translation.x},${translation.y}) scale(${zoom})`;

  return (
    <svg
      ref={svgRef}
      width="97vw"
      height="97vh"
      viewBox={`0 0 ${vx} ${vy}`}
      onWheel={(event) => {
        if (isPanning()) {
          return;
        }
        if (!point) {
          return;
        }
        let newZoom = zoom + event.deltaY * -0.01;
        newZoom = limitZoomRange(newZoom);
        setTranslation(({ x, y }) => ({
          x: point.x - (newZoom * (point.x - x)) / zoom,
          y: point.y - (newZoom * (point.y - y)) / zoom,
        }));
        setZoom(newZoom);
      }}
      onMouseLeave={() => setPoint(null)}
      onContextMenu={(event) => {
        event.preventDefault();
      }}
      onMouseDown={(event) => {
        event.preventDefault();
        setPanStart({
          x: point.x - translation.x,
          y: point.y - translation.y,
        });
      }}
      onMouseUp={(event) => {
        event.preventDefault();
        setPanStart(null);
      }}
      onMouseMove={(event) => {
        event.preventDefault();
        const p = cursorPoint(event, svgRef.current);
        setPoint(p);
        if (!isPanning()) {
          return;
        }
        if (p) {
          setTranslation({
            x: p.x - panStart.x,
            y: p.y - panStart.y,
          });
        }
      }}
    >
      <g transform={transform}>{children}</g>
      {point ? (
        <Target x={point.x} y={point.y} scale={0.5} color="yellow" />
      ) : null}
    </svg>
  );
};

SVGView.propTypes = {
  geo: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    sx: PropTypes.number,
    sy: PropTypes.number,
  }),
  initialOffset: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  initialZoom: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default SVGView;
