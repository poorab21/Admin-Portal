import { Button, Card, CardActions, CardMedia } from "@mui/material"
import Link from "next/link"
import React from "react"
export default function ServiceBox(props){
    const { serviceType , img } = props
    return (
        <React.Fragment>
            <Card style={{ height : 'fit-content' , padding : '10px' , border : '1px solid black' , margin : '10px' }}>
                <CardMedia
                component = {'img'}
                image = {img}
                style = {{ width : "200px" , height : "200px" }}
                />
                <CardActions style = {{ margin : '10px' }}>
                    <Button 
                    href = {`/App/Services/${serviceType}`}
                    style={{ border : '1px solid black' , 
                    color : 'black' , 
                    backgroundColor : 'cornflowerblue' ,
                    width : '100%' }}
                    className="btn"
                    >
                        {serviceType}
                    </Button>
                </CardActions>
            </Card>
        </React.Fragment>

    )    
}