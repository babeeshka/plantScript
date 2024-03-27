<template>
    <nav class="navbar">
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/gallery">Plant Gallery</router-link></li>
            <li><router-link to="/plant-search">Plant Search</router-link></li>
        </ul>
    </nav>
</template>


<script>
export default {
    name: 'NavBar',
};
</script>

<style></style>