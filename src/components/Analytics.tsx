import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

const Analytics = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users").then((r) => r.json()),
      fetch("https://jsonplaceholder.typicode.com/posts").then((r) => r.json()),
      fetch("https://jsonplaceholder.typicode.com/todos").then((r) => r.json()),
    ])
      .then(([usersData, postsData, todosData]) => {
        setUsers(usersData);
        setPosts(postsData);
        setTodos(todosData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">Loading...</div>;

  const postsCount = users.map((u) => ({
    name: u.name,
    count: posts.filter((p) => p.userId === u.id).length,
  }));
  const todosCompletedCount = users.map((u) => ({
    name: u.name,
    count: todos.filter((t) => t.userId === u.id && t.completed).length,
  }));

  const mostPosts = postsCount.reduce((a, b) => (b.count > a.count ? b : a));
  const fewestPosts = postsCount.reduce((a, b) => (b.count < a.count ? b : a));
  const mostTodos = todosCompletedCount.reduce((a, b) => (b.count > a.count ? b : a));
  const fewestTodos = todosCompletedCount.reduce((a, b) => (b.count < a.count ? b : a));

  return (
    <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <h2 className="font-bold mb-2 text-lg">Analytics</h2>
      <p>Total users: {users.length}</p>
      <p>Most posts: {mostPosts.name} ({mostPosts.count})</p>
      <p>Fewest posts: {fewestPosts.name} ({fewestPosts.count})</p>
      <p>Most completed todos: {mostTodos.name} ({mostTodos.count})</p>
      <p>Fewest completed todos: {fewestTodos.name} ({fewestTodos.count})</p>
    </div>
  );
};

export default Analytics;
