<template>
  <div class="hello">

    <draw-signature ></draw-signature>
  </div>
</template>

<script>
  import drawSignature from '@/components/DrawSignature'
  export default {
    name: 'HelloWorld',
    components: {
		drawSignature
    },
    data() {
      return {

      }
    },
    computed: {},
    mounted() {

    },
    methods: {

    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .hello {
        width: 100%;
        display: flex;
        justify-content: center;
    }

</style>
