//use fetch and async
import { BASE_URL } from "./configUrl";
export const withFetchSer = {
    getData: () => {
        return fetch(`${BASE_URL}/shoeShop`).then((res) => res.json());
    },
    deleteData: (id) => {
        return fetch(`${BASE_URL}/shoeShop/${id}`, {
            method: "DELETE",
        });
    },
    createData: (data) => {
        return fetch(`${BASE_URL}/shoeShop`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    },
    updateData: (id, data) => {
        return fetch(`${BASE_URL}/shoeShop/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    },
};
