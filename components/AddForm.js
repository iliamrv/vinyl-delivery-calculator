import { useState } from "react";
import supabase from "../src/supabase";

function AddForm({ setNewItems }) {
  const [vinylTitle, setVinylTitle] = useState("");
  const [vinylPrice, setVinylPrice] = useState("");

  function ResetFields() {
    setVinylPrice("");
    setVinylTitle("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { data: newItem, error } = await supabase
      .from("lp_items")
      .insert([{ price: vinylPrice, name: vinylTitle }])
      .select();

    ResetFields();
  }

  return (
    <div>
      <h2>Add new item</h2>

      <form onSubmit={handleSubmit}>
        <div className="flex  flex-row flex-wrap gap-3">
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
              className="shrink w-24"
              type="number"
              min="0"
              step="0.1"
              id=""
              placeholder="Price"
              value={vinylPrice}
              onChange={(e) => setVinylPrice(e.target.value)}
            />
          </div>

          <div className="">
            <input
              type="submit"
              value="Add"
              className="basis-1/4 form-input bg-transparent hover:bg-blue-500 text-blue-700 font-semibold
               hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddForm;
