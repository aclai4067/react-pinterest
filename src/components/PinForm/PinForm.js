import './PinForm.scss';
import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../helpers/data/authData';

class PinForm extends React.Component {
  static propTypes = {
    addNewPin: PropTypes.func,
  }

  state = {
    pinImageUrl: '',
    pinTitle: '',
  }

  savePinEvent = (e) => {
    e.preventDefault();
    const saveNewPin = this.props.addNewPin;
    const newPinObj = {
      imageUrl: this.state.pinImageUrl,
      title: this.state.pinTitle,
      uid: authData.getUid(),
      boardId: this.props.selectedBoardId,
    };
    saveNewPin(newPinObj);
    this.setState({ pinTitle: '', pinImageUrl: '' });
  }

  addTitle = (e) => {
    e.preventDefault();
    this.setState({ pinTitle: e.target.value });
  }

  addImgUrl = (e) => {
    e.preventDefault();
    this.setState({ pinImageUrl: e.target.value });
  }

  render() {
    return (
      <form className='col-6 offset-3 PinForm'>
        <div className="form-group">
          <label htmlFor="pin-title">Pin Title:</label>
          <input
            type="text"
            className="form-control"
            id="pin-title"
            placeholder="Cat Pic"
            value={this.state.pinTitle}
            onChange={this.addTitle}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pin-image-url">Pin Image Url:</label>
          <input
            type="text"
            className="form-control"
            id="pin-image-url"
            placeholder="https://www.google.com"
            value={this.state.pinImageUrl}
            onChange={this.addImgUrl}
          />
        </div>
        <button className="btn btn-secondary" onClick={this.savePinEvent}>Add Pin</button>
      </form>
    );
  }
}

export default PinForm;
