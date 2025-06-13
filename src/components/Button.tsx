type Props = {
    handleClick: () => void;
    symbol: string;
};

function Button({ handleClick, symbol } : Props) {
    return  <div className='alert-button' onClick={handleClick}>{symbol}</div>;
       
}

export default Button;