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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 group"
        >
          <svg
            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>

        {/* User Info */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8 transform hover:scale-[1.01] transition-all duration-300">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-lg">
              {user.name.charAt(0)}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{user.name}</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {user.email}
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {user.phone}
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 hover:underline"
                  >
                    {user.website}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Posts Section */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
              </svg>
              Posts
            </h2>
            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {posts?.map((post) => (
                <div key={post.id} className="group bg-gray-50 rounded-xl p-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-700 transition-colors duration-200">{post.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{post.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Todos Section */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              To-dos
            </h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {todos?.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200 border border-gray-100"
                  onClick={() => toggleTodo(todo.id)}
                >
                  <input
                    type="checkbox"
                    checked={localTodos[todo.id] ?? todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors duration-200"
                  />
                  <span
                    className={`flex-1 transition-all duration-200 ${
                      (localTodos[todo.id] ?? todo.completed)
                        ? "line-through text-green-500"
                        : "text-gray-700"
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
    </div>
  );
};

export default User;