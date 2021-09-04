import { Customer } from "./customer";
import { Order } from "./order";
import { OrderItem } from "./orderItem";

export class Purchase {
    customer!: Customer;
    shippingAddress!: string;
    order!: Order;
    orderItems!: OrderItem[];
} 