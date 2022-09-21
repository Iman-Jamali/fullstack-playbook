const config = {
  apiBaseURL:
    process.env.NODE_ENV === "production"
      ? "http://todo-app-load-balancer-658959564.us-west-2.elb.amazonaws.com" + "/api/v1"
      : process.env.REACT_APP_TODO_API_BASE_URL,
};

export default config;
