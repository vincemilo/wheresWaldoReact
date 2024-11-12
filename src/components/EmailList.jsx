import { useState, useEffect } from "react";

export default function EmailList() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let url = "http://localhost:3001/users";
      try {
        const response = await fetch(url, { mode: "cors" });
        if (response.status >= 400) {
          throw new Error("server error");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);

    const postData = async () => {
      let url = "http://localhost:3001/users";
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name, email: email }),
        });
        if (response.status >= 400) {
          throw new Error("server error");
        }
        const post = await response.json();
        let newData = [...data, post];
        setData(newData);
        setName("");
        setEmail("");
      } catch (error) {
        console.log(error);
      }
    };
    postData();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;
  return (
    <div>
      <ul>
        {data.map((e) => {
          return (
            <li key={e.id}>
              {e.name} {e.email}
            </li>
          );
        })}
      </ul>
      <form method="post" onSubmit={handleSubmit}>
        <label>
          Name:{" "}
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="first-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          Email:{" "}
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
