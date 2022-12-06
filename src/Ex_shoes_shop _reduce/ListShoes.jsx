import React, { useReducer } from "react";

import { ItemShoes } from "./ItemShoes";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { shopSer } from "../Services/FetchAPI";
import { Cart } from "./Cart";
import { CardReducer } from "../reducer/CardReducer";
import { ADD } from "../reducer/constant";

export function ListShoes({ setIsDetail }) {
    const [state, dispatch] = useReducer(CardReducer, { itemCart: [] });
    const { itemCart } = state;
    const totalItemBuy = itemCart.reduce(
        (total, item) => total + item.quantityBuy,
        0
    );
    console.log("totalItemBuy: ", totalItemBuy);
    const queryClient = useQueryClient();
    const { isLoading, error, data } = useQuery(["repoData"], shopSer.pullData);
    const addTodoMutation = useMutation(shopSer.addData, {
        onSuccess: () => {
            queryClient.invalidateQueries(["repoData"]);
        },
    });
    const editTodoMutation = useMutation(shopSer.editData, {
        onSuccess: () => {
            queryClient.invalidateQueries(["repoData"]);
        },
    });
    const resetMutation = useMutation(shopSer.resetData, {
        onSuccess: () => {
            queryClient.invalidateQueries(["repoData"]);
        },
    });
    const handleAddCart = (item) => dispatch({ type: ADD, payload: item });
    if (isLoading) return "Loading...";
    if (error) return "An error";
    return (
        <div className="">
            <div className="p-5">
                <nav className="navbar fixed-top justify-content-center navbar-expand-lg navbar-light bg-light">
                    <button
                        type="button"
                        className="btn btn-warning btn-xl-lg mx-1"
                        data-toggle="modal"
                        data-target="#shopModal"
                    >
                        Shop {totalItemBuy ? totalItemBuy : ""}
                    </button>
                    <button
                        data-toggle="modal"
                        data-target="#addModal"
                        className="btn btn-success mx-1"
                    >
                        Add Data
                    </button>
                    <button
                        onClick={() => {
                            resetMutation.mutate();
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
                    <Cart
                        {...{
                            itemCart,
                            dispatch,
                        }}
                    />
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
                                    <label htmlFor="">Price:</label>
                                    <input
                                        id="priceShoe"
                                        className="mx-2 w-100"
                                        type={"number"}
                                    />
                                </section>
                            </div>
                            <div className="modal-footer">
                                <button
                                    data-dismiss="modal"
                                    onClick={() => {
                                        let name =
                                            document.getElementById(
                                                "addShoe"
                                            ).value;
                                        let price =
                                            document.getElementById(
                                                "priceShoe"
                                            ).value;
                                        addTodoMutation.mutate({
                                            name,
                                            price,
                                        });
                                    }}
                                    className="btn btn-success"
                                >
                                    Add
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
                                    <label htmlFor="">ID</label>
                                    <input
                                        id="idShoe"
                                        className="mx-2 w-100"
                                        disabled
                                    />
                                </section>
                                <section>
                                    {" "}
                                    <label htmlFor="">New Name:</label>
                                    <input
                                        id="editShoe"
                                        className="mx-2 w-100"
                                        type="text"
                                    />
                                </section>
                                <section>
                                    {" "}
                                    <label htmlFor="">New Price:</label>
                                    <input
                                        type={"number"}
                                        id="editPrice"
                                        className="mx-2 w-100"
                                    />
                                </section>
                            </div>
                            <div className="modal-footer">
                                <button
                                    onClick={() => {
                                        let name =
                                            document.getElementById(
                                                "editShoe"
                                            ).value;
                                        let price =
                                            document.getElementById(
                                                "editPrice"
                                            ).value;
                                        let id =
                                            document.getElementById(
                                                "idShoe"
                                            ).value;
                                        editTodoMutation.mutate({
                                            name,
                                            id,
                                            price,
                                        });
                                    }}
                                    className="btn btn-dark"
                                    data-dismiss="modal"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="container mx-auto row justify-content-center">
                {" "}
                {data.map((item, i) => {
                    return (
                        <div key={i} className="col-sm-6 col-md-4">
                            <ItemShoes
                                handleAddCart={handleAddCart}
                                setIsDetail={setIsDetail}
                                detail={item}
                            />
                        </div>
                    );
                })}
            </section>
        </div>
    );
}
