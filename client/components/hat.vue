<template>
    <div class="container">
      <h1 class="title">Drops</h1>
      <a class="" aria-current="page" href="/">Home</a>
    </div>
</template>

<script>
export default {
  name: "navbar"
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}

h1 {
  color: #ffff4e;
  cursor: default;
}

a {
  text-decoration: none;
  font-size: 22px;
  color: #ffff4e;
  margin-left: 50px;
}

@media screen and (max-width: 210px) {
  .container {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
