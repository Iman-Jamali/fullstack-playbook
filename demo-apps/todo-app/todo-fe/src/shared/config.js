const config = {
  TODO_API_BASE_URL:
    (window._env_ && window._env_.REACT_APP_TODO_API_BASE_URL) ||
    process.env.REACT_APP_TODO_API_BASE_URL,
};

export default config;