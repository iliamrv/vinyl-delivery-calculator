import { useState } from "react";
import supabase from "../src/supabase";
import "/styles/globals.css";
import Table from "../components/Table";

import AddForm from "../components/AddForm";

export default function Page() {
  const [deliveryPrice, setDeliveryPrice] = useState("16.72");
  const [euroRate, setEuroRate] = useState("3.3");

  const [newItems, setNewItems] = useState([]);
  async function getFacts() {
    const { data: facts, error } = await supabase.from("facts").select("*");
    setNewItems(facts);
  }

  getFacts();

  return (
    <>
      <div className="md:container md:mx-auto sm:mx-auto  flex justify-center ">
        <div className="prose lg:prose-xl mt-20 my-20">
          <h1 className="text-13xl font-bold">Vinyl Delivery Calculator</h1>

          <Table newItems={newItems} deliveryPrice={deliveryPrice} />

          <div className="bg-[#f5f5f5] p-10 rounded">
            <div className="flex justify-start gap-x-8 gap-y-4 ">
              <label htmlFor="">Delivery price, €</label>

              <input
                className=" w-20"
                type="number"
                name=""
                id="delivery-price"
                value={deliveryPrice}
                onChange={(e) => setDeliveryPrice(e.target.value)}
              />
            </div>
            <div className="flex justify-start gap-x-8 gap-y-4 mt-10 ">
              <label htmlFor="">Euro rate</label>

              <input
                step="0.1"
                className=" w-20"
                type="number"
                placeholder={euroRate}
                name=""
                min={euroRate}
                id="delivery-price"
                onChange={(e) => setEuroRate(e.target.value)}
              />
            </div>
            <AddForm setNewItems={setNewItems} />
          </div>
        </div>
      </div>
    </>
  );
}
