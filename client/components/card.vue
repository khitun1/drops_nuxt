<template>
  <button @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "card",

}
</script>

<style scoped>
button {
  width: 20%;
  height: 100px;
  background: #d299ff;
  margin-left: 2%;
  border-radius: 5px;
  border-color: #ffff01;
  color: #ffff4e;
  font-size: 25px;
}

@media screen and (max-width: 500px) {
  button {
    margin-bottom: 50px;
    font-size: 0.9em;
    width: 40%;
  }

  @media screen and (max-width: 250px) {
    button {
      width: 60%;
    }
  }

}
</style>
