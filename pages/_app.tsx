import { useState } from "react";
import supabase from "../src/supabase";
import "/styles/globals.css";
import { Recycle, Trash2, X } from "react-bootstrap-icons";

import AddForm from "../components/AddForm";

export default function Page() {
  const [deliveryPrice, setDeliveryPrice] = useState("16.72");
  const [euroRate, setEuroRate] = useState("3.3");

  // const newprice = deliveryPrice;

  const [newItems, setNewItems] = useState([]);
  async function getFacts() {
    const { data: facts, error } = await supabase.from("facts").select("*");
    setNewItems(facts);
  }

  getFacts();

  const handleDelete = async (fact) => {
    // console.log(fact.id);

    const { data, error } = await supabase
      .from("facts")
      .delete()
      .eq("id", fact.id);
  };

  return (
    <>
      <div className="md:container md:mx-auto flex justify-center">
        <article className="prose lg:prose-xl mt-20 my-20">
          <h1 className="text-13xl font-bold">Vinyl Delivery Calculator</h1>
          <table className="min-w-full  ">
            <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
              <tr>
                <th>#</th>
                <th>LP Title</th>
                <th>Old price</th>
                <th>New price</th>
                <th>Profit</th>{" "}
                <th>
                  <Trash2 size={22} />
                </th>
              </tr>
            </thead>
            <tbody>
              {newItems.map((fact) => (
                <tr key={fact.id}>
                  <td>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                      {newItems.indexOf(fact) + 1}
                    </span>
                  </td>
                  <td id={fact.id} key={fact.id}>
                    {fact.name}
                  </td>
                  <td>
                    <span className="price">€{fact.price} </span>
                  </td>
                  <td>
                    {/* <span className="price">€{fact.newprice} </span> */}
                    <span className="price">
                      €{" "}
                      {Math.round(
                        fact.price +
                          Number(deliveryPrice) / newItems.length +
                          10
                      )}
                    </span>
                  </td>

                  <td></td>
                  <td>
                    <button onClick={() => handleDelete(fact)}>
                      <X color="royalblue" size={22} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
        </article>
      </div>
    </>
  );
}
