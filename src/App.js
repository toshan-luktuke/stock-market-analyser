import { useEffect, useState } from "react";
import protobuf from "protobufjs";
const { Buffer } = require("buffer/");

function formatPrice(price) {
  return `$${price.toFixed(3)}`;
}

function App() {
  return (
    <div className="ticker-wrap">
      <div className="ticker">
        <Item />
      </div>
    </div>
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
            subscribe: ["TTM"],
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

export default App;
