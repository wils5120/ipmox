import { createSlice } from "@reduxjs/toolkit";
import { LocalStorageType, Product } from "../../models";
import { getLocalStorage, setLocalStorage } from "../../utilities";


const initialState: Product[] = []



export const shoppingCarSlice = createSlice({
    name: 'shoppingCar',
    initialState: getLocalStorage(LocalStorageType.ShoppingCar) ? JSON.parse(getLocalStorage(LocalStorageType.ShoppingCar) as string) : initialState,
    reducers: {
        addshoppingCar: (state, action) => {
            setLocalStorage(LocalStorageType.ShoppingCar, state)
            return action.payload
        }
    }
})

export const { addshoppingCar } = shoppingCarSlice.actions