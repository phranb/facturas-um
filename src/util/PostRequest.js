import React, { useEffect, useState } from "react";

export const PostRequest = () => {
  // const [facturas, setFacturas] = useState([]);
  const [id, setId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const url = "https://reqres.in/api/users";
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}?id=${id}`, headers);
        const json = await response.json();
        // setFacturas(json);
        setPosts(json);
        console.log(json);
        setName(json.data.first_name);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [id]);

  let myfield;

  const handleChange = (e) => {
    myfield = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setId(myfield);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange}></input>
        <button type="submit">Submit</button>
      </form>
      <div>
        <h1>Name: {name}</h1>
        {/* <h1>Email: {posts.data.email}</h1> */}
      </div>
      <div></div>
    </div>
  );
};
