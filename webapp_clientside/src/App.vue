<template>
  <div id="app">
    <nav class="menu">
            <a class="menugauche" href="/">Home</a>
            <a class="menugauche" href="/About">About</a> 
            <a class="menugauche" href="/Properties">Properties</a>
            <a class="menugauche" href="/Contact">Contact us</a>

            <a class="menudroit" href="/Login">Login</a>
            <a class="menudroit" href="/Registration">Sign in</a>
    </nav>
    <router-view/>
  </div>

</template>
 
<script>
export default {
  name: 'App'
}
</script>


