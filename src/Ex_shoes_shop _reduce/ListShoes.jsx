import React, { Component } from "react";
import ItemShoes from "./ItemShoes";
import { connect } from "react-redux";

import { fetchData } from "./redux/actions/actionsSaga";
class ListShoes extends Component {
    componentDidMount() {
        this.props.dispatch(fetchData());
    }
    render() {
        let { name, price, description, image } = this.props.detailShoe;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    {this.props.dataAll.map((item, i) => {
                        return (
                            <div key={i} className="col-md-6 col-xl-4">
                                <ItemShoes detail={item} />
                            </div>
                        );
                    })}
                </div>
                <div id="info" className="container row mt-5">
                    <img src={image} alt="image_detail" />
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
    componentDidUpdate() {
        if (this.props.isReset) {
            this.props.dispatch(fetchData());
        }
    }
}

const mapStateToProps = (state) => {
    return {
        detailShoe: state.shoeReducer.detailShoe,
        dataAll: state.shoeReducer.dataAll,
        isReset: state.shoeReducer.isReset,
    };
};

export default connect(mapStateToProps, null)(ListShoes);
