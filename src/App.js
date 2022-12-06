import "./App.css";
import { useState } from "react";
import { DetailShoe } from "./Ex_shoes_shop _reduce/DetailShoe";
import { ListShoes } from "./Ex_shoes_shop _reduce/ListShoes";

function App() {
    const [isDetail, setIsDetail] = useState(-1);

    return (
        <div className="App">
            {isDetail > -1 ? (
                <DetailShoe isDetail={isDetail} setIsDetail={setIsDetail} />
            ) : (
                <ListShoes setIsDetail={setIsDetail} />
            )}
        </div>
    );
}

export default App;
