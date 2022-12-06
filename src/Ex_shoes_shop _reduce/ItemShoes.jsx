import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { shopSer } from "../Services/FetchAPI";
export function ItemShoes({ detail, setIsDetail, handleAddCart }) {
    const queryClient = useQueryClient();
    const addTodoMutation = useMutation(shopSer.deleteData, {
        onSuccess: () => {
            queryClient.invalidateQueries(["repoData"]);
        },
    });
    let { image, name, price, id } = detail;
    return (
        <div className="card my-2">
            <img src={image} className="card-img-top" alt={name} />
            <div className="card-body text-left">
                <h5>{name}</h5>
                <h5 className="text-warning">{price}$</h5>
            </div>
            <div className="card-footer text-left">
                <a
                    onClick={() => {
                        handleAddCart(detail);
                    }}
                    type="button"
                    className="text-warning mx-1"
                >
                    Add to Cart
                </a>
                <a
                    onClick={() => {
                        addTodoMutation.mutate(id);
                    }}
                    type="button"
                    className="text-danger mx-1"
                >
                    Delete
                </a>
                <a
                    onClick={() => {
                        document.getElementById("idShoe").value = id;
                        document.getElementById("editShoe").value = name;
                        document.getElementById("editPrice").value = price;
                    }}
                    data-toggle="modal"
                    data-target="#updateModal"
                    role="button"
                    className="text-success mx-1"
                >
                    Update
                </a>
                <a
                    onClick={() => {
                        setIsDetail(id);
                    }}
                    role="button"
                    className=" mx-2"
                >
                    {queryClient.getQueryData(["detail", id])
                        ? "Watched"
                        : "Detail"}
                </a>
            </div>
        </div>
    );
}
