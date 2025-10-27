import UserPostsManager from "../components/UserPostsManager";
import NoteManager from "../components/NoteManager";
import Analytics from "../components/Analytics";
import WeatherWidget from "../components/WeatherWidget";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <header className="flex justify-between items-center mb-10 bg-white rounded-2xl shadow-sm p-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-500">Welcome back to your workspace</p>
        </div>
        <button
          onClick={logout}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm hover:shadow-md focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        <UserPostsManager />
        <NoteManager />
        <Analytics />
        <WeatherWidget />
      </div>
    </div>
  );
};

export default Dashboard;
