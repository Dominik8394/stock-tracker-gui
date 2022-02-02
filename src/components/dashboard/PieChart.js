import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

const createPortfolioShares = (stocks) => {

    /* array that holds a stock and its partial share */
    let portfolio = [];

    /* partial share for each stock */
    let share;

    /* array of stocks that have already been seen */
    let seen = [];

    /* size of the portfolio */
    let portfolioSize = 0;


    if (stocks) {
        stocks.forEach((stock) => {
            let AMOUNT = stock.amount;
            portfolioSize += AMOUNT;
        });
    }

    console.log("Portfolio size: ", portfolioSize);


    if (stocks) {
        stocks.forEach((stock) => {
            let NAME = stock.title || stock.name;
            let AMOUNT = stock.amount;

            if (!seen.includes(NAME)) {
                if (AMOUNT > 0) {
                    share = (AMOUNT / portfolioSize) * 100;
                    let newShare = {
                        name: NAME,
                        amount: AMOUNT,
                        share: share
                    }

                    portfolio.push(newShare);
                    seen.push(NAME);
                }
            } else {
                console.log("I have seen theses stocks: ", seen);
                portfolio.forEach((knownStock) => {
                    if (knownStock.title || knownStock.name === NAME) {
                        share = ((knownStock.amount + AMOUNT) / portfolioSize) * 100;
                        knownStock.share = share;
                    }
                })
            }

        });
    }

    return portfolio;

}


const createLabels = (portfolio) => {


    /* Holds the labels for the pie chart */
    let labels = [];

    const reducer = (acc, item) => {
        return acc.includes(item.name) ? acc : [...acc, item.name];
    }

    labels = portfolio.reduce(reducer, labels);

    return labels;
}

const PieChart = ({ stocks }) => {
    const [portfolio, setPortfolio] = useState(() => createPortfolioShares(stocks));
    const [labels, setLabels] = useState(() => createLabels(portfolio));


    useEffect(() => {
        setPortfolio(() => createPortfolioShares(stocks));
    }, [stocks]);

    useEffect(() => {
        setLabels(() => createLabels(portfolio));
    }, [portfolio]);

    const data = {
        labels: labels,
        datasets: [
            {
                label: '# of Votes',
                data: portfolio.map((item) => item.share),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="d-flex justify-content-around align-items-center barchart-container">
            <Pie data={data} style={{ "maxHeight": "100%", "maxWidth": "100%" }} />
        </div>
    )
}

export default PieChart;