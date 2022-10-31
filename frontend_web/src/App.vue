<script>
import FooterShop from '@/components/FooterShop.vue';
export default {
   components: {
      FooterShop,
   },
};
</script>
<template>
   <div>
      <div class="main">
         <router-view />
      </div>

      <div class="footer">
         <FooterShop></FooterShop>
      </div>
   </div>
</template>

<style>
.main {
   width: 100%;
   height: 100%;
}
</style>
