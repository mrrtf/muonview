import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import Slider from '@material-ui/core/Slider';

const valuetext = (value) => `#${value}`;

const DataSourceSlider = ({ index }) => {
  const nitems = index.index.length;
  const [value, setValue] = useState(nitems / 2);
  return (
    <Card>
      <CardHeader title={index.filename} subheader={index.format} />
      <CardContent>
        <Slider
          getAriaValueText={valuetext}
          valueLabelDisplay="on"
          //          defaultValue={nitems / 2}
          // marks
          // step={1}
          max={nitems - 1}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </CardContent>
      <CardActions>
        <Button size="small">Remove Data Source</Button>
      </CardActions>
    </Card>
  );
};

export default DataSourceSlider;
