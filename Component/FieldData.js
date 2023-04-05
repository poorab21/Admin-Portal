
export default function FieldData(props){
    const { field , value } = props;
    return (
        <>
            <fieldset className = {'field'}>
                <legend className = {"heading"}>{field}</legend>
                    <p className = {"value"}>{value}</p>
            </fieldset>
            <style jsx>
                {`
                    .field {
                        border: 3px solid black;
                        margin: 10px;
                        flex : 1;
                        border-radius : 10px;
                    }
                    .heading {
                        text-align: center;
                        font-weight: bolder;
                        font-size: 20px;
                        font-style: italic;
                    }
                    .value {
                        text-align: center;
                        margin: 10px;
                        font-style: italic;
                    }
                `}
            </style>
        </>
    )
}