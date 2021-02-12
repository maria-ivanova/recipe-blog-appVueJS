<template>
  <section class="sec content_sec">
    <div class="container tcenter">
      <h2 class="page_title">
        <span>
          {{ title }}
        </span>
      </h2>

      <h3>
        {{ innerText }}
      </h3>
    </div>
  </section>
</template>

<script>
export default {
name: 'NotFound',
    data() {
        return {
            title: 'Страницата не е намерена',
            innerText: 'Съжаляваме, но страницата, която търсите не съществува.'
        }
    }
}
</script>

<style scoped>
</style>