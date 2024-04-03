<template>
    <nav class="navbar">
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/gallery">Plant Gallery</router-link></li>
            <li><router-link to="/search">Plant Search</router-link></li>
        </ul>
    </nav>
</template>


<script>
export default {
    name: 'NavBar',
};
</script>

<style scoped>
/* navbar styles */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: var(--navbar-height);
  background: #333;
  color: #fff;
  padding: 0.5em 1em;
  z-index: 10;
}

.navbar ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.navbar li {
  padding: 0.5rem 1rem;
}

.navbar a {
  color: #fff;
  text-decoration: none;
}

.navbar a:hover {
  color: #ddd;
}
</style>