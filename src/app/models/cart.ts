import { CartItem } from "./cart-product";

export class Cart{
    cartItemsG : CartItem[] = [];
    constructor(public items : {[key : string] : CartItem}){
        for(let pid in items){
            let item = items[pid];
            this.cartItemsG.push(new CartItem(item.product, item.quantity));
        }
    }

    get quantity(){
      let cartQuantity = 0;
      for(let item of this.cartItemsG)
        cartQuantity += item.quantity;
      return cartQuantity;
    }

    get totalPrice(){
        let totalPrice = 0;
        for(let item of this.cartItemsG)
        totalPrice += item.quantity * item.product.price;
        return totalPrice;
      }
    

    get productIDs(){
        return Object.keys(this.items);
    }
}