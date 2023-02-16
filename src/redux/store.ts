import { configureStore } from "@reduxjs/toolkit";
import { Product } from "../models";
import { productSlice, shoppingCarSlice } from "./states";

export interface AppStore {
    product: Product[],
    ShoppingCar: Product[]
}

export default configureStore<AppStore>({
    reducer:{
        product: productSlice.reducer,
        ShoppingCar: shoppingCarSlice.reducer
    }
})