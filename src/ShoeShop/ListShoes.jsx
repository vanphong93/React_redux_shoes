import React, { Component } from "react";
import axios from "axios";
import ItemShoes from "./ItemShoes";
import { connect } from "react-redux";
export const BASE_URL = "https://62db6ca4d1d97b9e0c4f338f.mockapi.io";
let initialization = [
    {
        id: 1,
        name: "Adidas Prophere",
        alias: "adidas-prophere",
        price: 350,
        description:
            "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.",
        shortDescription:
            "The midsole contains 20% more Boost for an amplified Boost feeling.",
        quantity: 995,
        image: "http://svcy3.myclass.vn/images/adidas-prophere.png",
    },
];
class ListShoes extends Component {
    // state = {
    //     shoeArr: initialization,
    // };
    async getData() {
        try {
            let { data } = await axios({
                url: `${BASE_URL}/shoeShop`,
                method: "GET",
            });
            // this.setState({
            //     shoeArr: data,
            // });
            this.props.dispatch({
                type: "getData",
                payload: data,
            });
        } catch (error) {
            console.log("error: ", error);
        }
    }
    componentDidMount() {
        this.getData();
    }
    render() {
        let { name, price, description } = this.props.detailShoe;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    {this.props.dataShoes.map((item,i) => {
                        return (
                            <div key={i} className="col-4">
                                <ItemShoes detail={item} />
                            </div>
                        );
                    })}
                </div>
                <div id="info" className="container row mt-5">
                    <img
                        className="col-4"
                        src={this.props.detailShoe.image}
                        alt=""
                    />
                    <p className="col-8 text-left text-success">
                        <span className="text-dark font-weight-bold">
                            {name}
                        </span>
                        <br />
                        <span className="text-danger">{price}$</span>
                        <br />
                        <span className="text-secondary">{description}</span>
                    </p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        detailShoe: state.shoeReducer.detailShoe,
        dataShoes: state.shoeReducer.dataShoes,
    };
};

export default connect(mapStateToProps, null)(ListShoes);
