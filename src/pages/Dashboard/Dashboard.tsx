import { useEffect, useState } from "react";
import Header from "../../components/Header/Header.component";
import "./Dashboard.css";
import axios from "axios";

// idek what this should be tbh
export interface IWaifu {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function Dashboard() {
  const [market, setMarket] = useState<IWaifu[]>([]);

  const getWaifus = async () => {
    const waifus = await axios.get("http://localhost:3001/waifu");

    setMarket(waifus.data);
  };

  useEffect(() => {
    getWaifus();
  }, [getWaifus]);

  // Eventually have an animation here
  if (market.length === 0) {
    return (
      <div>
        <Header />
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <h1>Store</h1>
      <div className="market">
        {market.map((_, index) => {
          return (
            <div>
              <h1>{market[index].name}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}
