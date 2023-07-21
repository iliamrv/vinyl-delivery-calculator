import { useEffect, useState } from "react";
import supabase from "../src/supabase";
import "/styles/globals.css";

import AddForm from "../components/AddForm";

export default function Page() {
  const [newItems, setNewItems] = useState([]);
  async function getFacts() {
    const { data: facts, error } = await supabase.from("facts").select("*");
    setNewItems(facts);
  }

  getFacts();

  useEffect(function () {}, []);

  return (
    <>
      <div className="md:container md:mx-auto flex justify-center">
        <article className="prose lg:prose-xl mt-20 my-20">
          <h1 className="text-13xl font-bold">Vinyl Delivery Calculator</h1>

          <table className="min-w-full  ">
            <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
              <tr>
                <th>LP Title</th>
                <th>Old price</th>
                <th>New price</th>
              </tr>
            </thead>

            <tbody>
              {newItems.map((fact) => (
                <tr key={fact.id}>
                  <td id={fact.id} key={fact.id}>
                    {fact.name}
                  </td>
                  <td>
                    <span className="price">€{fact.price} </span>
                  </td>
                  <td>
                    <span className="price">€{fact.newprice} </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <AddForm setNewItems={setNewItems} />
        </article>
      </div>
    </>
  );
}
