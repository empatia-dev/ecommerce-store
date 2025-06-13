type Props = {
    icon: string;
    title: string;
    selected: boolean;
    onSelect: () => void;
}

export function BottomNavigationItem( {icon, title, selected, onSelect} : Props) {
    return <div className={`bottom-navigation-bar__item ${selected ? "bottom-navigation-item--selected" : ""}`} onClick={onSelect}>
        <div className="bottom-navigation-item_icon">
            <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div className="bottom-navigation-item_title">
            {title}
        </div>
    </div>;
}