export interface Order {
    id?: string; // required for update
    date: Date;  // ex "2022-09-15T07:28:46.885817"
    code?: string;
    comment?: string;
    paymentType: PaymentType;
    outlet: Outlet;
    storehouse: Storehouse;
    posted: boolean; // true - save & post, false - save only
    deleted: boolean; 
    user?: User;
    total?: number;
    client: Client;
    products: OrderProductItem[];
    outletId: string;
}

export interface PaymentType {
    id: string;
    name: string;
    isCash: boolean;
}

export interface Outlet {
    id: string;
    name: string;
}

export interface Storehouse {
    id: string;
    name: string;
}

export interface User {
    id: string;
    name: string;
}

export interface Client {
    id: string;
    name: string;
    phone: string;
}

export interface OrderProduct {
    id: string;
    name: string;
    parentId: string;
    parentName: string;
    isPacked: boolean;
}

export interface Pack {
    id: string;
    weight: number;
}

export interface OrderProductItem {
    product: OrderProduct;
    rest: number;
    price: number;
    total: number;
    count: number;
    packs: Pack[];
}