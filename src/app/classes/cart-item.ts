import { Product } from "./interfaces/product";
import { Products } from "./products";

export class CartItem {

        public id: Number;
        public sku: String;
        public name: String;
        public description: String;
        public unit_price: number;
        public image_url: String;
        public active: Boolean;
        public units_in_stock: Number;
        public quantity: number = 1;

    constructor(products: Products) { 
        this.id = products.id;
        this.sku = products.sku;
        this.name = products.name;
        this.description = products.description;
        this.unit_price = products.unit_price;
        this.image_url = products.image_url;
        this.active = products.active;
        this.units_in_stock = products.units_in_stock;
    }

}
