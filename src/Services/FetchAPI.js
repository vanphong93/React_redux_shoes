import { dataBackUp } from "../assets/dataBackUp";
const BASE_URL = "https://62db6ca4d1d97b9e0c4f338f.mockapi.io";
export const shopSer = {
    pullData: async () => {
        const data = await fetch(`${BASE_URL}/shoeShop`);
        console.log("call API pull data");
        return data.json();
    },
    pullById: async (id) => {
        const data = await fetch(`${BASE_URL}/shoeShop/${id}`);
        console.log("call API pull data by ID");
        return data.json();
    },
    addData: async (data) =>
        fetch(`${BASE_URL}/shoeShop`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }),
    editData: async ({ id, price, name }) =>
        fetch(`${BASE_URL}/shoeShop/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, price }),
        }),
    deleteData: async (id) =>
        fetch(`${BASE_URL}/shoeShop/${id}`, {
            method: "DELETE",
        }),
    resetData: () => {
        let resetAllData = async (dataBackUp) => {
            const promises = [];
            dataBackUp.forEach((item) => {
                promises.push(shopSer.addData(item));
            });
            await Promise.all(promises).then(() => {
                alert("Reset data");
            });
        };
        return resetAllData(dataBackUp);
    },
};
