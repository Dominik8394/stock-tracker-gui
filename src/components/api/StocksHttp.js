import axios from 'axios';

/**
 * Retrieves all stock information from the server.
 * Only for testing purposes!
 * @returns array of stock data
 */
export const getStockInformation = () => {
    return axios.get('http://localhost:3001/api/stocks')
        .then(res => {
            return res.data;
        });
}


/**
 * Retrieves a list of stock data that has been created by a single user.
 * @param {user email} param0 
 * @returns list of stock data regards a particular user
 */
export const getStockInformationByUser = (email) => {
    return axios.get('http://localhost:3001/api/stocks/' + email)
        .then(res => {
            return res.data;
        });
}

/**
 * Creates a new entry, i.e., a purchase or sell for a particular user.
 * 
 * @param {isin} ISIN of a particular stock 
 * @param {name} title of the stock, commonly name of the company
 * @param {boughtAt} date of the time when the purchase or sell happened
 * @param {amount} amount of stocks that have been purchased/sold 
 * @param {Transaction} transaction costs of a single stock 
 * @param {Price} fee for the transaction 
 * @param {totalAmount} calculated cost for the investment,i.e., cost + fee. 
 * @param {user} user who performed the transaction
 * @returns Http status 201 if successful
 */
export const createStockInformation = ({ISIN, Name, Date, Amount, Transaction, Price, Total}, email) => {
    console.log("Inside request...");
    
    return axios.post('http://localhost:3001/api/stock`', {
        data: {
            isin: ISIN,
            name: Name,
            boughtAt: Date,
            amount: Amount,
            transaction: Transaction,
            price: Price,
            totalAmount: Total,
            user: email
        }
    })
        .then(res => {
            return res.status;
        });
}