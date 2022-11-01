<script>
import TourguideService from '../services/Tourguide.service';
import toastsVue from '../components/toasts.vue';
import { mapState } from 'pinia';
import { useAuthStore } from '@/stores/Auth.store';

import toast from '../assets/js/toasts';


export default {
   data() {
      return {
         users: [],
         orders: [],
         activeUser: -1,
         activeIndexOrder: -1,
         toasts: {
            title: 'Warning',
            msg: 'Bạn không phải ADMIN',
            type: 'warn',
            duration: 2000,
         },
         tourguideId: '',
      };
   },
   computed: {
      getindexorder() {
         if (this.activeIndexOrder != -1) {
            const list = document.querySelectorAll('.order-item');
            list.forEach((element) => {
               element.classList.remove('active');
            });
            list[this.activeIndexOrder].classList.add('active');
            return this.orders[this.activeIndexOrder];
         }
      },
      getindexuser() {
         if (this.activeUser != -1) {
            const list = document.querySelectorAll('.user-item');
            list.forEach((element) => {
               element.classList.remove('active');
            });
            list[this.activeUser].classList.add('active');
            return this.users[this.activeUser];
         }
      },
   },
   computed: {
      ...mapState(useAuthStore, {
         currentUser: 'user',
      }),
   },
   components: {
      toastsVue,
   },
   methods: {
      toast,
      
      async getall() {
         try {
            const data = await TourguideService.getAll();
            this.orders = data.Orders;
            const user = JSON.parse(localStorage.getItem('user'));
            this.tourguideId = user._id;
            console.log(this.tourguideId);
            console.log(this.orders);
         } catch (error) {
            this.toast();
            setTimeout(() => {
               this.$router.push({ name: 'ShopMain' });
            }, 1000);
         }
      }
   }
}
</script>

<template>
   <div class="tourguide">
      <h3>Giao diện quản lý khách hàng của hướng dẫn viên</h3>

   

   <a>  
        <input type="text" placeholder="Tìm kiếm tên khách hàng" v-model="search" />
      </a>

   </div>

   <div class="container">

    <div class="row-cols-1">
         <h4 class="heading">STT</h4>
         <div class="title" v-for="(order, index) in orders"  :key="order._id"  v-show="order.tourguideId == tourguideId">
            <span>{{  index }}</span>
         </div>
      </div>

      <a href=""> <input type="text" placeholder="Tìm kiếm khách hàng" /></a>
   </div>

   <div class="container">

      <div class="row-cols-1">
         <h4 class="heading">Tên tour</h4>
         <div class="title" v-for="order in orders" :key="order._id" v-show="order.tourguideId == tourguideId">
            <span>{{ order.title }}</span>
         </div>
      </div>
      <div class="row-cols-1">
         <h4 class="heading">Tên khách</h4>

         <div class="name" v-for="order in  orders"
         :key="order._id" 
         v-show="order.tourguideId == tourguideId">

         <div class="name" v-for="order in orders" :key="order._id" v-show="order.tourguideId == tourguideId">

            <span>{{ order.name }}</span>
         </div>
      </div>
      <div class="row-cols-1">
         <h4 class="heading">Địa chỉ</h4>
         <div class="address" v-for="order in orders" :key="order._id" v-show="order.tourguideId == tourguideId">
            <span>{{ order.address }}</span>
         </div>
      </div>

      <div class="row-cols-1">
         <h4 class="heading">Số điện thoại</h4>
         <div class="phone" v-for="order in orders" :key="order._id" v-show="order.tourguideId == tourguideId">
            <span>{{ order.phone }}</span>
         </div>
      </div>
   </div>
   </div>
</template>
<style scoped>
.tourguide {

    text-align:center;
    margin-bottom: 1rem;
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
.phone {
   height: 40px;
   font-weight: 500;
   font-size: 14px;
   padding: 10px;

   text-align: center;
   width: 150px;
}
.address {
    text-align: center;

   border: 1px solid #dee2e6;
   background: white;
   width: 150px;
}
.address {
   border: 1px solid #dee2e6;

   height: 40px;
   font-size: 14px;
   width: 200px;
   font-weight: 500;
   padding: 10px;
   background: white;
}
.heading {
   cursor: pointer;
   position: relative;

   text-align: center;

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
   height: 40px;
   font-size: 14px;
   font-weight: 500;
   padding: 10px;
   overflow: hidden;
   background: white;
   text-align: center;
}


.name {
   border: 1px solid #dee2e6;

   height: 40px;
   font-size: 14px;
   width: 160px;
   font-weight: 500;
   padding: 10px;
   overflow: hidden;
   text-align: center;
   background: white;
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

.tourguide a input{
    width: 53rem;
    margin-top: 3rem;
    height: 40px;
  
}
</style>


