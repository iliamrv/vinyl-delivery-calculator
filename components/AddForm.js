import { useState } from "react";

function AddForm() {
  const [vinylTitle, setVinylTitle] = useState("");
  const [deliveryPrice, setDeliveryPrice] = useState("");
  const [vinylPrice, setVinylPrice] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(vinylPrice, vinylTitle);
  }

  return (
    <div className="bg-[#f5f5f5] p-10 rounded">
      <h2>Delivery price</h2>

      <div className="flex justify-start gap-x-8 gap-y-4 ">
        <div className="">
          <label htmlFor="">Delivery price, €</label>
        </div>

        <input
          className=" w-20"
          type="number"
          name=""
          id="delivery-price"
          value={deliveryPrice}
          onChange={(e) => setDeliveryPrice(e.target.value)}
        />
      </div>

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
