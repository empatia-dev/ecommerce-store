import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { useCartStore } from "../store/store";
import AlertDialog from "../components/AlertDialog";
import { ProductCard } from "../components/ProductCard";

type Props = {
    triggerFade: boolean;
    products: Product[];
    handleBackButton: () => void;
}

export function FavoritesScreen ( { triggerFade, products, handleBackButton } : Props) {
    const [liked, setLiked] = useState<number[]>(() => {
        const raw = localStorage.getItem("liked");
        return raw ? JSON.parse(raw) : [];
    });
    const [showAlert, setShowAlert] = useState(false);
    const [triggerFadeIn, setTriggerFadeIn] = useState(false);


    const addToCart = useCartStore((state) => state.addToCart);

    function handleClick(product: Product) {
        addToCart({ product });
        console.log(`added product ${product.name} to cart`);
    }

    function showAlertDialog() {
        setShowAlert(true);
    }

    function hideAlert() {
        setShowAlert(false);
    }

    function backButton() {
        setTriggerFadeIn(false);
        setTimeout(() => {
            handleBackButton();
        }, 1000);
    }


    const itemAddedToCartTitle = "";
    const itemAddedToCartMsg = "Item added to cart.";

    function handleToggleLiked(productId: number) {
        if (liked.includes(productId)) {
            setLiked(prev =>
            prev.includes(productId) ? prev.filter(i => i !== productId) : [...prev, productId]
            );
        } else {
            setLiked((prev)=>[...prev, productId]);
        }

        localStorage.setItem("liked", JSON.stringify(liked));
    }

    function isLiked(productId: number) {
        const isLiked = liked.includes(productId);

        return isLiked;
    }

    useEffect(() => {
        localStorage.setItem("liked", JSON.stringify(liked));
    }, [liked]);
    
    useEffect(() => {
        if (triggerFade) {
            requestAnimationFrame(() => setTriggerFadeIn(true));
        } else {
            setTriggerFadeIn(false);
        }
    }, [triggerFade]);
    
    return <div className={`screen fade ${triggerFadeIn ? "show" : ""} `}>
        <h1 className="screen-title">Favorites</h1>
        <p>
        Your top picks are waiting for you.
        </p>
        <div className="product-card-list">
            {liked.length !== 0 && products
                .filter((product) => isLiked(product.id))
                .map((product) => (
                    <ProductCard
                    key={product.id}
                    title={product.name}
                    img={product.image_url}
                    desc={<p>{product.description}</p>}
                    price={product.price}
                    onClick={() => {
                        handleClick(product);
                        showAlertDialog();
                    }}
                    liked={true}
                    toggleLiked={() => handleToggleLiked(product.id)}
                    />
                ))
            }
        </div>
        <span onClick={backButton} className="back-button material-symbols-outlined">
            chevron_left
        </span>
        {liked.length === 0  && <div className="empty-screen-placeholder">
            <p className="empty-favorite-screen-placeholder-text">Nothing here... yet!<br />
            Tap the heart icon on a product to start your collection.</p></div>}
        {showAlert && <AlertDialog
            title={itemAddedToCartTitle}
            msg={itemAddedToCartMsg}
            hideAlert={hideAlert}
         />}
    </div>
}