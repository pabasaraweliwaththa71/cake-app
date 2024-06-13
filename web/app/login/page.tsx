// Enable client-side rendering
"use client";

// Exporting the default Page component
export default function Page() {
  // Function to handle form submission
  function handleSubmit(event: any) {

    // Prevent default form submission
    event.preventDefault();
    // Collect form data
    const data = new FormData(event.target);
// Convert form data to object
    const value = Object.fromEntries(data.entries());

   // Send form data to server for login 
    fetch("http://localhost:5000/v1/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);

          if (data.message === "successful") {
            
             // Save user token to local storage
            localStorage.setItem("token", data.token);
           // Redirect to homepage on successful login
            window.location.href = "/";
          } else {
            // Show error message on failure
            alert(data.error);
          }
        })
        .catch((error) => {
            // Log errors to console
          console.error("Error:", error);
        });
    }

    // Render the login form
    return (
        <div className=" flex items-center justify-center">
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-gray-800">Login</h1>
            <form className="mt-4 space-y-4 w-96" onSubmit={handleSubmit}>
              
              {/* Email input field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                   Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
              placeholder="
                Email address"
            />
          </div>  
          
           {/* Password input field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
              placeholder="Password"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
          >
            Sign in
          </button>