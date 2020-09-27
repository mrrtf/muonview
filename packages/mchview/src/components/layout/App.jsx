import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "@material-ui/core/Modal";
import MainStage from "./MainStage";
import BottomBar from "./BottomBar";
import { selectors } from "../../reducers";
import CCDBSelector from "../selectors/CCDBSelector";

const App = ({ modal }) => (
  <div>
    <MainStage />
    <BottomBar />
    {modal ? (
      <Modal>
        <CCDBSelector title="Fetch Occupancy Map" />
      </Modal>
    ) : null}
  </div>
);

App.propTypes = {
  modal: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  modal: selectors.isModalVisible(state),
});

export default connect(mapStateToProps)(App);
