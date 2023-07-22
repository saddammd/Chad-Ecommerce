export class Products {

    constructor(public id: Number,
        public sku: String,
        public name: String,
        public description: String,
        public unit_price: number,
        public image_url: String,
        public active: Boolean,
        public units_in_stock: Number) { }

}
