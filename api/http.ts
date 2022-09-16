
import { Client } from '../entity/client';
import { Order } from '../entity/order';

enum API_QUERY_ID {
    DeleteOrder = 'DeleteOrder',
    PostOrder = 'PostOrder',
    OrdersList = 'OrdersList',
    ProductList = 'ProductList',
    SearchClient = 'SearchClient',
}

const Buffer: any = {};

abstract class HttpClient {
    abstract post<T>(url: string, body: { [x: string]: any }, headers: { [x: string]: any }): Promise<T>;
}

abstract class AuthService {
    constructor(private username: string, private password: string) { }
    authorizationHeader(): string {
        return `Basic ${Buffer.from(this.username + ':' + this.password).toString('base64')}`;
    }
}

class Ribka1CDataSource {
    constructor(private baseUrl: string, private httpClient: HttpClient, private authService: AuthService) { }

    _getQueryURL(queryId: API_QUERY_ID): string {
        return `${this.baseUrl}/query/${queryId}`;
    }

    _post<T>(queryId: API_QUERY_ID, body?: { [x: string]: any }): Promise<T> {
        return this.httpClient.post<T>(
            this._getQueryURL(queryId),
            { ...body || {}, queryId },
            { Authorization: this.authService.authorizationHeader() }
        );
    }

    productList() {
        return this._post<ProductListItem[]>(API_QUERY_ID.ProductList);
    }

    updateOrder(order: Order) {
        return this._post<Order>(API_QUERY_ID.PostOrder, order);
    }

    deleteOrder(orderId: string) {
        return this._post<any>(API_QUERY_ID.DeleteOrder, { id: orderId });
    }

    orderList(dateFrom: Date, dateTo: Date) {
        return this._post<Order[]>(API_QUERY_ID.OrdersList, { dateFrom, dateTo });
    }

    searchClient(phone: string) {
        return this._post<Client[]>(API_QUERY_ID.SearchClient, { phone });
    }

}