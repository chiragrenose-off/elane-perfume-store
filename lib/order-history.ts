export type OrderItem = {
  perfumeId: number;
  name: string;
  price: number;
  quantity: number;
};

export type DemoOrder = {
  orderNumber: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: "upi" | "card" | "cod";
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
  paymentStatus: string;
};

export const ORDER_HISTORY_KEY = "elane-order-history";
export const LAST_ORDER_KEY = "elane-last-order";

export function readOrderHistory(): DemoOrder[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const history = localStorage.getItem(ORDER_HISTORY_KEY);
    const lastOrder = localStorage.getItem(LAST_ORDER_KEY);

    const parsedHistory: DemoOrder[] = history
      ? JSON.parse(history)
      : [];

    const orders = Array.isArray(parsedHistory)
      ? parsedHistory.filter(
          (order) =>
            order &&
            typeof order.orderNumber === "string" &&
            Array.isArray(order.items)
        )
      : [];

    if (lastOrder) {
      const parsedLastOrder = JSON.parse(lastOrder) as DemoOrder;

      if (
        parsedLastOrder.orderNumber &&
        Array.isArray(parsedLastOrder.items) &&
        !orders.some(
          (order) => order.orderNumber === parsedLastOrder.orderNumber
        )
      ) {
        orders.push(parsedLastOrder);
      }
    }

    return orders.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );
  } catch {
    return [];
  }
}

export function saveDemoOrder(order: DemoOrder): void {
  if (typeof window === "undefined") {
    return;
  }

  const existingOrders = readOrderHistory();
  const updatedOrders = [
    order,
    ...existingOrders.filter(
      (existing) => existing.orderNumber !== order.orderNumber
    ),
  ];

  localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(updatedOrders));
  localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
}