import Button from "./Button";

type Props = {
    hideAlert: () => void;
    title: string;
    msg: string;
}

function AlertDialog({ hideAlert, title, msg }: Props) {
    return <div className='ui-container'>
        <div className='alert-dialog'>
            {title.length !== 0 && <h2>{title}</h2>}
            <p>{msg}</p>
            <div className='button-container'>
                <Button
                symbol={"OK"}
                handleClick={hideAlert}
                />
            </div>
        </div>
    </div>;
}

export default AlertDialog;