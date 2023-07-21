import AddForm from "../components/AddForm";

const items = [
  {
    id: "1",
    name: "Johnnie Taylor - The Johnnie Taylor Chronicle Volume Two",
    price: "40",
  },

  {
    id: "2",
    name: "Johnny Rivers - Live At The Whisky A Go-Go (LP, Album)",
    price: "22",
  },

  {
    id: "3",
    name: "Martha Reeves and The Vandellas - Dancing In The Street (LP, Comp)",
    price: "11",
  },

  {
    id: "4",
    name: "Lightnin' Hopkins - The Best Of Lightnin' Hopkins (LP, Comp) (Soul Parade - HHP-5013)",
    price: "23",
  },

  {
    id: "5",
    name: "Frank Sinatra - The Concert Sinatra (LP, Album, RE) (Reprise Records - K 44001)",
    price: "26",
  },
];

export default function Page() {
  const newItems = items;

  return (
    <>
      <div className="md:container md:mx-auto flex justify-center">
        <article className="prose lg:prose-xl mt-20 my-20">
          <h1 className="text-13xl font-bold">Vinyl Delivery Calculator</h1>

          <ul>
            {newItems.map((fact) => (
              <li id={fact.id} key={fact.id}>
                {fact.name} - <span className="price">€{fact.price}</span>
              </li>
            ))}
          </ul>

          <AddForm />
        </article>
      </div>
    </>
  );
}
