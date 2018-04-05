import { Product } from "./product";

export class CartItem{
    $key : string;
    title : string;
    price : number ;
    imageUrl : string;
    quantity : number;
    constructor(init? : Partial<CartItem>){
        Object.assign(this, init);
    }
    get totalPrice(){
        return this.price*this.quantity;
    }
}