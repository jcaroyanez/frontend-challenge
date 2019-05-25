export interface Product{
    quantity:number;
    price:string;
    available:boolean;
    sublevel_id:number;
    name:string;
    id:string;
    total?:number | 0;
}