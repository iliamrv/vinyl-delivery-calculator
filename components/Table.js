import React from "react";
import supabase from "../src/supabase";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";

function Table({ newItems, deliveryPrice, currencyOptions, setIsLoading }) {
  // Taxes for every item

  const tax = 10;

  let sum = 0;
  let taxSum = 0;

  newItems.forEach((lp, index) => {
    sum += lp.price;
    taxSum += lp.price + tax;
    lp.newprice = Math.round(
      (lp.price + deliveryPrice / newItems.length + tax) * currencyOptions
    );
  });

  const handleDelete = async (db_name) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("lp_items")
      .delete()
      .eq("id", db_name.id);
    setIsLoading(false);
  };

  const totalPrice = Math.round(sum + deliveryPrice);
  const newTotalPrice = Math.round(taxSum) + +deliveryPrice;
  const profit = Math.round(taxSum - sum);

  return (
    <div>
      <table className="table w-full">
        <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
          <tr>
            <th>#</th>
            <th>LP Title</th>
            <th>Old price</th>
            <th>New price</th>

            <th>
              <DeleteIcon />
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
                <span className="price">{`BYR` + fact.newprice}</span>
              </td>

              <td>
                <button onClick={() => handleDelete(fact)}>
                  <ClearIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />
      <p>
        Total Price: <b>€{totalPrice} </b>
        <br />
        New price: <b>€{newTotalPrice}</b>
        <br />
        Profit: <b>€{profit}</b> (€
        {profit / newItems.length} for each)
      </p>
      <hr />
    </div>
  );
}

export default Table;
