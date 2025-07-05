// App.jsx
import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Theme Context
const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () =>
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
const useTheme = () => useContext(ThemeContext);

// Auth Context
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = () => setUser({ name: 'John' });
  const logout = () => setUser(null);
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => useContext(AuthContext);

// Protected Route
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

// SearchBar Component (Controlled Component)
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={query}
      onChange={handleChange}
    />
  );
};

// ProductCard Component (Props + useState toggle)
const ProductCard = ({ name, price }) => {
  const [liked, setLiked] = useState(false);
  const toggleLike = () => setLiked(prev => !prev);

  return (
    <div style={{ border: '1px solid gray', padding: '1rem', margin: '1rem' }}>
      <h3>{name}</h3>
      <p>Price: ₹{price}</p>
      <button onClick={toggleLike}>
        {liked ? 'Liked ❤️' : 'Like 🤍'}
      </button>
    </div>
  );
};

// ProductList Component
const ProductList = () => {
  const products = [
    { id: 1, name: 'Shirt', price: 999 },
    { id: 2, name: 'Shoes', price: 1999 },
    { id: 3, name: 'Watch', price: 2499 },
  ];
  const [filtered, setFiltered] = useState(products);

  const handleSearch = (query) => {
    setFiltered(
      products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {filtered.map(product => (
        <ProductCard key={product.id} name={product.name} price={product.price} />
      ))}
    </div>
  );
};

// Header with Theme Toggle
const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, login, logout } = useAuth();

  return (
    <header style={{ padding: '1rem', background: theme === 'dark' ? '#333' : '#eee' }}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      {user ? (
        <button onClick={logout} style={{ marginLeft: '1rem' }}>Logout</button>
      ) : (
        <button onClick={login} style={{ marginLeft: '1rem' }}>Login</button>
      )}
    </header>
  );
};

// Checkout Page (Protected)
const CheckoutPage = () => {
  return <h2>This is the Checkout Page. Only for logged-in users.</h2>;
};

// Login Page
const LoginPage = () => {
  const { login } = useAuth();
  return (
    <div>
      <h2>Please Log In</h2>
      <button onClick={login}>Login Now</button>
    </div>
  );
};

// App Component
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <Header />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
