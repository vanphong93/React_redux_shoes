import React, { Component } from "react";
import { connect } from "react-redux";
import {
    handleBuy,
    handleDecrease,
    handleIncrease,
    handleRemove,
} from "./redux/actions/actionsShoe";
class GioHang extends Component {
    totalPrice = 0;
    renderBody = () => {
        this.totalPrice = 0;

        return this.props.gioHang.map((item, i) => {
            this.totalPrice += item.price * item.soLuong;
            return (
                <tr key={i}>
                    <td>{item.name}</td>
                    <td className="priceShoe">{item.price * item.soLuong}$</td>
                    <td>
                        <img src={item.image} style={{ width: 80 }} alt="" />
                    </td>
                    <td className="d-flex">
                        <button
                            onClick={() => {
                                this.props.dispatch(handleIncrease(item));
                            }}
                            className="btn btn-primary mx-2"
                        >
                            +
                        </button>
                        <span>{item.soLuong}</span>
                        <button
                            onClick={() => {
                                this.props.dispatch(handleDecrease(item));
                            }}
                            className="btn btn-warning mx-2"
                        >
                            -
                        </button>
                    </td>
                    <td>
                        {" "}
                        <button
                            onClick={() => {
                                this.props.dispatch(handleRemove(item));
                            }}
                            className="btn btn-danger mx-2"
                        >
                            X
                        </button>
                    </td>
                </tr>
            );
        });
    };
    render() {
        return (
            <div className="my-4">
                <button
                    type="button"
                    className="btn btn-outline-warning btn-lg"
                    data-toggle="modal"
                    data-target="#exampleModal"
                >
                    Shop
                </button>
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body p-0">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Product</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Quality</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>{this.renderBody()}</tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <h5>
                                    Total:<span>{this.totalPrice}$</span>
                                </h5>
                                <button
                                    onClick={(e) => {
                                        this.props.dispatch(handleBuy());
                                    }}
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    Buy
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
let mapStateToProps = (state) => {
    return {
        gioHang: state.shoeReducer.gioHang,
    };
};

export default connect(mapStateToProps, null)(GioHang);
