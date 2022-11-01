import {createRouter,createWebHistory } from "vue-router";
import ShopView from "@/views/ShopView.vue";
import Cart from '@/views/CartShop.vue';
import Addpay from '@/views/Addpay.vue';
const routes = [
    {
        path: "/",
        name: "ShopMain",
        component: ShopView,
    },
  
   
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/LoginUser.vue"),
    },
   
    
    {
        path: "/logup",
        name: "Logup",
        component: () => import("@/views/Logup.vue"),
    },
    {
        path: "/modalview",
        name: "modalview",
        component: () => import("@/views/Modalview.vue"),
    },
    {
        path: "/orderdetails",
        name: "orderdetails",
        component: () => import("@/views/Orderdetails.vue"),
    },
   
    {
        path: "/details/:id",
        name: "details",
        component:() => import("@/views/DetailsProduct.vue"),
        
      },  
      {
        path: "/Cartshopdetails",
        name: "Cartshopdetails",
        component:() => import("@/views/Cartshopdetails.vue"),
        
      }, 
     
      {
        path: "/hotels/:id",
        name: "hotels",
        component:() => import("@/views/DetailsHotel.vue"),
        
      },  
      
      {
        path: "/places",
        name: "places",
        component:() => import("@/views/Place.vue"),
        
      },  
      
    
      {
        path: "/hotel",
        name: "hotel",
        component:() => import("@/views/Hotel.vue"),
        
      },  
      
      
      
      {
            path: "/Cart",
            name: "Cart",
            component: Cart,
     },
     {
        path: "/Cart/addpay",
        name: "addpay",
        component: () => import("@/views/Addpay.vue"),
    
    },
    
    {
        path: "/addproduct",
        name: "addproduct",
        component: () => import("@/views/AddProduct.vue"),
    },
    {
        path: "/addtourguide",
        name: "addtourguide",
        component: () => import("@/views/Addtourguide.vue"),
    },
    {
        path: "/tourguide",
        name: "tourguide",
        component: () => import("@/views/Tourguideview.vue"),
    },
    {
        path: "/Success",
        name: "success",
        component: () => import("@/views/Successorder.vue"),
    },
    
    {
        path: "/addhotel",
        name: "addhotel",
        component: () => import("@/views/AddHotel.vue"),
    },
    
    {
        path: "/addcreatepay",
        name: "addcreatepay",
        component: () => import("@/views/Addcreatepay.vue"),
    },
  
    {
        path: "/editproduct/:id",
        name: "editproduct",
        component: () => import("@/views/EditProduct.vue"),
    },
    {
        path: "/editnews/:id",
        name: "editnews",
        component: () => import("@/views/EditNew.vue"),
    },
    {
        path: "/edittourguide/:id",
        name: "edittourguide",
        component: () => import("@/views/Edittourguide.vue"),
    },
    {
        path: "/edittourguide/:id",
        name: "edittourguide",
        component: () => import("@/views/Edittourguide.vue"),
    },
    
    {
        path: "/edithotel/:id",
        name: "edithotel",
        component: () => import("@/views/EditHotel.vue"),
    },
    {
        path: "/edituser/:id",
        name: "edituser",
        component: () => import("@/components/EditUser.vue"),
    },
    {
        path: "/editorder/:id",
        name: "editorder",
        component: () => import("@/views/EditOrder.vue"),
    },
    {
        path: "/editpay/:id",
        name: "editpay",
        component: () => import("@/views/EditPay.vue"),
    },
    {
        path: "/profile",
        name: "profile",
        component: () => import("@/views/UserProfile.vue"),
    },
    
    {
        path: "/admin",
        name: "admin",
        component: () => import("@/views/Adminview.vue"),
    },
    {
        path: "/tourguideview",
        name: "tourguideview",
        component: () => import("@/views/Tourguideview.vue"),
    },
    
    {
        path: "/newsview",
        name: "newsview",
        component: () => import("@/views/Newsview.vue"),
    },
    
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@/views/NotFound.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;