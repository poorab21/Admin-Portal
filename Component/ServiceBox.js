import Image from "next/image"
import Link from "next/link"

export default function ServiceBox(props){
    const { serviceType , img } = props
    return (
        <>
            <div className = {"container"}>
                <Image
                    src={img}
                    width = {250}
                    height = {250}
                    alt = {'Gardening'}
                    priority
                />
                <Link href = {`/App/Services/${serviceType}`}>
                    <p className = {"serviceType"}>
                        {serviceType}
                    </p>
                </Link>
                <style jsx>
                {`
                .container {
                    border : 3px solid black ; 
                    display : flex;
                    border-radius : 10px;
                    flex-direction : column;
                    justify-content : center;
                    margin : 20px;
                    overflow : hidden;
                }
                .serviceType {
                    display : flex;
                    font-weight : bold; 
                    font-style : italic;
                    margin : 10px;
                    background-color : cornflowerblue;
                    border-radius : 10px;
                    justify-content : center;
                    border : 1px solid black;
                    cursor : pointer;
                }
                .serviceType:hover{
                    color : white ;
                    background-color : black;
                }
                `}
                </style>
            </div>
        </>
    )    
}