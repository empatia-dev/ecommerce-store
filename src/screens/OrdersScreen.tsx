import { useEffect, useState } from "react";
import { useCartStore, type Order } from "../store/store";
import { CartItem } from "../components/CartItem";
import { formatDate } from "../utils/date";

type Props = {
    triggerFade: boolean;
    handleBackButton: () => void;
    handleGoToOrder: (order: Order) => void;
}

export function OrdersScreen ( { triggerFade, handleBackButton, handleGoToOrder } : Props) {
    const [triggerFadeIn, setTriggerFadeIn] = useState(false);

    const orders = useCartStore((state) => state.orders);

    function goToOrder(order: Order) {
        setTriggerFadeIn(false);
        setTimeout(() => {
            handleGoToOrder(order);
        }, 500);
    }

    function backButton() {
        setTriggerFadeIn(false);
        setTimeout(() => {
            handleBackButton();
        }, 1000);
    }

    useEffect(() => {
        if (triggerFade) {
            requestAnimationFrame(() => setTriggerFadeIn(true));
        } else {
            setTriggerFadeIn(false);
        }
    }, [triggerFade]);

    
    return <div className={`screen fade ${triggerFadeIn ? "show" : "" }`}> 

        <h1 className="screen-title">Orders</h1>
        <p>
            See what you've ordered and when it's arriving.
        </p>
        <div className="order-list">
            {orders.length !== 0 && orders
            .slice() // make a shallow copy to avoid mutating the original
            .sort((a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime())
            .map((order) => (
                <div key={order.id} className="order-item-container">
                    <h3 onClick={()=> {goToOrder(order);}} className="order-item__title">Order: {order.id}</h3>
                    <span className="order-item__purchase-date">{formatDate(order.purchaseDate)}</span>

                    <div onClick={()=>{goToOrder(order);}} className={`order-item-cart-list-container ${order.cartItems.length > 2 ? "order-item-cart-list-container--shadow" : ""}`}>
                        <div className={`cart-item-list ${order.cartItems.length > 3 ? "cart-item-list--padding-bottom" : ""}`}>
                            {order.cartItems
                            .map((item, index) => (
                                <CartItem 
                                    key={index}
                                    item={item}
                                    ordersList={true}
                                />
                            ))}
                        </div>
                    </div>
                </div>))}
        </div>
        <span onClick={backButton} className="back-button material-symbols-outlined">
            chevron_left
        </span>
        {orders.length === 0  && <div className="empty-screen-placeholder">
            <p className="empty-favorite-screen-placeholder-text">You haven’t placed any orders yet.<br />           
                Find something you love and we’ll take care of the rest.</p></div>}
    </div>
}