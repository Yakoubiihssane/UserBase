import { useState } from 'react';
import Header from './components/Header';
import UserCard from './components/UserCard';
import UserForm from './components/UserForm';
import UserModal from './components/UserModal';
import EmptyState from './components/EmptyState';
import { useUsers } from './hooks/useUsers';
import './index.css';

export default function App() {
  const { users, loading, toast, addUser, removeUser, getDetails } = useUsers();
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDetails = async (id) => {
    const user = await getDetails(id);
    setSelectedUser(user);
  };

  return (
    <div className="app">
      {/* Toast notification */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}

      <div className="container">
        <Header
          count={users.length}
          onAdd={() => setShowForm(true)}
        />

        <main className="main">
          {loading ? (
            <div className="loader-wrap">
              <div className="loader" />
            </div>
          ) : users.length === 0 ? (
            <EmptyState onAdd={() => setShowForm(true)} />
          ) : (
            <div className="user-grid">
              {users.map((user, i) => (
                <div
                  key={user._id}
                  className="card-appear"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <UserCard
                    user={user}
                    onDetails={handleDetails}
                    onDelete={removeUser}
                  />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {showForm && (
        <UserForm onSubmit={addUser} onClose={() => setShowForm(false)} />
      )}

      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}