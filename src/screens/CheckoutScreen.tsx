import { useEffect, useState } from "react";
import { useCartStore, type Order } from "../store/store";
import AlertDialog from "../components/AlertDialog";

type Props = { 
    handlePurchase: (newOrder: Order) => void;
    triggerPurchaseAlert: () => void;
    handleBackButton: () => void;
    triggerFade: boolean;
}


export function CheckoutScreen( { handlePurchase, triggerPurchaseAlert, handleBackButton, triggerFade } : Props) {
    const items = useCartStore((state) => state.items);
    const orders = useCartStore((state) => state.orders);
    const clearCart = useCartStore((state) => state.clearCart);
    const addToOrders = useCartStore((state) => state.addToOrders);

    const [triggerFadeIn, setTriggerFadeIn] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [alertMsg, setAlertMsg] = useState("");

    const [cardNumber, setCardNumber] = useState("1234 5678 9012 3456");
    const [expiry, setExpiry] = useState("10/34");
    const [cvc, setCvc] = useState("336");
    const [name, setName] = useState("Bruce Wayne");
    const [firstName, setFirstName] = useState("Bruce");
    const [lastName, setLastName] = useState("Wayne");
    const [adressLn1, setAdressLn1] = useState("1007 Mountain Drive");
    const [adressLn2, setAdressLn2] = useState("Wayne Manor");
    const [city, setCity] = useState("Gotham City");
    const [state, setState] = useState("DC");
    const [postalCode, setPostalCode] = useState("18630549");
    const [country, setCountry] = useState("United States");
    const [email, setEmail] = useState("bruce@wayne.enterprise");

    function backButton() {
        setTriggerFadeIn(false);
        setTimeout(() => {
            handleBackButton();
        }, 500);
    }

    function showAlertDialog() {
        setShowAlert(true);
    }

    function hideAlert() {
        setShowAlert(false);
    }

    function generateOrderNumber(): string {
        let newOrderNumber: string;
        const orderIds = new Set(orders.map(order => order.id));
        while (true) {
            const number = Math.floor(10000 + Math.random() * 90000);
            newOrderNumber = `MOD-${number}`;
            if (!orderIds.has(newOrderNumber)) {
                break;
            }
        }
        return newOrderNumber;
    }

    function isExpiryInvalid() {
        const now = new Date();
        const expiryMonth = parseInt(expiry.slice(0, 2));
        const expiryYear = 2000 + parseInt(expiry.slice(3, 5));
        const expiryDate = new Date(expiryYear, expiryMonth);
        return expiryDate < now;
    }


    function onPurchase() {
        let newOrder: Order;
        // prevent empty carts becoming orders
        if (items.length !== 0) {
            newOrder = {
                cartItems: items,
                id: generateOrderNumber(),
                purchaseDate: new Date(),
            }
            addToOrders(newOrder);
        }
        setTriggerFadeIn(false);
        triggerPurchaseAlert(); // trigger sucessful purchase alert on parent
        setTimeout(() => { 
            handlePurchase(newOrder); // trigger 
            clearCart();
        }, 500); 
    }

    function processPurchase() {
       if (isExpiryInvalid()) {
            setAlertTitle("");
            setAlertMsg("Oops! That expiry date doesn’t look right. Please double-check and try again.")
            showAlertDialog();
            return;
        }
        setProcessing(true);
        console.log('processing purchase');
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    function formatCardNumber(value: string) {
        // Remove all non-digit characters
        const digits = value.replace(/\D/g, "").slice(0, 16);

        // Add spaces every 4 digits
        return digits.replace(/(.{4})/g, "$1 ").trim();
    }

    function handleCardNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
        const raw = e.target.value;
        setCardNumber(formatCardNumber(raw));
    }

    function formatExpiryDate(value: string) {
        // Remove all non-digit characters
        const digits = value.replace(/\D/g, "").slice(0, 4);

         // If user types "3" (intending 03), prefix with 0
        if (digits.length === 1 && parseInt(digits) > 1) {
            return '0' + digits;
        }

        // Add slash after first 2 digits
        if (digits.length > 2) {
            return digits.slice(0, 2) + '/' + digits.slice(2);
        }

        return digits;
    }

    function handleExpiryChange(e: React.ChangeEvent<HTMLInputElement>) {
        const raw = e.target.value;
        setExpiry(formatExpiryDate(raw));
    }

    const payButtonContent = processing ?
        <span className="loading-wrapper">
            <div className="loadingio-spinner-rolling">
                <div className="ldio">
                    <div></div>
                </div>
            </div>
            Processing
        </span>
        : <span>Pay now</span>;



    useEffect(() => {
        if (triggerFade) {
            requestAnimationFrame(() => setTriggerFadeIn(true));
        } else {
            setTriggerFadeIn(false);
        }
    }, [triggerFade]);

    useEffect(() => {
        if (processing) {
            setTimeout(() => {
                onPurchase();
                setProcessing(false);
            }, 2000);
        }
    }, [processing]);
    
    return <div className={`screen fade ${triggerFadeIn ? "show" : ""}`}>
        <h1 className="screen-title">Checkout</h1>

        <form className="checkout-form" onSubmit={handleSubmit}>
            <>
                <h2 className="checkout-form-address-header">Shipping Address</h2>

                <div className="checkout-form-row">
                    <label>
                        First Name
                        <input
                        type="text"
                        name="given-name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        />
                    </label>

                    <label>
                        Last Name
                        <input
                        type="text"
                        name="family-name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        />
                    </label>
                    
                </div>

                <label>
                    Adress Line 1
                    <input
                    type="text"
                    name="address1"
                    value={adressLn1}
                    onChange={(e) => setAdressLn1(e.target.value)}
                    required
                    />
                </label>

                <label>
                    Adress Line 2
                    <input
                    type="text"
                    name="address2"
                    value={adressLn2}
                    onChange={(e) => setAdressLn2(e.target.value)}
                    required
                    />
                </label>

                <div className="checkout-form-row">
                    <label>
                        City
                        <input
                        type="text"
                        name="address-level2"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        />
                    </label>

                    <label>
                        State
                        <input
                        type="text"
                        name="address-level1"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                        />
                    </label>
                    
                </div>

                <div className="checkout-form-row">
                    <label>
                        Postal Code
                        <input
                        type="text"
                        name="postal-code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                        />
                    </label>

                    <label>
                        Country
                        <input
                        type="text"
                        name="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        />
                    </label>
                    
                </div>

                <label>
                    Contact Email
                    <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </label>
            </>

        
            <>
                <h2 className="checkout-form-payment-header">Payment Information</h2>

                <label>
                Name on Card
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>

                <label>
                Card Number
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9\s]{19}"
                        maxLength={19}
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                        required
                    />
                </label>

                <div className="checkout-form-row">
                    <label>
                        Expiry Date
                        <input
                        type="text"
                        inputMode="numeric"
                        maxLength={5}
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={handleExpiryChange}
                        required
                        />
                    </label>

                    <label>
                        CVC
                        <input
                        type="text"
                        inputMode="numeric"
                        maxLength={4}
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        required
                        />
                    </label>
                    
                </div>
            </>

            <button disabled={processing} onClick={processPurchase} className={`checkout-form__button primary-button action-color ${processing ? "checkout-form-button--processing" : ""}`}>{payButtonContent}</button>
        </form>
        <span onClick={backButton} className="back-button material-symbols-outlined">
            chevron_left
        </span>
        {showAlert && <AlertDialog
            title={alertTitle}
            msg={alertMsg}
            hideAlert={hideAlert}
         />}
    </div>;
}