import React from "react";
import { BUY, DECREASE, INCREASE, REMOVE } from "../reducer/constant";
export function Cart({ itemCart, dispatch }) {
    let totalPrice = 0;
    const handleIncrease = (item) =>
        dispatch({ type: INCREASE, payload: item });
    const handleDecrease = (item) =>
        dispatch({ type: DECREASE, payload: item });
    const handleRemove = (item) => dispatch({ type: REMOVE, payload: item });
    const handleBuy = () => dispatch({ type: BUY });
    const renderBody = () => {
        return itemCart.map((item, i) => {
            totalPrice += item.price * item.quantityBuy;
            return (
                <tr key={i}>
                    <td>{item.name}</td>
                    <td className="priceShoe">
                        {item.price * item.quantityBuy}$
                    </td>
                    <td>
                        <img src={item.image} style={{ width: 80 }} alt="" />
                    </td>
                    <td className="d-flex">
                        <button
                            onClick={() => {
                                handleIncrease(item);
                            }}
                            className="btn btn-primary mx-2"
                        >
                            +
                        </button>
                        <span>{item.quantityBuy}</span>
                        <button
                            onClick={() => {
                                handleDecrease(item);
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
                                handleRemove(item);
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
    return (
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
                        <tbody>{renderBody()}</tbody>
                    </table>
                </div>
                <div className="modal-footer">
                    <h5>
                        Total:<span>{totalPrice}$</span>
                    </h5>
                    <button
                        onClick={() => {
                            handleBuy();
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
    );
}
