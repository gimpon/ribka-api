interface ProductListItem {
    id: string;
    name: string;
    parentId: string;
    parentName: string;
    price: number;
    rest: number;
    packs: [];
}

interface IProductListItemPack {
    id: string;
    weight: number;
}