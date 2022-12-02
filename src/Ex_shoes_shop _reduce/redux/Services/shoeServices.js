import { https } from "./configURL";

export const shoeSer = {
    getData: () => https.get("/shoeShop"),
    deleteData: (id) => https.delete(`/shoeShop/${id}`),
    createData: (item) => https.post("/shoeShop", item),
    updateData: (item, id) => https.put(`/shoeShop/${id}`, item),
};
