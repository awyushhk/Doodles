import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JoinPage from "./pages/JoinPage";
import GamePage from "./pages/GamePage";

import { GameProvider } from "./context/GameContext";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, color: 'red' }}>
          <h2>Something went wrong.</h2>
          <pre>{this.state.error.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<JoinPage />} />
          <Route path="/game" element={
            <GameProvider>
              <GamePage />
            </GameProvider>
          } />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;