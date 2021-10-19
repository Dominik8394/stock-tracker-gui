import React from 'react';

// Material ui imports
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';

// import Snackbar from '@material-ui/core/Snackbar';
// import CircularProgress from '@material-ui/core/CircularProgress';

// Bootstrap imports
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';



import './StocksTable.css';


const StocksTable = (props) => {

    // const [open, setOpen] = useState(false);
    // const [error, setError] = useState('');

    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //     setOpen(false);
    // }




    return (
        !props.data ?
            <React.Fragment>
                <Alert variant="info" className="text-center">
                    Leider verfügen wir derzeit über keine Informationen zu
                    deinem Bestand. Füge gleich deine erste <Link to="/new-entry">Transaktion</Link> hinzu!
                </Alert>
            </React.Fragment>

            :

            <React.Fragment>
                <h3 className="text-center mb-5" style={{color: 'white'}}>Überblick</h3>
                <Box
                    sx={{ width: '100%', height: 400, maxWidth: '95%', bgcolor: '#2f3042', color: 'white', marginBottom: '25px' }}
                >
                    <FixedSizeList
                        height={400}
                        width={'100%'}
                        itemSize={46}
                        itemCount={5}
                        overscanCount={5}
                    >
                        {renderRow}
                    </FixedSizeList>
                </Box>

                {/* <div>
                    {
                        error && <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}
                            message={error}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                        </Snackbar>
                    }

                </div> */}
            </React.Fragment>

    );
}

export default StocksTable;

const renderRow = (props) => {
    const { index, style } = props;

    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton>
                <ListItemText primary={`AT&T`} />
                <ListItemText primary={`25`} />
                <ListItemText primary={`21.28`} />
                <ListItemText primary={`20.02.2021`} />
            </ListItemButton>
        </ListItem>
    );
}

