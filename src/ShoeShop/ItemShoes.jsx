import React, { Component } from "react";
import { connect } from "react-redux";
import { ADD, DETAIL } from "./redux/constants/shoeConstants";
 class ItemShoes extends Component {
  render() {
    let { image, name,price } = this.props.detail;
    return (
      <div className="card my-2">
        <img src={image} className="card-img-top" alt={name} />
        <div className="card-body text-left">
          <h5>{name}</h5>
          <h5 className="text-warning">{price}$</h5>
        </div>
        <div className="card-footer text-left">
          <button
            type="button"
            onClick={() => {
              this.props.handleAdd(this.props.detail);
            }}
            className="btn btn-success"
          >
            Add
          </button>
          <a
            onClick={() => {
              this.props.handleDetail(this.props.detail);
            }}
            href="#info"
            role="button"
            className="btn btn-info mx-2"
          >
            Detail
          </a>
        </div>
      </div>
    );
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    handleAdd:(value) => { 
      dispatch({
        type:ADD,
        payload:value,
      })
     },
    handleDetail: (value) => {
      dispatch({
        type:DETAIL,
        payload:value,
      });
    },
  };
};
export default connect(null, mapDispatchToProps)(ItemShoes);