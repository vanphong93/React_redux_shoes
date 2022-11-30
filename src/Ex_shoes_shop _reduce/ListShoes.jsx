import React, { Component } from "react";
import ItemShoes from "./ItemShoes";
import { connect } from "react-redux";
import { dataShoeAPI } from "./redux/actions/actionsShoe";
class ListShoes extends Component {

    getData = () => {
        this.props.dispatch(dataShoeAPI());
    };
    componentDidMount() {
        this.getData();
    }
    render() {
        let { name, price, description } = this.props.detailShoe;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    {this.props.dataAllShoe.map((item, i) => {
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
        dataAllShoe: state.shoeReducer.dataAllShoe,
    };
};

export default connect(mapStateToProps, null)(ListShoes);
