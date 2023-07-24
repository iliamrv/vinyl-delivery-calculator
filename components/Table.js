import React from "react";
import supabase from "../src/supabase";
import { Trash2, X } from "react-bootstrap-icons";

function Table({ newItems, deliveryPrice }) {
  const handleDelete = async (fact) => {
    const { data, error } = await supabase
      .from("facts")
      .delete()
      .eq("id", fact.id);
  };

  let sum = 0;
  newItems.forEach((element) => {
    sum += element.price;
  });

  let addSum = 0;
  newItems.forEach((element) => {
    addSum += element.price + 10;
  });

  //   function addSum(items) {
  //     items = items + 10 + Number(deliveryPrice);
  //     return items;
  //   }

  return (
    <div>
      <table className="min-w-full ">
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
                    fact.price + Number(deliveryPrice) / newItems.length + 10
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

          <tr>
            <td></td>
            <td></td>
            <td>
              Total Price: <b>€{Math.round(sum + Number(deliveryPrice))}</b>
            </td>
            <td>
              New price: <b>€{Math.round(addSum) + Number(deliveryPrice)}</b>
            </td>
            <td>
              Profit: <b>€{Math.round(addSum - sum)}</b>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
