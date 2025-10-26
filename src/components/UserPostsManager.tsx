import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserPostsManager = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, error } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/users").then((res) => res.json()),
  });

  if (isLoading) return <div className="p-4 bg-white rounded shadow">Loading...</div>;
  if (error) return <div className="p-4 bg-red-100 rounded">Error fetching users</div>;

  return (
    <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
      <h2 className="font-bold mb-2 text-lg">Users</h2>
      <ul>
        {users?.map((user) => (
          <li
            key={user.id}
            className="border-b py-2 hover:bg-gray-50 cursor-pointer transition"
            onClick={() => navigate(`/users/${user.id}`)}
          >
            <span className="font-semibold">{user.name}</span>
            <br />
            <span className="text-sm text-gray-600">{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPostsManager;
