import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const User = () => {
  const { id } = useParams();
  const [localTodos, setLocalTodos] = useState<{ [key: number]: boolean }>({});

  const { data: user, isLoading: userLoading } = useQuery<User>({
    queryKey: ["user", id],
    queryFn: () =>
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) =>
        res.json()
      ),
  });

  const { data: posts, isLoading: postsLoading } = useQuery<Post[]>({
    queryKey: ["posts", id],
    queryFn: () =>
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`).then((res) =>
        res.json()
      ),
  });

  const { data: todos, isLoading: todosLoading } = useQuery<Todo[]>({
    queryKey: ["todos", id],
    queryFn: () =>
      fetch(`https://jsonplaceholder.typicode.com/todos?userId=${id}`).then((res) =>
        res.json()
      ),
  });

  useEffect(() => {
    // Load todo states from localStorage when component mounts
    const savedTodos = localStorage.getItem(`todos-${id}`);
    if (savedTodos) {
      setLocalTodos(JSON.parse(savedTodos));
    }
  }, [id]);

  const toggleTodo = (todoId: number) => {
    setLocalTodos((prev) => {
      const newState = {
        ...prev,
        [todoId]: !prev[todoId],
      };
      // Save to localStorage
      localStorage.setItem(`todos-${id}`, JSON.stringify(newState));
      return newState;
    });
  };

  if (userLoading || postsLoading || todosLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!user) {
    return <div className="p-6">User not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* User Info */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h1 className="text-3xl font-bold mb-4">{user.name}</h1>
          <p className="mb-2">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Phone:</span> {user.phone}
          </p>
          <p>
            <span className="font-semibold">Website:</span>{" "}
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              {user.website}
            </a>
          </p>
        </div>

        {/* Posts Section */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Posts</h2>
          <div className="space-y-4">
            {posts?.map((post) => (
              <div key={post.id} className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600">{post.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Todos Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4">To-dos</h2>
          <div className="space-y-2">
            {todos?.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                onClick={() => toggleTodo(todo.id)}
              >
                <input
                  type="checkbox"
                  checked={localTodos[todo.id] ?? todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="h-5 w-5 rounded border-gray-300"
                />
                <span
                  className={`flex-1 ${
                    (localTodos[todo.id] ?? todo.completed)
                      ? "line-through text-green-500"
                      : ""
                  }`}
                >
                  {todo.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;