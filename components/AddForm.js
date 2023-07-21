import { useState } from "react";
import supabase from "../src/supabase";

function AddForm({ setNewItems }) {
  const [vinylTitle, setVinylTitle] = useState("");

  const [vinylPrice, setVinylPrice] = useState("");
  // const [vinylNewPrice, setVinylNewPrice] = useState("");

  // const newItem = {
  //   id: Math.round(Math.random() * 10000000),
  //   name: vinylTitle,
  //   price: vinylPrice,
  //   newprice: vinylNewPrice,
  // };

  async function handleSubmit(e) {
    e.preventDefault();

    // console.log(newItem);

    const { data: newItem, error } = await supabase
      .from("facts")
      .insert([{ price: vinylPrice, name: vinylTitle }])
      .select();
    setNewItems((items) => [newItem[0], ...items]);
    setVinylPrice("");
    setVinylTitle("");
  }

  return (
    <div>
      <h2>Add new item</h2>

      <form onSubmit={handleSubmit}>
        <div className="flex justify-start">
          <div>
            <input
              type="text"
              placeholder="LP title"
              name="vinyl-title"
              id="vinyl-title"
              value={vinylTitle}
              onChange={(e) => setVinylTitle(e.target.value)}
            />
          </div>

          <div>
            <input
              className="mx-10 w-20"
              type="number"
              id=""
              value={vinylPrice}
              onChange={(e) => setVinylPrice(e.target.value)}
            />
          </div>

          <div>
            <input
              type="submit"
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddForm;
