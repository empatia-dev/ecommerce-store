import { useEffect, useState } from "react";
import { useCartStore, type Order } from "../store/store";
import { CartItem } from "../components/CartItem";
import { getOrderStepIndex } from "../utils/date";
import { StepItem } from "../components/StepItem";

type Props = {
    triggerFade: boolean;
    handleBackButton: () => void;
    order: Order | undefined;
}

export function CurrentOrderScreen ( { triggerFade, handleBackButton, order } : Props) {
    const [triggerFadeIn, setTriggerFadeIn] = useState(false);

    const orders = useCartStore((state) => state.orders);

    function backButton() {
        setTriggerFadeIn(false);
        setTimeout(() => {
            handleBackButton();
        }, 500);
    }

    const steps = [
        { key: "packaging", label: "Packaging", icon: "inventory_2" },
        { key: "shipping", label: "Shipping", icon: "local_shipping" },
        { key: "arrived", label: "Arrived", icon: "home" },
    ];

    const stepIndex = order ? getOrderStepIndex(order.purchaseDate) : 0;

    useEffect(() => {
        if (triggerFade) {
            requestAnimationFrame(() => setTriggerFadeIn(true));
        } else {
            setTriggerFadeIn(false);
        }
    }, [triggerFade]);

    
    return <div className={`screen fade ${triggerFadeIn ? "show" : "" }`}>
        
        <h1 className="screen-title">Order:<br></br>{order ? order.id : ""}</h1>
        <p>
            Track your order to plan for its arrival.
        </p>
        <div className="order-status-tracker">
            {steps.map((step, index) => (
                <StepItem
                key={step.key}
                step={step}
                index={index}
                stepIndex={stepIndex}
                isntLast={index < steps.length - 1}
                />
            ))}
        </div>
        <div className="current-order cart-item-list">
                {order && order.cartItems
                .map((item, index) => (
                    
                        <CartItem 
                        key={index}
                        item={item}
                        ordersList={true}
                        />
                    
                ))}
        </div>
        
        <span onClick={backButton} className="back-button material-symbols-outlined">
            chevron_left
        </span>
        {orders.length === 0  && <div className="empty-screen-placeholder">
            <p className="empty-favorite-screen-placeholder-text">You haven't placed any orders yet.<br />           
                Find something you love and we'll take care of the rest.</p></div>}
    </div>
}