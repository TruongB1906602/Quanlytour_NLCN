<template>
   <div>
      <toastsVue></toastsVue>

      <div v-if="user" class="userform">
         <Userform :user="user" @submit:user="updateuserindex" />
      </div>
   </div>
</template>

<script>
import toastjs from '../assets/js/toasts';
import toastsVue from '../components/toasts.vue';
import UserService from '../services/User.service';
import OrderService from '../services/Order.service';
import { ref } from 'vue';
import Userform from '../components/Userform.vue';
export default {
   data() {
      return {
         toasts: {
            title: 'Success',
            msg: 'Sửa sản phẩm thành công',
            type: 'success',
            duration: 2000,
         },
         user: null,
         orders: [],
      };
   },
   components: {
      Userform,
      toastsVue,
   },
   methods: {
      toastjs,
      async getuser(id) {
         try {
            this.user = await UserService.get(id);
         } catch (error) {
            console.log(error);
            this.$router.push({
               name: 'notfound',
               params: { pathMatch: this.$route.path.split('/').slice(1) },
               query: this.$route.query,
               hash: this.$route.hash,
            });
         }
      },
      async getorder() {
         try {
            this.orders = await OrderService.getAll();
         } catch (error) {
            console.log(error);
            this.$router.push({
               name: 'notfound',
               params: { pathMatch: this.$route.path.split('/').slice(1) },
               query: this.$route.query,
               hash: this.$route.hash,
            });
         }
      },
      async updateuserindex(data) {
         try {
            console.log(this.user.username);
            await UserService.update(this.user._id, data);
            this.toastjs();
         } catch (error) {
            console.log(error);
            (this.toasts.title = 'Warning'),
               (this.toasts.msg = 'Tài khoản không phải ADMIN'),
               (this.toasts.type = 'warn'),
               (this.toasts.duration = 2000);
            this.toastjs();
         }
      },
   },

   created() {
      this.getorder();
   },
   mounted() {
      this.getuser(this.$route.params.id);
   },
};
</script>
<style lang="scss" scoped>
.userform {
   height: 25rem;
}
.home {
   background-color: rgba(0, 176, 234, 0.5);
   height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;
   .modal-content {
      height: 28rem;
      // border: 1px solid red;
      flex-direction: column;
      h1,
      p {
         margin-bottom: 16px;
      }
      h1 {
         font-size: 32px;
      }
      p {
         font-size: 18px;
      }
   }
}
</style>
