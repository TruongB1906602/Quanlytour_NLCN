<script>

import TourguideService from '../services/Tourguide.service';
import toastsVue from '../components/toasts.vue';
import { mapState } from 'pinia';
import { useAuthStore } from '@/stores/Auth.store';
import HeaderShop from '@/components/HeaderShop.vue';
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
         search:'',
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
      HeaderShop,
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
      },
     filteredList() {
      return this.orders.filter(order => {
        return order.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
   },
   created(){
      this.getall();
   }
}
</script>

<template>
   <HeaderShop/>
   <div class="tourguide">
      <h3>Giao diện quản lý khách hàng của hướng dẫn viên</h3>
     
   </div>
   <div class="search-wrapper">
             <input type="text" v-model="search" placeholder="Tìm kiếm theo tên khách hàng..."/>    
   </div>

   <div class="container">

      <div class="row-cols-1">
         <h4 class="heading">STT</h4>
         <div class="title" v-for="(order, index) in   filteredList()"  :key="order._id">
            <span>{{  index+1 }}</span>
         </div>
      </div>


      <div class="row-cols-1">
         <h4 class="heading">Tên khách hàng</h4>
         <div class="name" v-for="order in  filteredList() " :key="order._id" v-show="order.tourguideId == tourguideId">
            <span>{{ order.name }}</span>
         </div>
      </div>
      <div class="row-cols-1">
         <h4 class="heading">Địa chỉ</h4>
         <div class="address" v-for="order in  filteredList() " :key="order._id" v-show="order.tourguideId == tourguideId">
            <span>{{ order.address }}</span>
         </div>
      </div>
      
   <div class="row-cols-1">
         <h4 class="heading">Số điện thoại</h4>
         <div class="phone" v-for="order in   filteredList()" :key="order._id" v-show="order.tourguideId == tourguideId">
            <span>{{ order.phone }}</span>
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
   margin-top: 5rem;
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
   text-align: center;
   height: 40px;

   font-weight: 500;
   font-size: 14px;
   padding: 10px;

   text-align: center;
   width: 250px;
}
.address {
  text-align: center;
   height: 40px;
   font-size: 14px;
   width: 250px;
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

  width: 200px;
  text-align: center;
   height: 40px;
   font-size: 14px;
   font-weight: 500;
   padding: 10px;
   overflow: hidden;
   background: white;
   text-align: center;
}


.name {
   text-align: center;
   height: 40px;
   font-size: 14px;
   width: 300px;
   font-weight: 500;
   padding: 10px;
   background: white;
}

.row-cols-1 {
   /* width: 10%; */
   height: 20%;
}
.container {
   display: flex;
   justify-content: center;
   margin-bottom: 5rem;
}
.search-wrapper{
   display: flex;
   justify-content: center;
   align-items: center;
   margin: 30px auto;
}
.search-wrapper input{
   width: 63rem;
   height: 40px;
   padding: 10px;

}
</style>


