import { useState } from "react";
import supabase from "../src/supabase";

function AddForm({ setNewItems }) {
  const [vinylTitle, setVinylTitle] = useState("");

  const [vinylPrice, setVinylPrice] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    // console.log(newItem);

    const { data: newItem, error } = await supabase
      .from("facts")
      .insert([{ price: vinylPrice, name: vinylTitle }])
      .select();

    setVinylPrice("");
    setVinylTitle("");
  }

  return (
    <div>
      <h2>Add new item</h2>

      <form onSubmit={handleSubmit}>
        <div className="flex ">
          <div class="">
            <input
              className=""
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
              className="mx-10  w-20"
              type="number"
              id=""
              value={vinylPrice}
              onChange={(e) => setVinylPrice(e.target.value)}
            />
          </div>

          <div>
            <input
              type="submit"
              value="Add"
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold
               hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddForm;
