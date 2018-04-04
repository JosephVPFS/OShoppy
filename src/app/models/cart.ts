import { CartItem } from "./cart-product";
import { Product } from "./product";

export class Cart{
    cartItemsG : CartItem[] = [];
    constructor(public items : {[key : string] : CartItem} = {}){
        for(let pid in items){
            let item = items[pid];
            let cartItem = new CartItem({...item, $key : pid});
            this.cartItemsG.push(cartItem);
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
        totalPrice += item.quantity * item.price;
        return totalPrice;
      }
    

    get productIDs(){
        return Object.keys(this.items);
    }

    
    getQuantity(ite : CartItem){
        let item = this.items[ite.$key];
        if(!item){
          return 0;
        }
        return (item) ? (item.quantity) ? item.quantity : 0 : 0;
      }
      
      
}