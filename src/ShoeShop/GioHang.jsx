import React, { Component } from "react";
import { connect } from "react-redux";
import {
    handleAddShoe,
    handleBackUp,
    handleBuy,
    handleDecrease,
    handleDelete,
    handleIncrease,
    handleRemove,
    handleUpdate,
} from "./redux/actions/actions";
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
            <div className="p-5">
                <nav className="navbar fixed-top justify-content-center navbar-expand-lg navbar-light bg-light">
                    <button
                        type="button"
                        className="btn btn-warning btn-xl-lg mx-1"
                        data-toggle="modal"
                        data-target="#shopModal"
                    >
                        Shop
                    </button>
                    <button
                        data-toggle="modal"
                        data-target="#deleteModal"
                        className="btn btn-danger mx-1"
                    >
                        Delete
                    </button>
                    <button
                        data-toggle="modal"
                        data-target="#addModal"
                        className="btn btn-success mx-1"
                    >
                        Add Data
                    </button>
                    <button
                        data-toggle="modal"
                        data-target="#updateModal"
                        className="btn btn-dark mx-1"
                    >
                        Update
                    </button>
                    <button
                        onClick={() => {
                            this.props.dispatch(handleBackUp())
                        }}
                        className="btn btn-info mx-1"
                    >
                        Reset
                    </button>
                </nav>
                {/* modal shop */}
                <div
                    className="modal shop fade"
                    id="shopModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
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
                                    onClick={() => {
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
                {/* modal delete */}
                <div
                    className="modal delete fade"
                    id="deleteModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <label htmlFor="">Name:</label>
                                <input
                                    id="shoeName"
                                    defaultValue={"Adidas Prophere"}
                                    className="mx-2"
                                    type="text"
                                />
                                <button
                                    onClick={() => {
                                        let shoeName =
                                            document.getElementById(
                                                "shoeName"
                                            ).value;
                                        this.props.dispatch(
                                            handleDelete(shoeName)
                                        );
                                    }}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </div>
                            <div className="modal-footer">
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
                {/* modal add item */}
                <div
                    className="modal add fade"
                    id="addModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <section>
                                    {" "}
                                    <label htmlFor="">Name:</label>
                                    <input
                                        id="addShoe"
                                        className="mx-2 w-100"
                                        type="text"
                                    />
                                </section>
                                <section>
                                    {" "}
                                    <label htmlFor="">Description:</label>
                                    <textarea id="des" className="mx-2 w-100" />
                                </section>
                            </div>
                            <div className="modal-footer">
                                <button
                                    onClick={() => {
                                        let shoeName =
                                            document.getElementById(
                                                "addShoe"
                                            ).value;
                                        let des =
                                            document.getElementById(
                                                "des"
                                            ).value;
                                        this.props.dispatch(
                                            handleAddShoe(shoeName, des)
                                        );
                                    }}
                                    className="btn btn-success"
                                >
                                    Add
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
                {/* modal edit item */}
                <div
                    className="modal add fade"
                    id="updateModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <section>
                                    {" "}
                                    <label htmlFor="">Name:</label>
                                    <input
                                        id="editShoe"
                                        className="mx-2 w-100"
                                        type="text"
                                    />
                                </section>
                                <section>
                                    {" "}
                                    <label htmlFor="">Description:</label>
                                    <textarea
                                        id="editDes"
                                        className="mx-2 w-100"
                                    />
                                </section>
                            </div>
                            <div className="modal-footer">
                                <button
                                    onClick={() => {
                                        let shoeName =
                                            document.getElementById(
                                                "editShoe"
                                            ).value;
                                        let des =
                                            document.getElementById(
                                                "editDes"
                                            ).value;
                                        this.props.dispatch(
                                            handleUpdate(shoeName, des)
                                        );
                                    }}
                                    className="btn btn-dark"
                                >
                                    Update
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
export default connect(mapStateToProps,null)(GioHang);
