import { https } from "./configUrl";

export const shoeSer = {
    getData: () => {
        return https
            .get("/shoeShop")
            .then((res) => res.data)
            .catch((err) => {
                console.log(err);
            });
    },
    deleteData: (id) => {
        return https
            .delete(`/shoeShop/${id}`)
            .then(() => console.log("Delete OK"))
            .catch((err) => {
                console.log("Something wrong");
                console.log("err: ", err);
            });
    },
    createData: (item) => {
        return https
            .post("/shoeShop", item)
            .then(() => console.log("Add item OK"))
            .catch((err) => {
                console.log("Something wrong");
                console.log("err: ", err);
            });
    },
    updateData: (id, item) => {
        return https
            .put(`/shoeShop/${id}`, item)
            .then(() => console.log("update OK"))
            .catch((err) => {
                console.log("something wrong");
                console.log("err: ", err);
            });
    },
};
