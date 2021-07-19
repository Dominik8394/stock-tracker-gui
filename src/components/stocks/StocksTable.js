import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import Snackbar from '@material-ui/core/Snackbar';
// import CircularProgress from '@material-ui/core/CircularProgress';

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
        props.data ?
           
        <React.Fragment>
            <Alert variant="info" className="text-center">
                Leider verfügen wir derzeit über keine Informationen zu 
                    deinem Bestand. Füge gleich deine erste <Link to="/new-entry">Transaktion</Link> hinzu!
            </Alert>
        </React.Fragment>
        
        :

            <React.Fragment>
                <TableContainer component={Paper}>
                    <Table className="table" size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ISIN</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Gekauft am&nbsp;(Datum)</TableCell>
                                <TableCell align="right">Anzahl</TableCell>
                                <TableCell align="right">Preis&nbsp;(€)</TableCell>
                                <TableCell align="right">Transaktionsgebühr&nbsp;(€)</TableCell>
                                <TableCell align="right">Insgesamt&nbsp;(€)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                props.data.map((item, key) => (
                                    <TableRow key={key}>
                                        <TableCell component="th" scope="row">
                                            {item.isin}
                                        </TableCell>
                                        <TableCell align="right">
                                            {item.title}
                                        </TableCell>
                                        <TableCell align="right">
                                            {item.boughtAt}
                                        </TableCell>
                                        <TableCell align="right">
                                            {item.amount}
                                        </TableCell>
                                        <TableCell align="right">
                                            {item.cost}
                                        </TableCell>
                                        <TableCell align="right">
                                            {item.fee}
                                        </TableCell>
                                        <TableCell align="right">
                                            {item.totalAmount}
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
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
