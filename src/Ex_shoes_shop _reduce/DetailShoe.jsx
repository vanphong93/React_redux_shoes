import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { shopSer } from "../Services/FetchAPI";
export function DetailShoe({ isDetail, setIsDetail }) {
    const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery(
        ["detail", isDetail],
        () => {},
        // () => shopSer.pullById(isDetail),
        {
            initialData: () => {
                return queryClient.getQueryData(["repoData"]).find((item) => {
                    return item.id === isDetail;
                });
            },
            staleTime: Infinity,
        }
    );
    //can get data by id, no need to call API with slateTime, initialData
    if (isLoading) return "Loading...";
    if (error)
        return (
            <>
                <h1>Error</h1>
                <a
                    onClick={() => {
                        setIsDetail(-1);
                    }}
                    role="button"
                    className="btn btn-info"
                >
                    Back
                </a>
            </>
        );
    let { image, name, price, description } = data;
    return (
        <div className="container p-5">
            <img src={image} alt={name} />
            <h5>{name}</h5>
            <h5 className="text-warning">{price}$</h5>
            <p>{description}</p>
            <a
                onClick={() => {
                    setIsDetail(-1);
                }}
                role="button"
                className="btn btn-info"
            >
                Back
            </a>
        </div>
    );
}
