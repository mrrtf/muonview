/* eslint jsx-a11y/label-has-associated-control: ["off"] */

import React, { useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CloseButton from "../ui/CloseButton";
import FetchButton from "../ui/FetchButton";
import { actions as visibilityActions } from "../../ducks/visibility";
import { selectors } from "../../reducers";

const fetchOccupancy = (deid, timestamp = 0, url = "") => {
  const qurl = `${url}/occupancymap?deid=${deid}&run=${timestamp}`;
  return fetch(qurl).then((response) => response.json());
};

const CCDBSelector = ({ deid, title, hideModal }) => {
  const timestamp = useRef();
  const url = useRef();

  return (
    <main>
      <header>
        <h1>{title}</h1>
        <CloseButton />
      </header>
      <fieldset>
        <label htmlFor="timestamp">Timestamp (run number for the moment)</label>
        <input
          ref={timestamp}
          id="timestamp"
          type="text"
          pattern="[0-9]{6}"
          required="required"
          size="6"
        />
        <label htmlFor="source_url">Source URL</label>
        <input
          ref={url}
          id="source_url"
          type="text"
          pattern="https?://.+"
          placeholder="https://"
        />
      </fieldset>
      <FetchButton
        fetcher={() =>
          fetchOccupancy(deid, timestamp.current.value, url.current.value)
        }
        finalizer={hideModal}
      />
    </main>
  );
};

const mapStateToProps = (state) => ({
  deid: selectors.deid(state),
});

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(visibilityActions.hideModal()),
});

CCDBSelector.propTypes = {
  deid: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  hideModal: PropTypes.bool,
};
export default connect(mapStateToProps, mapDispatchToProps)(CCDBSelector);
