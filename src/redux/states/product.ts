import { createSlice, current } from "@reduxjs/toolkit";
import { LocalStorageType, Product } from "../../models";
import { getLocalStorage, setLocalStorage } from "../../utilities";


const initialState: Product[] = []


export const productSlice = createSlice({
    name: 'product',
    initialState: getLocalStorage(LocalStorageType.Product) ? JSON.parse(getLocalStorage(LocalStorageType.Product) as string) : initialState,
    reducers: {
        addProduct: (state, action) => {
            setLocalStorage(LocalStorageType.Product, current(state))
            return action.payload
        }
    }
})

export const { addProduct } = productSlice.actions