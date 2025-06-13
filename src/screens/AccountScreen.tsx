type Props = {
    triggerFade: boolean;
    goToOrders: () => void;
    goToFavorites: () => void;
}

export function AccountScreen ( { triggerFade, goToOrders, goToFavorites } : Props) {

    return <div className={`screen fade ${triggerFade ? "show" : ""}`}>
        <h1 className="screen-title">Account</h1>
        <p>
        Track your orders and view your favorite items
        </p>
        <div className="align-horizontal-center">
            <div className="account-menu">
                <div onClick={goToOrders} className="account-menu-item">
                     <span className="material-symbols-outlined modula-color">shopping_bag</span>
                     <h3>My orders</h3>
                </div>
               
                <div className="account-menu-item" onClick={goToFavorites}>
                    <span className="material-icons modula-color">favorite_border</span>
                    <h3>Favorites</h3>
                </div>
            </div>
        </div>
    </div>
}