<script>
import TourguideService from '../services/Tourguide.service';
import toastsVue from '../components/toasts.vue';
import { mapState } from 'pinia';
import { useAuthStore } from '@/stores/Auth.store';
import toast from '../assets/js/toasts';
import HeaderShop from '@/components/HeaderShop.vue';
export default {
   data() {
      return {
         orders: [],
         products: [],
         neworder: {
            title: '',
         },
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
   },
   computed: {
      ...mapState(useAuthStore, {
         currentUser: 'user',
      }),
   },
   components: {
      toastsVue,
      HeaderShop,
   },
   methods: {
      toast,

      async getall() {
         try {
            const data = await TourguideService.getAll();
            this.orders = data.Orders;
            console.log(data);
            const user = JSON.parse(localStorage.getItem('user'));
            this.tourguideId = user._id;
            console.log(this.tourguideId);
         } catch (error) {
            this.toast();
            setTimeout(() => {
               this.$router.push({ name: 'ShopMain' });
            }, 1000);
         }
      },
   },

   created() {
      this.getall();
   },
};
</script>
<template>
   <HeaderShop />
   <div class="tourguide">
      <h3>Hướng dẫn viên</h3>
   </div>

   <div class="container">
      <div class="row-cols-1">
         <h4 class="heading">Tên tour</h4>
         <div class="title" v-for="order in orders" :key="order._id">
            <router-link
               :to="{
                  name: 'tourguides',
                  params: { id: order._id, data: order.data, phone: order.phone },
               }"
            >
               <span style="color: black">{{ order._id }}</span>
            </router-link>
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
   margin-top: 5rem;
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

title span {
   color: rebeccapurple;
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