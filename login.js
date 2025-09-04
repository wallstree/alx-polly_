async function login(email, password) {
  // Validate inputs
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email format.");
  }

  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    // Provide a more descriptive error message for debugging
    const errorData = await res.json();
    throw new Error(errorData.message || "Login failed. Please try again.");
  }

  const data = await res.json();

  // Ensure secure token handling (e.g., server sets HTTP-only cookies)
  // Avoid storing sensitive data like tokens in localStorage or sessionStorage
  return data.user; // Return user data without storing it insecurely
}
