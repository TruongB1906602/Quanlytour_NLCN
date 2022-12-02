<script>
import CartService from '../services/Cart.service';
import OrderService from '../services/Order.service';
import { mapState, mapActions } from 'pinia';
import { useAuthStore } from '@/stores/Auth.store';
import toast from '../assets/js/toasts';
import router from '../router';
export default {
   props: {
      order: { type: Object, required: true },
      resetAfterSubmit: { type: Boolean, default: false },
   },

   data() {
      return {
         order: [],
         carts: [],
         toasts: {
            title: 'Warning',

            msg: 'Bạn chưa đăng nhập',
            type: 'warn',
            duration: 3000,
         },
      };
   },
   computed: {
      ...mapState(useAuthStore, {
         currentUser: 'user',
      }),
      getlengthcarts() {
         return this.carts.length;
      },
   },
   methods: {
      toast,
      ...mapActions(useAuthStore, ['logout', 'loadAuthState']),
      slideSearch: function () {
         this.$el.querySelector('#input_search').classList.toggle('input_search');
         this.$el.querySelector('#input_search').focus();
      },
      async showcarts() {
         try {
            this.showuser();
            if (this.currentUser != null) {
               this.carts = await CartService.get(this.currentUser._id);
            }
         } catch (error) {
            console.log(error);
         }
      },
      showuser() {
         if (this.currentUser == null) {
            document.querySelector('.login').style.display = 'none';
            document.querySelector('.not-login').style.display = 'block';
         } else {
            document.querySelector('.login').style.display = 'block';
            document.querySelector('.not-login').style.display = 'none';
            document.querySelector('.data_user').innerHTML = this.currentUser.username;
         }
      },
      handlelogout() {
         this.logout();
         this.$router.push({ name: 'login' });
      },
      async getcarts() {
         try {
            this.order = await OrderService.getAll();
         } catch (error) {
            console.log(error);
         }
      },
      gotocart() {
         if (!this.currentUser) {
            this.toast();
         } else if (this.getlengthcarts == 0) {
            this.$router.push('/Cart');
         } else {
            for (var i in this.order) {
               console.log(this.order[i].userId);
               if (this.order[i].userId == this.currentUser._id) {
                  this.$router.push('/Success');
               } else {
                  this.$router.push('/Cart');
               }
            }
         }
      },
   },
   created() {
      this.getcarts();
      this.loadAuthState();
   },
   mounted() {
      // this.getcarts();
      this.showcarts();
   },
};
</script>
<template>
   <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container-fluid">
         <a class="navbar-brand" href="#">
            <img src="@/assets/images/travelviet.png" alt="" />
         </a>
         <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
         >
            <span class="navbar-toggler-icon"></span>
         </button>
         <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
               <li class="nav-item">
                  <router-link to="/" class="nav-link" aria-current="page"> Trang Chủ </router-link>
               </li>

               <li class="nav-item dropdown">
                  <router-link to="/hotel" class="nav-link" aria-current="page"> Đặt tour đi chơi </router-link>
               </li>
               <li class="nav-item dropdown">
                  <router-link to="/newsview" class="nav-link" aria-current="page">
                     <a class="nav-link" href="#" id="navbarDropdown" role="button" aria-expanded="false"> Tin Tức </a>
                  </router-link>
               </li>
               <li class="nav-item dropdown">
                  <a class="nav-link" href="#" id="navbarDropdown" role="button" aria-expanded="false"> Blog </a>
               </li>
            </ul>
            <div class="main">
               <div class="Cart">
                  <div class="wrapper_cart">
                     <div class="cart_link" id="cart_link">
                        <div class="card card-body cart-info">
                           <div class="cart-list">
                              <h4 class="text-light1">Giỏ hàng</h4>

                              <div class="item_cart" v-for="item in carts" :key="item._id">
                                 <div class="item-img">
                                    <img :src="item.img" class="img-product" alt="" />
                                 </div>
                                 <div class="right">
                                    <div class="item-name">
                                       <span class="text-light name-product">{{ item.title }}</span>
                                    </div>
                                    <div class="item-price">
                                       <span class="text-light price-product"
                                          ><span style="font-size: 14px">Giá: </span
                                          >{{
                                             Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(
                                                item.price,
                                             )
                                          }}/người</span
                                       >
                                    </div>
                                    <div class="item-quantity">
                                       <span class="text-light quantity-product"
                                          ><span style="font-size: 14px">SL: </span>{{ item.quantity }}</span
                                       >
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="footer-cart">
                              <span class="text-light"
                                 >Có <span class="lenghtCart">{{ getlengthcarts }}</span> sản phẩm trong giỏ hàng
                              </span>
                              <button class="btn btn-light" type="button" @click="gotocart">Vào giỏ hàng</button>
                           </div>
                        </div>
                     </div>
                     <img src="@/assets/images/cart.png" alt="" class="cart-img" />
                     <span class="quantity_cart">{{ getlengthcarts }}</span>
                  </div>

                  <div class="User">
                     <div class="not-login">
                        <div class="collapse user_link" id="user">
                           <div class="card1 bg-white connect-shop">
                              <router-link to="/login"><button class="text-white">Đăng nhập</button> </router-link>
                              <router-link to="/logup"><button class="text-white1">Đăng ký</button></router-link>
                           </div>
                        </div>
                     </div>
                     <div class="login">
                        <div class="collapse user_link" id="user">
                           <div class="card card-body bg-white connect-shop">
                              <router-link to="/profile" class="text-white3"
                                 ><img src="@/assets/images/user.png" alt="" />
                                 <span
                                    style="margin-left: 5px"
                                    class="text-light data_user"
                                    data-bs-toggle="collapse"
                                    href="#user"
                                 ></span>
                              </router-link>
                              <a to="/" class="text-white4" @click="handlelogout()"
                                 ><ion-icon name="log-out-outline"></ion-icon
                              ></a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </nav>
</template>
<style scoped>
.main {
   width: 30%;

   margin-top: 50px;
}
.navbar .navbar-expand-lg .navbar-dark .bg-dark {
   background-color: #f5f5f5 !important;
}
.navbar-expand-lg {
   background: white;
}
.navbar {
   width: 100px;
   z-index: 100;
   background: white;
   font-family: 'Inter', sans-serif;
   font-weight: 600;
}
.login {
   margin-top: 10px;
}
.text-light {
   color: black !important;
}
.container-fluid {
   position: fixed;
   background-color: white;
   box-shadow: 0px 3px 40px #00000038;
}
.connect-shop {
   padding: 0;

   display: contents;
}
.right {
   margin-top: 20px;
   display: inline-block;
}
.connect-shop a {
   padding: 2px 2px;
}
.navbar-dark .navbar-nav .nav-link {
   text-decoration: none;
   color: #1a202c;
   height: 100%;
   display: flex;
   position: relative;
   font-size: 20px;
   transition: all 0.3s;
   align-items: center;
   font-weight: 400;
   line-height: 18px;
   margin-right: 24px;
}
.text-white {
   color: black !important;
   width: 90px;
   height: 40px;
   border: 2px solid #d3d3d3;
   -moz-border-radius: 20px;
   -webkit-border-radius: 20px;
   -ms-border-radius: 20px;
   -o-border-radius: 20px;
   border-radius: 20px;
   background: #fff;
   margin-right: 10px;
}
.text-white:hover {
   background: #f8f8ff;
   color: #d3d3d3;
   border: 2px solid #f8f8ff;
}

.text-white1:hover {
   background: #f8f8ff;
   color: #d3d3d3;
   border: 2px solid #f8f8ff;
}
/* aaaa */
.text-white1 {
   width: 90px;
   height: 40px;
   color: black !important;
   border: 2px solid #d3d3d3;
   -moz-border-radius: 20px;
   -webkit-border-radius: 20px;
   -ms-border-radius: 20px;
   -o-border-radius: 20px;
   border-radius: 20px;
   background: #fff;
}
.text-white3 {
   width: 100px;
   height: 40px;
   color: black !important;

   -moz-border-radius: 20px;
   -webkit-border-radius: 20px;
   -ms-border-radius: 20px;
   -o-border-radius: 20px;
   border-radius: 20px;
   background: #fff;
}
.text-white3 img {
   width: 30px;
}
.text-white4 {
   height: 40px;
   color: black !important;
   /* border: 2px solid #D3D3D3; */
   -moz-border-radius: 20px;
   -webkit-border-radius: 20px;
   -ms-border-radius: 20px;
   -o-border-radius: 20px;
   border-radius: 20px;
   background: #fff;
}

a.text-white4 ion-icon {
   font-size: 28px;
}
.navbar-brand img {
   width: 170px;
   margin-left: 40%;
   margin-top: 50px;
}
.navbar-brand {
   float: left;

   height: 126px;
   font-size: 14px;
}
.card1 {
   display: flex;
   justify-content: center;
   align-content: center;
}

.cart-img {
   width: 40px;
   height: 40px;
}
.User,
.Cart {
   margin-left: 50px;
   display: inline-block;
   background: white;
}
.wrapper_cart {
   position: absolute;
   width: 50px;
   height: 50px;
   margin: 3px auto;
}
ul.navbar-nav {
   display: flex;
   height: 80px;
   margin: 50px auto;
   justify-content: center;
   align-items: center;
}
.quantity_cart {
   position: absolute;

   width: 20px;
   height: 20px;
   border-radius: 50%;
   line-height: 20px;
   color: #fff;
   font-size: 16px;
   background: #ee4266;
   right: 0px;
   text-align: center;
}
.cart_link {
   position: absolute;
   top: 100%;
   right: 0;
   display: none;
   width: 500px;
   z-index: 100;
   overflow-y: scroll;
   max-height: 500px;
}
#cart_link::-webkit-scrollbar {
   width: 6px;
   background-color: #f5f5f5;
}
.wrapper_cart:hover > .cart_link {
   cursor: pointer;
   display: block;
   animation: fadeIn 0.8s ease;
}

.cart-info {
   width: 100%;
   height: 90%;
   overflow-y: auto;
}
.cart-info::-webkit-scrollbar {
   width: 3px;
   background-color: #ffffff;
}
.cart-info::-webkit-scrollbar-thumb {
   background-color: #acacac;
   border-radius: 6px;
}
.hiden {
   visibility: hidden;
}
ul.navbar-nav {
   display: flex;
   height: 100px;
   justify-content: center;
   align-items: center;
   width: 70%;
}
.d-flex {
   display: inline-block;
}
.input_search {
   margin-top: 10px;
   width: 300px;
   height: 40px;
   visibility: visible;
   animation: Search 0.5s linear;
}

.user_link {
   width: 250px;
   display: flex;
   height: 40px;
   z-index: 10;
   justify-content: center;
   align-content: center;
}
.user_link a {
   display: inline-block;
   text-decoration: none;
   color: #ff3366;
   font-size: 14px;
}
@keyframes Search {
   0% {
      transform: translateX(5%);
   }
   100% {
      transform: translateX(0%);
   }
}
.item_cart {
   margin: 40px 0;
}
.item-img {
   margin-right: 10px;
   display: inline-block;
}
.img-product {
   width: 80px;
   height: 80px;
   border-radius: 3px;
   margin-bottom: 25px;
}
.item-name {
   width: 350px;
}
.name-product {
   white-space: wrap;
   min-width: 50px;
   font-weight: 500;
   font-size: 12px;
   text-transform: uppercase;
   color: #252a2b;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 2;
}
.item_cart:hover {
   background-color: wheat;
}
.footer-cart {
   display: flex;
   justify-content: space-around;
}
.cart img {
   width: 40px;
   height: 40px;
}
@media only screen and (max-width: 1024px) {
   .User,
   .Cart {
      display: none;
   }
   @keyframes Search {
      0% {
         transform: translateX(5%);
      }
      100% {
         transform: translateX(0%);
      }
   }
}
@keyframes fadeIn {
   0% {
      opacity: 0.5;
      transform: translateY(-100%);
   }
   100% {
      opacity: 1;
      transform: translateY(0%);
   }
}
</style>
