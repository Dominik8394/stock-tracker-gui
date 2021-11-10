import React from 'react';

// Bootstrap imports
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';



import './StocksTable.css';


const StocksTable = (props) => {

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
                <div className="table-container mt-3">
                    <Table responsive striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>ISIN</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Bought At</th>
                                <th>Amount</th>
                                <th>Transaction Costs</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.isin}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.boughtAt}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.transaction}</td>
                                        <td>{item.totalAmount}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            </React.Fragment>

    );
}

export default StocksTable;

