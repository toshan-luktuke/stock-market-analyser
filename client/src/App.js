import { useEffect, useState, useMemo } from "react";
import protobuf from "protobufjs";
import Chart from "react-apexcharts";
const { Buffer } = require("buffer/");

export default App;

const chartReq = "http://localhost:5000/stock/chart/tsla";

let direction;
let price;
let priceTime;

const directionEmojis = {
  up: "🚀",
  down: "💩",
  "": "",
};

const chart = {
  options: {
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: "TESLA stock go brrrr",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    theme: {
      mode: "dark",
      pallete: "pallete10",
    },
  },
};

const round = (number) => {
  return number ? +number.toFixed(2) : null;
};

function formatPrice(price) {
  return `$${price.toFixed(3)}`;
}

async function getChart() {
  const response = await fetch(chartReq);
  return response.json();
}

function App() {
  return (
    <>
      <div className="ticker-wrap">
        <div className="ticker">
          <Item />
        </div>
      </div>
      <Ch />
    </>
  );
}

function Item() {
  const [stock, setStock] = useState(null);
  useEffect(() => {
    const ws = new WebSocket("wss://streamer.finance.yahoo.com");
    protobuf.load("./YPricingData.proto", (error, root) => {
      const Yaticker = root.lookupType("yaticker");
      ws.onopen = function open() {
        console.log("connected");
        ws.send(
          JSON.stringify({
            subscribe: ["TSLA"],
          })
        );
      };

      ws.onclose = function close() {
        console.log("disconnected");
      };

      ws.onmessage = function incoming(data) {
        console.log("comming message");
        // console.log(data);
        const next = Yaticker.decode(new Buffer(data.data, "base64"));
        setStock(next);
      };
    });
  }, []);

  return (
    <div className="ticker__item">
      {stock && <>{stock.id}</>}
      {stock && formatPrice(stock.price)}
    </div>
  );
}

function Ch() {
  const [series, setSeries] = useState([
    {
      data: [],
    },
  ]);
  const [price, setPrice] = useState(-1);
  const [prevPrice, setPrevPrice] = useState(-1);
  const [priceTime, setPriceTime] = useState(null);

  useEffect(() => {
    let timeoutId;
    async function getLatestPrice() {
      try {
        let data = await getChart();
        data = data.data;
        const gme = data.chart.result[0];
        setPrevPrice(price);
        setPrice(gme.meta.regularMarketPrice.toFixed(2));
        setPriceTime(new Date(gme.meta.regularMarketTime * 1000));
        const quote = gme.indicators.quote[0];
        const prices = gme.timestamp.map((timestamp, index) => ({
          x: new Date(timestamp * 1000),
          y: [
            quote.open[index],
            quote.high[index],
            quote.low[index],
            quote.close[index],
          ].map(round),
        }));
        setSeries([
          {
            data: prices,
          },
        ]);
      } catch (error) {
        console.log(error);
      }
      timeoutId = setTimeout(getLatestPrice, 5000 * 2);
    }

    getLatestPrice();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [price]);
  direction = useMemo(
    () => (prevPrice < price ? "up" : prevPrice > price ? "down" : ""),
    [prevPrice, price]
  );

  return (
    <div className="chart">
      <div className={["price", direction].join(" ")}>
        TSLA: ${price} {directionEmojis[direction]}
      </div>
      <div className="price-time">
        {priceTime && priceTime.toLocaleTimeString()}
      </div>
      <Chart
        options={chart.options}
        series={series}
        type="candlestick"
        width="100%"
        height={320}
      />
    </div>
  );
}
