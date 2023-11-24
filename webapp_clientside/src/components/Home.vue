
<template>
  <div>
    <!-- Navigation bar -->
    <nav class="navbar">
      <!-- Navbar brand/logo -->
      <div class="navbar-brand">
        <img src='../assets/logo.png' alt='logo' />
         <!-- Your website name or logo -->
    
        <!-- Navbar button icon for mobile -->
        <button
          class="navbar-burger burger"
          :class="{ 'is-active': isActive }"
          @click="toggleNavbar"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarMenu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>
      <!-- Navbar menu items -->
      <div :class="{ 'navbar-menu': true, 'is-active': isActive }" id="navbarMenu">
        <div class="navbar-end">
          <!-- Navbar links -->
          <a class="navbar-item" href="/Home">Home</a>
          <a class="navbar-item" href="/About">About</a>
          <a class="navbar-item" href="/Properties">Properties</a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false, // State for toggling the mobile menu
    };
  },
  methods: {
    toggleNavbar() {
      this.isActive = !this.isActive; // Toggle mobile menu on button click
    },
  },
};


</script>

<style>
/* CSS styles for aligning navbar items to the right */
.navbar-brand {
  justify-content: space-between; /* Aligns items to both ends */
  align-items: center; /* Align items vertically */
}

.navbar-end {
  justify-content: flex-end; /* Aligns items to the right */
}
</style>

</template>
