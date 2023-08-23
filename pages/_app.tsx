import { useState, useEffect } from "react";
import supabase from "../src/supabase";
import Table from "../components/Table";
import AddForm from "../components/AddForm";
import Loading from "../components/Loading";

import "/styles/globals.css";

const db_name = `lp_items`;

export default function Page() {
  const initialDeliveryPrice = 16.72;
  const [isLoading, setIsLoading] = useState(false);
  const [isSpinner, setIsSpinner] = useState(false);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [tax, setTax] = useState(+10);
  const [deliveryPrice, setDeliveryPrice] = useState(initialDeliveryPrice);
  const [newItems, setNewItems] = useState([]);

  const filterAfterDelete = (id) => {
    setNewItems((prevNewItems) => {
      return prevNewItems.filter((item) => item.id !== id);
    });
  };

  const handleDelete = async (db_name) => {
    setIsSpinner(true);
    const { data: movies, error } = await supabase
      .from("lp_items")
      .delete()
      .eq("id", db_name.id);
    filterAfterDelete(db_name.id);
    setIsSpinner(false);
  };

  useEffect(function () {
    async function getLpItems() {
      setIsLoading(true);
      const { data: movies, error } = await supabase.from(db_name).select("*");
      setNewItems(movies);
      setIsLoading(false);
    }
    getLpItems();
  }, []);

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
            <Loading />
          ) : (
            <Table
              newItems={newItems}
              handleDelete={handleDelete}
              deliveryPrice={deliveryPrice}
              currencyOptions={currencyOptions}
              isSpinner={isSpinner}
              tax={tax}
            />
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
                onChange={(e) => setDeliveryPrice(+e.target.value)}
              />
            </div>

            <div className="flex justify-start gap-x-8 gap-y-4 mt-10 ">
              <label>Tax for LP</label>

              <input
                className=" w-20"
                type="number"
                min="0"
                name=""
                id="tax"
                value={tax}
                onChange={(e) => setTax(+e.target.value)}
              />
            </div>

            <div className="flex justify-start gap-x-8 gap-y-4 mt-10 ">
              <label>Euro rate (NBRB): </label>
              {currencyOptions}
            </div>

            <AddForm setNewItems={setNewItems} />
          </div>
        </div>
      </div>
    </>
  );
}
