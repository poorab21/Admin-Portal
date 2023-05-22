import { Card, CardContent, Container, Typography } from "@mui/material";

const DataBox = (props) => {
    const { IconComponent , value , userType } = props
    return (
        <Card 
        style = {{
            margin : '10px' , 
            boxShadow : '2px 2px 2px 2px black' , 
            backgroundImage : 'linear-gradient(to bottom right,ivory,eggshell,white)' ,
            opacity : 0.9
             }}>
            <CardContent style={{ display : 'flex' , flexDirection : 'column' }}>
                <Container 
                style={{ width : 'fit-content' }} >
                    <IconComponent />
                </Container>
                <Typography 
                fontWeight={'bolder'}
                color={'black'}  
                variant="h5" 
                fontStyle={'italic'}
                fontFamily={'fantasy'}
                style = {{ flex : 1 , marginTop : '10px' , alignSelf : 'center' }} >
                    { 
                        value 
                    }
                </Typography>
                <Typography 
                style={{ flex : 1 , alignSelf : 'center' , textAlign : 'center' }}
                color={'black'}
                fontWeight={'bolder'}
                variant="subtitle2">
                    {userType}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default DataBox;