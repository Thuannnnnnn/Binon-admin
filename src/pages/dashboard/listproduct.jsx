import React from "react";
import { ListProduct } from "../../component/listProduct"
export function Product() {


    return (
        <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">
            <ListProduct />
        </div>
    );
}

export default Product;
