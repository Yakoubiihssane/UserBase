import { useState, useEffect, useCallback } from 'react';
import { getUsers, getUserById, createUser, deleteUser } from '../api/users';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch {
      showToast('Impossible de charger les utilisateurs', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const addUser = async (data) => {
    await createUser(data);
    showToast(`${data.name} a été ajouté !`);
    fetchUsers();
  };

  const removeUser = async (id, name) => {
    await deleteUser(id);
    showToast(`${name} a été supprimé`, 'info');
    fetchUsers();
  };

  const getDetails = async (id) => {
    const res = await getUserById(id);
    return res.data;
  };

  return { users, loading, toast, addUser, removeUser, getDetails };
}