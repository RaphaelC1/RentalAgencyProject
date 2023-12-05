<template>
  <div>
    <nav class="menu">
            <a class="menugauche" href="/">Home</a>
            <a class="menugauche" href="/About">About</a> 
            <a class="menugauche" href="/Properties">Properties</a>
            <a class="menugauche" href="/Contact">Contact us</a>

            <a class="menudroit" href="/Login">Login</a>
            <a class="menudroit" href="/Registration">Sign in</a>
    </nav>

    <form>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>

            <label for="message">Message:</label>
            <textarea id="message" name="message" required></textarea>

            <button type="submit">Submit</button>
        </form>
  </div>
</template>

<script>
export default {

}
</script>

<style>
nav {
    background-color: coral;
    overflow: hidden;
    align-items: center;
}


nav a {
    float: left;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}

nav ul {
    list-style-type: none;
}


nav a:hover {
    background-color: #ef5d27;
    color: white;
    transition: 0.5s;
}

h1 {
    text-align: center;
    font-size: 36px;
}

/* Apply styles to the entire page */
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
}


/* Style the form container */
.container {
    max-width: 600px;
    margin: 20px auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
}

/* Style labels */
label {
    font-weight: bold;
}

/* Style text input fields and textarea */
input[type="text"],
input[type="email"],
textarea {
    width: 96%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

/* Style the textarea specifically */
textarea {
    height: 150px;
}

/* Style the search button */
button[type="submit"] {
    background-color: coral;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

/* Add some hover effect to the button */
button[type="submit"]:hover {
    background-color: #ef5d27;
}

</style>