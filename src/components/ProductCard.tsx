import { type JSX } from "react";

type Props = {
    title: string;
    img: string;
    desc: JSX.Element;
    price: number;
    liked: boolean;
    onClick: () => void;
    toggleLiked: () => void;
}

const isTouchDevice =
  "ontouchstart" in window || navigator.maxTouchPoints > 0;

export function ProductCard( { title, img, desc, price, liked, onClick, toggleLiked } : Props) {

    return <div className="product-card">
        <h2 className="product-card__title">{title}</h2>
        <div className="product-card__image-container">
             <img className="product-card__image" src={img}></img>
             <div className="product-card__price">{price}</div>
        </div>
        <div className="product-card__desc-container">
            <div className="product-card__desc">
                {desc}
            </div>
            <button className="product-card__button primary-color" onClick={onClick}>Add to cart</button>
        </div>

        <span onClick={toggleLiked}
            className={`material-icons product-card__heart-button ${isTouchDevice ? "product-card__heart-button--touch-device" : ""} ${liked ? "product-card__heart-button--liked" : ""}`}>
                {liked ? "favorite" : "favorite_border"}
        </span>
    </div>;
}