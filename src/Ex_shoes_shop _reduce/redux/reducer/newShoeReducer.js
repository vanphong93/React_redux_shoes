import { createSlice } from "@reduxjs/toolkit";
let initialization = [
    {
        id: 1,
        name: "Adidas Prophere",
        alias: "adidas-prophere",
        price: 350,
        description:
            "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n",
        shortDescription:
            "The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n",
        quantity: 995,
        image: "http://svcy3.myclass.vn/images/adidas-prophere.png",
    },
];
const shoeReducer = createSlice({
    name: "storeShoe",
    initialState: {
        detailShoe: initialization[0],
        gioHang: [],
        dataAllShoe: initialization,
    },
    reducers: {
        showDetail: (state, { payload }) => {
            state.detailShoe = payload;
        },
        addProduct: (state, { payload }) => {
            let i = state.gioHang.findIndex((item) => {
                return item.id === payload.id;
            });
            if (i === -1) {
                let newItem = { ...payload, soLuong: 1 };
                state.gioHang.push(newItem);
            } else state.gioHang[i].soLuong++;
        },
        increaseQuantity: (state, { payload }) => {
            let i = state.gioHang.findIndex((item) => {
                return item.id === payload.id;
            });
            state.gioHang[i].soLuong++;
        },
        dereaseQuantity: (state, { payload }) => {
            let i = state.gioHang.findIndex((item) => {
                return item.id === payload.id;
            });
            if (state.gioHang[i].soLuong > 1) {
                state.gioHang[i].soLuong--;
            }
        },
        removeProduct: (state, { payload }) => {
            let i = state.gioHang.findIndex((item) => {
                return item.id === payload.id;
            });
            state.gioHang.splice(i, 1);
        },
        buyProduct: (state) => {
            state.gioHang.splice(0);
            alert("Chúc mừng bạn đặt hàng thành công");
        },
        getDataAPI: (state, { payload }) => {
            state.dataAllShoe = payload;
        },
    },
});
export const {
    showDetail,
    addProduct,
    increaseQuantity,
    dereaseQuantity,
    removeProduct,
    buyProduct,
    getDataAPI,
} = shoeReducer.actions;
export default shoeReducer.reducer;
