import UserPostsManager from "../components/UserPostsManager";
import NoteManager from "../components/NoteManager";
import Analytics from "../components/Analytics";
import WeatherWidget from "../components/WeatherWidget";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <UserPostsManager />
        <NoteManager />
        <Analytics />
        <WeatherWidget />
      </div>
    </div>
  );
};

export default Dashboard;
