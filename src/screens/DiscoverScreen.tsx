import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { useCartStore } from "../store/store";
import type { Product } from "../types/Product";
import AlertDialog from "../components/AlertDialog";

type Props = {
    products: Product[];
}


export function DiscoverScreen( { products } : Props) {
    
    const [showAlert, setShowAlert] = useState(false);
    const [liked, setLiked] = useState<number[]>(() => {
        const raw = localStorage.getItem("liked");
        return raw ? JSON.parse(raw) : [];
    });

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

    return <div className="screen">
        <h1 className="screen-title">Discover</h1>
        <p>
        Explore the new collection
        </p>
        <div className="product-card-list">
            {products.map((product) =>
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
                    liked={isLiked(product.id)}
                    toggleLiked={()=>{handleToggleLiked(product.id)}}
                />
            )}
        </div>
        {showAlert && <AlertDialog
            title={itemAddedToCartTitle}
            msg={itemAddedToCartMsg}
            hideAlert={hideAlert}
         />}
       
    </div>;
}