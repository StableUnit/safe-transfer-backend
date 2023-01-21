import fetch, { Headers } from 'node-fetch';

export async function getCryptoPrice(ticker: string) {
    try {
        const headers = new Headers();
        const CMC_PRO_API_KEY = process.env.CMC_PRO_API_KEY || "";
        headers.append("X-CMC_PRO_API_KEY", CMC_PRO_API_KEY);
        const response = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${ticker}`, {
            headers: headers
        });
        // console.log(response);
        const data = await response.json() as {data: { [ticker: string]: { quote: { USD: { price: number } } } } };
        return data.data[ticker].quote.USD.price;
    } catch (error) {
        console.error(error);
    }
}