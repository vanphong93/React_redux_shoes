import React, { Component } from "react";

import GioHang from "./GioHang";
import ListShoes from "./ListShoes";
export default class ShopRedux extends Component {
  render() {
    return (
      <div>
        <GioHang />
        <ListShoes />
      </div>
    );
  }
}
