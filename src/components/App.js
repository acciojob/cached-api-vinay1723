import React, { useEffect, useState, useMemo } from "react";

export default function CachedApi() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(""); // input filter

  useEffect(() => {
    setLoading(true);
    let url = "https://jsonplaceholder.typicode.com/posts";
    if (userId) {
      url += `?userId=${userId}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, [userId]); // re-fetch only if userId changes

  // 🔑 useMemo to cache results
  const cachedPosts = useMemo(() => {
    console.log("Filtering posts...");
    return posts;
  }, [posts]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cached API with useMemo</h2>

      <div>
        <label>
          Filter by User ID:{" "}
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter userId"
          />
        </label>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {cachedPosts.map((post) => (
            <li key={post.id}>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
