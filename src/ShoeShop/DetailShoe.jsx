import React, { Component } from 'react'
import { connect } from "react-redux";
 class DetailShoe extends Component {
    render() {
        let { price, description, image, name } = this.props.detailShoe;
        return (
            <div id='info' className='container p-5'>
                <div className="row">
                    <div className="col-4"><img src={image} className="w-100" />
                    </div>
                    <div className="col-8 text-success text-left">
                        <p>{name}</p>
                        <p><span className='text-danger'>Price: </span>{price}$</p>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => {

    return {
        detailShoe: state.shoeReducer.detailShoe,
    };
};

export default connect(mapStateToProps,null)(DetailShoe);
