import { BottomNavigationItem } from "./BottomNavigationItem";

type Props = {
    selectedIndex: number;
    onSelect: (index: number) => void;
}

export function BottomNavigationBar( { selectedIndex, onSelect } : Props) {
    
    return <div className="bottom-navigation-bar">
        <BottomNavigationItem
            icon="home"
            title="Home"
            selected={selectedIndex === 0}
            onSelect={() => {onSelect(0);}}
        />
        <BottomNavigationItem
            icon="explore"
            title="Discover"
            selected={selectedIndex === 1}
            onSelect={() => {onSelect(1);}}
        />
        <BottomNavigationItem
            icon="shopping_cart"
            title="Cart"
            selected={selectedIndex === 2}
            onSelect={() => {onSelect(2);}}
        />
        <BottomNavigationItem
            icon="person"
            title="Account"
            selected={selectedIndex === 3}
            onSelect={() => {onSelect(3);}}
        />
    </div>;
}