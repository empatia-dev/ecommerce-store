import { CartItem } from "../components/CartItem";
import { useCartStore } from "../store/store";

type Props = {
    handleGoToCheckout: () => void;
    triggerFade: boolean;
}


export function CartScreen( { handleGoToCheckout, triggerFade } : Props) {

    const items = useCartStore((state) => state.items);

    const checkoutTotal = useCartStore((state) => state.checkoutTotal);

    const displayTotal = checkoutTotal().toFixed(2);

    function goToCheckout() {
        handleGoToCheckout();
    }
    
    
    return <div className={`screen fade ${triggerFade ? "show" : ""}`}>
          <h1 className="screen-title">Cart</h1>
        <p>
        Review your items before checking out
        </p>
        <div className="align-horizontal-center">
            { items.length !== 0 &&
            <div className="cart-item-list">
                {items.map((item) => (
                    <CartItem
                        key={item.product.id}
                        item={item}
                        ordersList={false}
                    />
                ))}

            </div>}
        </div>
        { items.length === 0  && <div className="empty-screen-placeholder">
            <p className="empty-favorite-screen-placeholder-text">Nothing here... yet!<br />
            Add something to your cart and we'll keep it safe here.</p></div>
        }
        { items.length !== 0 && <h2 className="cart-total-price">Total: ${displayTotal}</h2> }
        { items.length !== 0 && <button onClick={goToCheckout}
            className="go-to-checkout-button primary-button primary-color">Checkout</button> }
    </div>
}