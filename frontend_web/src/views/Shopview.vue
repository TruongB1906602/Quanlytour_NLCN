<script>
import SliderShop from '@/components/SliderShop.vue';
import Ad from '@/views/Ad.vue';
import HeaderShop from '@/components/HeaderShop.vue';
import ProductService from '../services/Product.service';
import { mapState } from 'pinia';
import { useAuthStore } from '@/stores/Auth.store';
import toastsVue from '../components/toasts.vue';
import Hotel from '@/views/Hotel.vue';
import { array } from 'yup/lib/locale';
import { list } from 'postcss';
import Place from '@/views/Place.vue';

export default {
   data: () => {
      return {
         //    title: "Phú Quốc",

         Products: [],
      };
   },
   components: {
      HeaderShop,

      SliderShop,
      Ad,
      Hotel,
      toastsVue,
      // Place
   },
   computed: {
      ...mapState(useAuthStore, {
         currentUser: 'user',
      }),
   },
   methods: {
      getdata() {
         this.$router.push({ name: 'places' });
      },

      async retrieveProduct() {
         try {
            this.Products = await ProductService.getAll();
         } catch (error) {
            console.log(error);
         }
      },
   },

   mounted() {
      this.retrieveProduct();
   },
};
</script>
<template>
   <div>
      <div class="header">
         <HeaderShop></HeaderShop>
      </div>

      <toastsVue></toastsVue>
      <div class="slider">
         <SliderShop />
      </div>
      <div class="ad">
         <Ad></Ad>
      </div>

      <div>
         <div id="products" class="box">
            <div class="main-heading">
               <p class="heading">Top địa điểm HOT</p>
               <p class="heading1">Top những nơi nổi bật mới nhất nên khám phá</p>
            </div>
            <div class="product-list">
               <div
                  v-for="item in Products"
                  :key="item._id"
                  class="product-list--item1"
                  v-show="item.categories === 'hot'"
               >
                  <div class="product-items">
                     <div class="product-item">
                        <div class="wrapper-img">
                           <div class="image_slider">
                              <div class="image_item" v-for="img in item.img" :key="img.item">
                                 <img :src="img" class="card-img-top" alt="..." />
                              </div>
                           </div>
                        </div>

                        <div class="product-item-text">
                           <div class="rate-price">
                              <a class="star" id="ion">
                                 <ion-icon name="star"></ion-icon>
                                 <ion-icon name="star"></ion-icon>
                                 <ion-icon name="star"></ion-icon>
                                 <ion-icon name="star"></ion-icon>
                                 <ion-icon name="star"></ion-icon>
                              </a>
                              <span class="price">{{
                                 Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(item.price)
                              }}</span>
                           </div>
                           <div class="image">
                              <a>
                                 <h1>{{ item.title }}</h1>
                                 <span class="txt">
                                    <img src="@/assets/images/map.png" alt="" />
                                    Ngày đi: <strong> {{ item.startdate }}</strong>
                                 </span>
                                 <span class="txt"
                                    ><img src="@/assets/images/schedule.png" alt="" /> Ngày về:
                                    <strong> {{ item.enddate }}</strong>
                                 </span>
                                 <span class="txt"
                                    ><img src="@/assets/images/clock.png" alt="" /> Khởi hành:
                                    <strong> {{ item.destination }}</strong></span
                                 >
                              </a>
                           </div>
                        </div>
                     </div>

                     <div class="middle">
                        <router-link
                           :to="{
                              name: 'details',
                              params: { id: item._id },
                           }"
                        >
                           <button class="btnpay btn1" @click="nextdetailsproduct">Xem tour</button>
                        </router-link>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div id="products" class="box">
            <div class="main-heading">
               <p class="heading">Top địa điểm thu hút</p>
               <p class="heading1">Top những nơi thu hút nhất nên khám phá</p>
            </div>
            <div class="product-list">
               <div
                  v-for="item in Products"
                  :key="item._id"
                  v-show="item.categories === 'attractive'"
                  class="product-list--item1"
               >
                  <div class="product-items">
                     <div class="product-item">
                        <div class="wrapper-img">
                           <div class="image_slider">
                              <div class="image_item" v-for="img in item.img" :key="img.item">
                                 <img :src="img" class="card-img-top" alt="..." />
                              </div>
                           </div>
                        </div>

                        <div class="product-item-text">
                           <div class="rate-price">
                              <a class="star" id="ion">
                                 <ion-icon name="star"></ion-icon>
                                 <ion-icon name="star"></ion-icon>
                                 <ion-icon name="star"></ion-icon>
                                 <ion-icon name="star"></ion-icon>
                                 <ion-icon name="star"></ion-icon>
                              </a>
                              <span class="price">{{
                                 Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(item.price)
                              }}</span>
                           </div>
                           <div class="image">
                              <a>
                                 <h1>{{ item.title }}</h1>
                                 <span class="txt">
                                    <img src="@/assets/images/map.png" alt="" />
                                    Ngày đi: <strong> {{ item.startdate }}</strong>
                                 </span>
                                 <span class="txt"
                                    ><img src="@/assets/images/schedule.png" alt="" /> Ngày về:
                                    <strong> {{ item.enddate }}</strong>
                                 </span>
                                 <span class="txt"
                                    ><img src="@/assets/images/clock.png" alt="" /> Khởi hành:
                                    <strong> {{ item.destination }}</strong></span
                                 >
                              </a>
                           </div>
                        </div>
                     </div>

                     <div class="middle">
                        <router-link
                           :to="{
                              name: 'details',
                              params: { id: item._id },
                           }"
                        >
                           <button class="btnpay btn1" @click="nextdetailsproduct">Xem tour</button>
                        </router-link>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <!--             
 <div class="center">
 <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="10000">
        <div class="row">
            <div class="col-lg-4" id="name"  v-on:click="title='Phú Quốc'">
              
                    <img src="@/assets/images/phuquoc.jpg" class="d-block w-100" alt="...">
                    <h6>Phú Quốc </h6>
            </div>
             <div class="col-lg-4">
                    <img src="http://zoomtravel.vn/upload/product/tour-tay-ninh--sunworld-ba-den-vuon-nho32232.png" class="d-block w-100" alt="...">
                    <h6>Tây Ninh</h6>
            </div>
            <div class="col-lg-4" v-on:click="title='Đà Nẵng'">
                    <img src="@/assets/images/banahills.jpg" class="d-block w-100" alt="...">
                    <h6 >Đà Nẵng</h6>
            </div>
       
            <div class="col-lg-4" v-on:click="title='Đà Nẵng'">
                   
                <img src="@/assets/images/diengio.jpg" class="d-block w-100" alt="...">
                <h6 >Bạc Liêu</h6>

            </div>
            <div class="col-lg-4">
                    <img src="@/assets/images/sapa.jpg" class="d-block w-100" alt="...">
                    <h6>SaPa</h6>
            </div>
             
        </div>
      
    
    </div>
    <div class="carousel-item" data-bs-interval="20000">
      <div class="row">
            <div class="col-lg-4" >
                    <img src="@/assets/images/culaocham.jpg" class="d-block w-100" alt="...">
                    <h6>Cù lao</h6>
            </div>
             <div class="col-lg-4">
                    <img src="https://mytourcdn.com/upload_images/Image/Location/20_2_2015/du-lich-ha-tien-2-ngay-1-dem-1.jpg" class="d-block w-100" alt="...">
                    <h6>Hà Tiên</h6>
            </div>
           <div class="col-lg-4">
                    <img src="@/assets/images/hoian.jpg" class="d-block w-100" alt="...">
                    <h6>Hội An</h6>
            </div>
        
            <div class="col-lg-4">
                    <img src="@/assets/images/phan_thiet.jpg" class="d-block w-100" alt="...">
                    <h6>Phan Thiết</h6>
            </div>
        
         
            <div class="col-lg-4">
                    <img src="@/assets/images/hanoi.jpg" class="d-block w-100" alt="...">
                    <h6>Hội An</h6>
            </div>
           
        </div>
      
      
    </div>
    <div class="carousel-item">
      <div class="row">
            <div class="col-lg-4">
                    <img src="@/assets/images/hue.jpg" class="d-block w-100" alt="...">
                    <h6>Huế</h6>
            </div>
             <div class="col-lg-4">
                    <img src="@/assets/images/hue.jpg" class="d-block w-100" alt="...">
                    <h6>Huế</h6>
            </div>
        
         
            <div class="col-lg-4">
                    <img src="@/assets/images/cantho.jpg" class="d-block w-100" alt="...">
                    <h6>Cần Thơ</h6>
            </div>
            <div class="col-lg-4">
                    <img src="@/assets/images/landmark.jpg" class="d-block w-100" alt="...">
                    <h6>TP. Hồ Chí Minh</h6>
            </div>
        
         
            <div class="col-lg-4">
                    <img src="@/assets/images/halong.jpg" class="d-block w-100" alt="...">
                    <h6>Hạ Long</h6>
            </div>
            
      </div>
      
      
    </div>
  </div>
  <div class="navi-left">
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <img src="@/assets/images/left-arrow.png" alt="">
  </button>
   </div>
   <div class="navi-right">
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <img src="@/assets/images/right-arrow.png" alt="">
  </button>
 </div>
</div>
</div> -->
      </div>
      <div class="place">
         <Place v-bind:title="title"></Place>
      </div>
   </div>
</template>
<style scoped>
.slider {
   margin-top: 30px;
}
.main-heading {
   width: 300px;
   margin-left: 12.5%;
}
.heading {
   color: #1a202c;
   font-family: Mt;
   font-size: 20px;
   font-weight: 600;
   line-height: 29px;
}
.heading1 {
   font-weight: 400;
   font-family: Mt;
   color: #4a5568;
   margin: 8px 0;
   font-size: 16px;
   line-height: 17px;
}
.carousel-item .col-lg-4[data-v-ae3a9346] {
   width: 580px !important;
   height: 250px;
   border-radius: 10%;
}
.carousel-item .col-lg-4 img {
   width: 100% !important;
   height: 250px;
   border-radius: 10%;
}
.product-list {
   padding: 15px;
   display: flex;
   justify-content: center;
   align-content: center;
   flex-wrap: wrap;
   width: 95%;
   margin-left: 50px;
}

#ion {
   font-size: 20px;
   margin-right: 35px;
   color: yellow;
}
.product-list--item1 {
   padding: 10px 0px;
   width: 275px;
   margin: 0 3px;
}

.product {
   margin-top: 20px;
}
.btn-ouline-dark {
   margin-top: 15px;
}
.product-item-text h1 {
   font-size: 13px;
   color: #1ecbe1;
}
.product-item-text h2 {
   font-family: Arial, Helvetica, sans-serif;
   color: red;
   font-size: 13px;
   font-family: sans-serif;
   margin-bottom: 18px;
   border: 1px solid white;
}
.container {
   max-width: 900px;
   margin: auto;
   position: relative;
   height: 250px;
}
.product-items {
   display: inline-block;
   width: 265px;
   box-sizing: border-box;
   box-shadow: 1px 3px 3px 0px #0000001a;
   border-radius: 5px;
   height: 370px;
}

.product-item {
   display: inline-block;
   background: #fff;
   text-align: center;
   transition: transform linear 0.1s;
   will-change: transform;
   height: 315px;
}
#picture {
   width: 100%;
   margin-bottom: 10px;
   height: 180px;
}
.product-item-text {
   font-size: 13px;
   display: block;
}

.middle {
   margin-top: 20px;
   margin-left: 20%;
   transform: translate(-50%, -50%);
   text-align: center;
   border-radius: 2%;
}
.btnpay {
   background: none;
   color: #000000cf;
   border: 2px solid rgba(0, 0, 0, 0.199);
   font-weight: 600;
   font-family: 'montserrat', sans-serif;
   border-radius: 2%;
   padding: 6px 10px;
   min-width: 15rem;
   margin: 0px 65px;
   cursor: pointer;
   transition: color 0.4s linear;
   transition: transform 0.7s;
   position: relative;
}
.btnpay:hover {
   color: #fff;
}
.btnpay::before {
   content: '';
   position: absolute;
   left: 0;
   top: 0;
   width: 100%;
   height: 100%;
   background: rgb(0 0 0 / 21%);
   z-index: -1;
   transition: transform 1.2s;
   transform-origin: 0 0;
   transition-timing-function: cubic-bezier(0.5, 1.6, 0.4, 0.7);
}
.btn1::before {
   transform: scaleX(0);
}
.btn1:hover::before {
   transform: scaleX(1);
}
.product-item-text .rate-price img {
   height: 50px;
   width: 69px;
   float: left;
}
.product-item:hover > .cartadd {
   bottom: 50px;
   background-color: #ed1c24;
   right: 0;
   left: 0;
}
.rate-price {
   height: 30px;
}
.txt {
   display: flex;
   font-size: 13px;
   font-family: sans-serif;
   margin-left: 10px;
   padding: 2px;
}
.product-item-text .image img {
   display: inline-block;
   width: 15px;
   height: 15px;
   background-position: -78px -28px;
   vertical-align: middle;
   margin-top: 10x;
   margin-right: 7px;

   color: #1081e0;
}
.icon1 {
   display: inline-block;
}

.search-box {
   position: absolute;
   top: 20px;
   transform: translateX(-100%);
   background: whitesmoke;
   border-radius: 40px;
   padding: 2px;
   height: 5 0px;
   border: 1px solid gray;
}
.search-btn {
   color: #e84118;
   float: right;
   width: 40px;
   height: 40px;
   display: flex;
   justify-content: center;
   align-items: center;
}
.search-txt {
   border: none;
   background: none;
   outline: none;
   float: left;
   padding: 0;
   color: white;
   font-size: 16px;
   transition: 0.4s;
   line-height: 40px;
   width: 0px;
}
.header-left {
   width: 100%;
   height: 50px;
   background-color: #001c40;
}
.header {
   display: inline-block;
   z-index: 2;
   width: 100%;
   height: 20px;
}
.header-right {
   width: 100%;
   height: 350px;
   display: flex;
   border: 3px solid gold;
}
.header-right ul {
   display: flex;
   margin: 0 0;
   padding: 0 0;
}
.header-right ul li {
   list-style: none;
   text-decoration: none;
   font-family: sans-serif;
}
a.logo {
   width: 20%;
   height: 90px;
}
.logo img {
   width: 90%;
   height: 90%;
   margin-left: 15px;
}

.header .header-left ul li img {
   height: 20px;
   width: 20px;
   margin-left: 30px;
   margin-top: 12px;
   margin-right: 10px;
   color: aqua;
}

.header .header-left ul li a {
   text-decoration: none;
   position: relative;
   bottom: 5px;
   color: white;
}
.header .header-left ul {
   margin-left: 20px;
}
.header .header-left ul li {
   display: inline-block;
   margin: 0px 20px 0px 10px;
   color: white;
}
.right-nav {
   width: 700px;
   display: flex;
   justify-content: center;
   align-items: center;
}
ul.left {
   margin-top: 8px;
   margin-bottom: 0px;
   width: 50%;
   display: inline-block;
}
ul.right {
   float: right;
}
.header .header-left ul li a {
   text-decoration: none;
   bottom: 5px;
   color: white;
}
ul.right a.right-1 {
   font-size: 16px;
   position: absolute;
   border: 1px solid gray;
}
ul.right i {
   margin-right: 10px;
   margin: 17px 5px;
}
.header .header-left ul {
   margin-left: 20px;
}
.header .header-left ul li {
   display: inline-block;
   margin: 0px 20px 0px 10px;
   color: white;
}
.price {
   font-size: 18px;
   color: red;
   float: right;
}
.nav-right {
   height: 90px;
   background: white;
   box-shadow: 0 3px 15px rgb(0 0 0 / 40%);
   display: flex;
   z-index: 3;
   width: 100%;
   position: fixed;
   top: 40px;
}
.right-nav ul {
   width: 750px;
}
.right-nav li {
   margin: 25px 25px;
   padding-top: 20px;
}
.header-right ul li a {
   text-decoration: none;
   font-size: 16px;
   font-family: 'Josefin Sans' sans-serif;
   color: #111;
}

.wrapper-img {
   width: 100%;
   height: 50%;
   overflow: hidden;
}
.image_slider {
   display: flex;
   transition: all 0.8s ease;
}
.image_slider:hover {
   transform: translateX(-100%);
}
.image_item {
   flex: 1 0 100%;
}
.carousel-item {
   height: 350px;
}
h6 {
   font-size: 16px;
   margin-top: 20px;
   margin-left: 55px;
}

.navi-left[data-v-ae3a9346] {
   background: white;
   height: 45px;
   width: 45px;
   display: flex;
   align-items: center;
   justify-content: center;
   z-index: 2;
   border-radius: 100px;
   box-shadow: rgb(0 0 0 / 10%) 0px 8px 12px;
   cursor: pointer;
   position: absolute;
   top: 26%;
   transform: translate(-50%, -50%);
   left: 14%;
}

.navi-right {
   background: white;
   height: 45px;
   width: 45px;
   display: flex;
   align-items: center;
   justify-content: center;
   z-index: 2;
   border-radius: 100px;
   box-shadow: rgb(0 0 0 / 10%) 0px 8px 12px;
   cursor: pointer;
   position: absolute;
   top: 28%;
   transform: translate(-50%, -50%);
   right: 10%;
}
.navi-left img {
   margin-left: 45px;
   width: 15px;
}

.navi-right img {
   margin-right: 35px;
   width: 15px;
}
.carousel-item .col-lg-4 {
   width: 200px;
   height: 250px;

   border-radius: 50%;
   -moz-border-radius: 50%;
   -webkit-border-radius: 50%;
}
.carousel-item .col-lg-4 img {
   height: 150px;

   background: #999;
   border-radius: 50%;
   -moz-border-radius: 50%;
   -webkit-border-radius: 50%;
}

.w-100 {
   width: 85% !important;
}

.row {
   display: flex;
   justify-content: center;
   align-content: center;
}
</style>
