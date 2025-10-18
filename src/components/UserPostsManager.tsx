import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserPostsManager = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching users");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4 bg-white rounded shadow">Loading...</div>;
  if (error) return <div className="p-4 bg-red-100 rounded">{error}</div>;

  return (
    <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
      <h2 className="font-bold mb-2 text-lg">Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="border-b py-1">
            <span className="font-semibold">{user.name}</span> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPostsManager;
