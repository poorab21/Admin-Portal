import { Card , CardContent , Typography , Divider } from "@mui/material";

export default function FieldData(props){
    const { field , value } = props;
    return (
        <>
            <center>
                <Card style = {{ 
                    margin : '10px' , 
                    padding : '10px' , 
                    width : '90%' , 
                    boxShadow : '1px 1px 1px 3px black' ,
                }}>
                    <CardContent>
                        <Typography style={{ textAlign : 'center' , fontWeight : 'bolder' , fontSize : 'large' }}>{field}</Typography>
                        <Divider style={{ border : '1px solid black' , margin : '10px 0px'}}/>
                        <Typography style={{ textAlign : 'center' , wordWrap : 'break-word' }}>{value}</Typography>
                    </CardContent>
                </Card>
            </center>
        </>
    )
}