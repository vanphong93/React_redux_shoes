import React, { Component } from "react";
import ItemShoes from "./ItemShoes";
import { connect } from "react-redux";
import { getDataFromAPI } from "./redux/actions/actions";
import { shoeSer } from "./Services/shoeServices";
export const BASE_URL = "https://62db6ca4d1d97b9e0c4f338f.mockapi.io";
class ListShoes extends Component {
    async getData() {
        try {
            let { data } = await shoeSer.getData();
            this.props.dispatch(getDataFromAPI(data));
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
                    {this.props.dataShoes.map((item, i) => {
                        return (
                            <div key={i} className=" col-md-6 col-xl-4 ">
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

export default connect(mapStateToProps)(ListShoes);
