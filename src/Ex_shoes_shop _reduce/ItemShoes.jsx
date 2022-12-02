import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAdd, handleDetail } from "./redux/actions/actionsShoe";

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
              this.props.dispatch(handleAdd(this.props.detail));
            }}
            className="btn btn-success"
          >
            Add
          </button>
          <a
            onClick={() => {
              this.props.dispatch(handleDetail(this.props.detail));
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

export default connect(null, null)(ItemShoes);