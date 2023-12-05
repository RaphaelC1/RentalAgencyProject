
<template>

  <div class="navbar">
    <form class="appartmentForm" action="home/index" method="GET">
            <label for="city">City:</label>
            <select>
                <option value="city">Paris</option>
                <option value="city">Grigny</option>
            </select>

            <label for="start-date">Start Date:</label>
            <input type="date" id="start-date" name="start-date" required>

            <label for="end-date">End Date:</label>
            <input type="date" id="end-date" name="end-date" required>

            <label for="rent">Rent:</label>
            <input type="number" id="rent" name="rent" required>

            <button type="submit">Search</button>

    </form>
  </div>
  
  
</template>

<script>

</script>

<style>
#logo{
   width:100px;
   float:center;
   position:absolute;
}

nav {
    background-color: coral;
    overflow: hidden;
    align-items: center;
}


nav a {
    
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}

nav .menudroit{
  float: right;

}
nav .menugauche{
  float: left;
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


/* Apply styles to the form container */
.appartmentForm {
    text-align: center;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    max-width: 400px;
    margin-top: 100px;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 0;
}

/* Style the labels */
label {
    display: block;
    margin: 10px 0;
    font-weight: bold;
}

/* Style the select element */
select {
    width: 100%;
    padding: 8px;
    margin: 4px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
}

/* Style the input fields */
input[type="date"],
input[type="number"] {
    width: 95%;
    padding: 8px;
    margin: 4px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
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

</template>
