export interface Product{
    id: number,
    sku: string,
    name: string,
    description: string,
    unit_price: number,
    image_url: string,
    active: boolean,
    units_in_stock: number,
    date_created: string,
    last_updated: number,
    productCategory: {
        categoryName: string,
        id: number
    }
}