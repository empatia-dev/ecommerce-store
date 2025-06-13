import { useCartStore, type CartItem } from "../store/store";

type Props = {
    item: CartItem;
    ordersList: boolean;
}

export function CartItem( { item, ordersList } : Props) {

    const updateQuantity = useCartStore(state => state.updateQuantity);
    const removeFromCart = useCartStore(state => state.removeFromCart);


    return <div className="cart-item" key={item.product.id}>
                <img className="cart-item__image" src={item.product.image_url} />
                <h3 className="cart-item__title">{item.product.name}</h3>
                <div className="cart-item__qty">
                    {ordersList && <span className="cart-item__qty--order-list primary-color--inactive">{item.quantity}</span>}
                    {!ordersList && <select className="cart-item__qty-select primary-color"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product.id, Number(e.target.value))}
                        >
                        {[...Array(20)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                            {i + 1}
                            </option>
                        ))}
                    </select>}
                    {!ordersList && <span className="material-symbols-outlined cart-item__qty-icon">expand_more</span>}
                </div> 
                <p className="cart-item__price">${(item.product.price * item.quantity).toFixed(2)}</p>
                {!ordersList && <span onClick={()=>{removeFromCart(item.product.id)}} className="material-symbols-outlined cart-item__remove-button">delete</span>}
            </div>;
}