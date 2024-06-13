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