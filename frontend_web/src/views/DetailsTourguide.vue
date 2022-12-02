<script>
import HeaderShop from '@/components/HeaderShop.vue';
import OrderService from '../services/Order.service';
import TourguideService from '../services/Tourguide.service';
import toastsVue from '../components/toasts.vue';
import toastsjs from '../assets/js/toasts.js';
import { mapState } from 'pinia';
import { useAuthStore } from '@/stores/Auth.store';
import { string } from 'yup/lib/locale';

export default {
   data() {
      return {
         detailorders: [],
         detailorders1: [],

         toasts: {
            title: 'Success',
            msg: 'Thêm vào giỏ hàng thành công!',
            type: 'success',
            duration: 2000,
         },

         sub_quantity: 1,
      };
   },
   computed: {
      ...mapState(useAuthStore, {
         currentUser: 'user',
      }),
   },
   components: {
      HeaderShop,
      toastsVue,
   },
   methods: {
      toastsjs,

      async getorder() {
         try {
            this.detailorders = await TourguideService.get(this.$route.params.data.id);
         } catch (error) {
            console.log(error);
         }
      },

      async getorder1() {
         try {
            this.detailorders1 = await OrderService.getAll();
            const user = JSON.parse(localStorage.getItem('user'));
            console.log(this.$route.params);

            this.tourguideId = user._id;
            console.log(this.detailorders1._id);
         } catch (error) {
            console.log(error);
         }
      },
   },

   created() {
      this.getorder();
      this.getorder1();
   },
};
</script>
<template>
   <div>
      <HeaderShop></HeaderShop>
      <toastsVue></toastsVue>

      <div class="tourguide">
         <h3>Giao diện quản lý khách hàng của hướng dẫn viên</h3>
         <a href=""> <input type="text" placeholder="Tìm kiếm khách hàng" /></a>
      </div>

      <div class="container">
         <div class="row-cols-1">
            <h4 class="heading">Tên khách hàng</h4>

            <div class="title" v-for="fullName in this.$route.params.data" :key="order">
               <span>{{ fullName }}</span>
            </div>
         </div>

         <div class="row-cols-1">
            <h4 class="heading">Địa chỉ</h4>
            <div class="startdate" v-for="phone in this.$route.params.phone" :key="phone">
               <span>{{ phone }}</span>
            </div>
         </div>
      </div>
   </div>
</template>
<style scoped>
.tourguide {
   display: flex;
   justify-content: center;
   align-items: center;
   margin-bottom: 5rem;
}
.title:hover {
   background-color: #0d6efd;
   color: azure;
}
.col {
   border: 1px solid #dee2e6;
   font-size: 14px;
}
.btn button {
   font-size: 18px;

   border: 1px solid #dee2e6;
   background: #fbe2c5;
   margin: 0 5px;
}
.btn {
   font-weight: 500;
   font-size: 12px;
   padding: 20px;
   border: 1px solid #dee2e6;
   background: white;
}
.startdate {
   border: 1px solid #dee2e6;
   height: 50px;
   font-size: 14px;
   width: 250px;
   font-weight: 500;
   width: 200px;
   padding: 10px;
   background: white;
}
.heading {
   cursor: pointer;
   position: relative;

   font-size: 16px;
   display: flex;
   justify-content: center;
   align-items: center;
   height: 35px;
   color: #dee2e6;
   background-color: #0d6efd;
}

.title {
   border: 1px solid #dee2e6;
   height: 50px;
   font-size: 14px;
   font-weight: 500;
   padding: 10px;
   overflow: hidden;
   background: white;
   width: 450px;
}

.row-cols-1 {
   /* width: 10%; */
   height: 20%;
}
.container {
   display: flex;
   justify-content: center;
   max-width: 100%;
   margin-bottom: 5rem;
}
</style>