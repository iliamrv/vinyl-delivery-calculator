import { useState, useEffect } from "react";
import supabase from "../src/supabase";
import Table from "../components/Table";
import AddForm from "../components/AddForm";
import Loading from "./loading";

import "/styles/globals.css";

export default function Page() {
  const db_name = `lp_items`;
  const initialDeliveryPrice = 16.72;
  // const initialEuroRate = 3.4;

  const [isLoading, setIsLoading] = useState(false);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [deliveryPrice, setDeliveryPrice] = useState(initialDeliveryPrice);
  // const [euroRate, setEuroRate] = useState(initialEuroRate);

  const [newItems, setNewItems] = useState([]);

  async function getLPitems() {
    const { data: lp_items, error } = await supabase.from(db_name).select("*");
    setNewItems(lp_items);
    setIsLoading(true);
  }

  getLPitems();

  useEffect(() => {
    fetch("https://api.nbrb.by/exrates/rates/451").then((res) =>
      res.json().then((data) => {
        setCurrencyOptions([data.Cur_OfficialRate]);
      })
    );
  }, []);

  return (
    <>
      <div className="max-w-md mx-auto bg-white rounded-xl   md:max-w-2xl px-2">
        <div className="prose lg:prose-xl mt-10 my-10 md:px-5">
          <h1>Vinyl Delivery Calculator</h1>

          {isLoading ? (
            <Table
              newItems={newItems}
              deliveryPrice={deliveryPrice}
              currencyOptions={currencyOptions}
              setIsLoading={setIsLoading}
            />
          ) : (
            <Loading />
          )}

          <div className="bg-[#f5f5f5] p-10 rounded ">
            <div className="flex justify-start gap-x-8 gap-y-4 ">
              <label>Delivery price, €</label>

              <input
                className=" w-20"
                type="number"
                min="0"
                name=""
                id="delivery-price"
                value={deliveryPrice}
                onChange={(e) => setDeliveryPrice(e.target.value)}
              />
            </div>
            <div className="flex justify-start gap-x-8 gap-y-4 mt-10 ">
              <label>Euro rate (NBRB): </label>

              {currencyOptions}

              {/* 


              <input
                className=" w-20"
                type="number"
                min="0"
                name=""
                defaultValue={currencyOptions}
                id="currency-price"
                onChange={(e) => setEuroRate(e.target.value)}
              /> */}
            </div>
            <AddForm setNewItems={setNewItems} />
          </div>
        </div>
      </div>
    </>
  );
}
