import styles from '../../styles/ConfirmExit.module.css'

export default function ConfirmExit(){
    return (
        <>
            <div className = {styles.container}>
                <div className = {styles.messageContainer}>
                    <p className = {styles.heading}>
                        Confirm
                    </p>
                    <hr style = {{ margin : "10px" , border : "2px solid black" }}/>
                    <p className = {styles.message}>
                        Are you sure you want to Log out ? Any unsaved changes you have made might get Lost
                    </p>
                    <div className = {styles.btnContainer}>
                        <button className = {styles.btn}>
                            Log Out
                        </button>
                        <button className = {styles.btn}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}