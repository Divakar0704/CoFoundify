import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Ideas from './pages/Ideas';
import Collaborators from './pages/Collaborators';
import PostIdea from './pages/PostIdea';
import Chat from './pages/Chat';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Workspaces from './pages/Workspaces';
import WorkspaceDetail from './pages/WorkspaceDetail';
import CreateWorkspace from './pages/CreateWorkspace';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="py-8 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ideas" element={<Ideas />} />
              <Route path="/collaborators" element={<Collaborators />} />
              <Route path="/post-idea" element={<PostIdea />} />
              <Route path="/chat/:id" element={<Chat />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/workspaces" element={<Workspaces />} />
              <Route path="/workspace/create" element={<CreateWorkspace />} />
              <Route path="/workspace/:id" element={<WorkspaceDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;