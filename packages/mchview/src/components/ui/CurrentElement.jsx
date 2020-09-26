import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { describeId, isValid } from "../../categories";

const CurrentElement = ({ element }) => {
  if (!element) {
    return (
      <div>
        <ul>
          <li>
            <Typography>
              No current element under the (mouse) cursor.
            </Typography>
          </li>
        </ul>
      </div>
    );
  }
  const { id, value } = element;
  return (
    <div>
      <ul>
        <li>
          <Typography>
            {describeId(id)}
            {isValid(id) ? "" : <span>[ Invalid ID ]</span>}
          </Typography>
        </li>
        {value ? (
          <li>
            <Typography>
              <span>Value</span>
              {value}
            </Typography>
          </li>
        ) : null}
      </ul>
    </div>
  );
};
CurrentElement.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.object,
    value: PropTypes.number,
  }),
};

export default CurrentElement;
