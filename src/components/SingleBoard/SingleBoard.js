import './SingleBoard.scss';
import React from 'react';
import PropTypes from 'prop-types';
import boardData from '../../helpers/data/boardsData';
import pinData from '../../helpers/data/pinData';
import Pins from '../Pins/Pins';
import PinForm from '../PinForm/PinForm';

class SingleBoard extends React.Component {
  static propTypes = {
    selectedBoardId: PropTypes.string,
    setSingleBoard: PropTypes.func,
  }

  state = {
    board: {},
    pins: [],
  }

  getPinData = (selectedBoardId) => {
    pinData.getPinsByBoardId(selectedBoardId)
      .then((pinResults) => {
        this.setState({ pins: pinResults });
      }).catch((err) => console.error(err));
  };

  componentDidMount() {
    const { selectedBoardId } = this.props;
    boardData.getSingleBoard(selectedBoardId)
      .then((results) => {
        this.setState({ board: results.data });
        this.getPinData(selectedBoardId);
      }).catch((err) => console.error(err));
  }

  removeSelectedBoardId = (e) => {
    e.preventDefault();
    const { setSingleBoard } = this.props;
    setSingleBoard(null);
  }

  removePin = (pinId) => {
    const { selectedBoardId } = this.props;
    pinData.deletePin(pinId)
      .then(() => {
        this.getPinData(selectedBoardId);
      }).catch((err) => console.error(err));
  }

  addPin = (pinObj) => {
    const { selectedBoardId } = this.props;
    pinData.newPin(pinObj)
      .then(() => {
        this.getPinData(selectedBoardId);
      }).catch((err) => console.error(err));
  }

  render() {
    const { board, pins } = this.state;

    return (
      <div>
        <button className="btn btn-info" onClick={this.removeSelectedBoardId}>x Close Board View</button>
        <PinForm addNewPin={this.addPin} selectedBoardId={this.props.selectedBoardId} />
        <div className="SingleBoard col-8 offset-2">
          <h2>{board.name}</h2>
          <p>{board.description}</p>
          <div className="d-flex flex-wrap">
            {pins.map((pin) => <Pins key={pin.id} pin={pin} trash={this.removePin} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default SingleBoard;
