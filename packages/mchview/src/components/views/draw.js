import * as d3 from 'd3';
import Occupancy from '../../models/Occupancy';

const colorScheme = d3.scaleSequential(d3.interpolateYlGnBu);

const changeValues = (dualsampasJSON) => {
  for (let i = 0; i < dualsampasJSON.length; i++) {
    dualsampasJSON[i].Value = Math.random();
  }
};

const dataValue = (i) => {
  const a = Occupancy.data.DualSampas;
  if (!a) {
    return 0;
  }
  const o = a[i];
  const mean = o.Mean / 0.01;
  return mean;
};

const updateValues = (allds) => {
  allds.attr('fill', (d, i) => colorScheme(dataValue(i)));
};

const createSVG = (degeo, className) => {
  const sx = degeo.SX;
  const sy = degeo.SY;
  const xleft = degeo.X - sx / 2.0;
  const ybottom = degeo.Y - sy / 2.0;

  const aspectRatio = (1.0 * sy) / sx;

  const w = 800;

  const svg = d3
    .select('.deview')
    .append('svg')
    .attr('width', w)
    .attr('height', 20 + aspectRatio * w)
    .attr('viewBox', `0 0 ${sx} ${sy}`);

  return svg
    .append('g')
    .attr('class', className)
    .attr('transform', `translate(${-xleft},${-ybottom})`);
};

const createSVGDualSampas = (dsDOM, style, dualsampasJSON) => {
  const allds = dsDOM
    .selectAll('polygon')
    .data(dualsampasJSON)
    .enter()
    .append('polygon')
    .attr('fill', style.fillDefaultColor)
    .attr('stroke', style.strokeColor)
    .attr('stroke-width', style.strokeWidth)
    .attr('class', (d) => `dualsampa DS${d.ID}`)
    .attr('points', (d) => d.Vertices.map((v) => [v.X, v.Y].join(',')).join(' '))
    .on('mouseover', function (d) {
      d3.select(this).attr('fill', style.fillHighlightColor);
    })
    .on('mouseout', function (d) {
      d3.select(this).attr('fill', style.fillDefaultColor);
    });
  if (style.filled) {
    allds
      .on('mouseout', function (d) {
        d3.select(this).attr('fill', (d, i) => colorScheme(dataValue(i)));
      })
      .on('click', () => {
        changeValues(dualsampasJSON);
        updateValues(allds, style.filled == true);
      });
  }
  if (style.filled) {
    updateValues(allds);
  }
};

const drawPads = (seg) => {
  const viewport = d3.select('.deview');
  seg.dualSampas.map((d) => {
    viewport.append('p').text(d.ID);
  });
};

const drawDualSampas = (strokeWidth, seg) => {
  const svg = createSVG(seg.degeo, 'dualsampas');
  createSVGDualSampas(svg, strokeWidth, seg.dualSampas);
};

const drawDEs = (seg) => {
  const viewport = d3.select('.deview');
  viewport.append('p').text(JSON.stringify(seg.degeo));
};

const drawOutline = (props, seg) => {
  d3.selectAll('.deview > *').remove();
  if (props.pads === true) {
    drawPads(seg);
  }
  if (props.dualSampas === true) {
    drawDualSampas(
      {
        strokeWidth: 0.2,
        strokeColor: 'black',
        filled: true,
        fillDefaultColor: '#cdcdcd',
        fillHighlightColor: 'yellow',
      },
      seg,
    );
  }
  if (props.des === true) {
    drawDEs(seg);
  }
};

export default drawOutline;
