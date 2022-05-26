<template>
    <nav class="navbar navbar-default navbar-static-top">
        <div class="container">
            <ol class="breadcrumb">
            <li><router-link to="/top">Top</router-link></li>
            <li><router-link to="/bottom">Bottom</router-link></li>
            <li class="active">Clear</li>
            </ol>
  </div>
</nav>
</template>

<script>
export default {
    data() {
        return{
            name: 'Category'
        }
    }
}
</script>


<style scoped>

</style>