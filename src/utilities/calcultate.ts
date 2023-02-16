import { Product } from "../models";

export const calculateTotal = (cart: Product[]) => {
    var total = 0;
    for (var i = 0; i < cart.length; i++) {
      total = total + cart[i].price * cart[i].amount;
    }
    return total;
  };
  