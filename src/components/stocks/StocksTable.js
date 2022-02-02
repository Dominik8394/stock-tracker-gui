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
                    <Table responsive bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>ISIN</th>
                                <th>Name</th>
                                <th>Kurswert</th>
                                <th>Gekauft am</th>
                                <th>Anteile</th>
                                <th>Transaktionskosten</th>
                                <th>Gesamtkosten</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.isin}</td>
                                        <td>{item.name || item.title}</td>
                                        <td>{item.price} €</td>
                                        <td>{item.boughtAt.substring(0, 10)}</td>
                                        <td><div className="badge bg-secondary" style={{ width: "50%" }}>{item.amount}</div></td>
                                        <td>{item.transaction} €</td>
                                        <td>{item.totalAmount} €</td>
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

