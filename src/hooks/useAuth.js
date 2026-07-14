import { useState } from 'react';
import users from '../data/users.json';

const SESSION_KEY = 'sfg_session';

const getSavedSession = () => {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(getSavedSession);

  const login = (username, password) => {
    const found = users.find(
      (u) =>
        u.username.toLowerCase() === username.toLowerCase().trim() &&
        u.password === password
    );

    if (found) {
      // Store session without password
      const session = {
        id: found.id,
        username: found.username,
        name: found.name,
        role: found.role,
        avatar: found.avatar,
        loginAt: new Date().toISOString(),
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      setCurrentUser(session);
      return { success: true, user: session };
    }

    return { success: false, error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' };
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setCurrentUser(null);
  };

  return { currentUser, login, logout };
};
