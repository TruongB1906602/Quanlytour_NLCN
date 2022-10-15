<template>
         <div class="container">
            <toastsVue></toastsVue>
         <div class=" row-cols-1">
            <h4 class="heading" >Tên khách hàng</h4>
            <div class="title" v-for="order in orders"
                 :key="order._id"
                v-show="order.nametourguide == user.username && user.Tourguide== true"
                        >   
                        
                            <span>{{order.name}}</span>
            </div>
               
            </div>
          <div class=" row-cols-1" >
              <h4 class="heading">Tên tour</h4>
              <div class="name" v-for="order in orders"
                 :key="order._id"
                v-show="order.nametourguide === user.username && user.Tourguide == true"
            >   
                        
                     <span>{{order.title}}</span>
                        </div>
               
            </div>
            <div class=" row-cols-1" >
              <h4 class="heading">Số điện  thoại</h4>
              <div class="phone" v-for="order in orders"
                            :key="order._id"
                            v-show="order.nametourguide == user.username && user.Tourguide== true"
                        >   
                        
                            <span>{{order.phone}}</span></div>
               
            </div>
             <div class=" row-cols-1" >
             <h4 class="heading">Số chỗ đặt</h4>
             <div class="title" v-for="order in orders"
                 :key="order._id"
                 v-show="order.nametourguide == user.username && user.Tourguide== true"
                            >   
                        
                <span>{{order.childquantity + order.adultquantity}}</span>
               
            </div>
          
           </div> 

           <div class=" row-cols-1" >
              <h4 class="heading">Ngày đi</h4>
              <div class="name" v-for="order in orders"
                 :key="order._id"
                v-show="order.nametourguide === user.username && user.Tourguide == true"
            >   
                        
                     <span>{{order.startdate}}</span>
                        </div>
               
            </div>
           
    </div>         
     
    </template>
    
    <script>
    import toastjs from "../assets/js/toasts";
    import toastsVue from "../components/toasts.vue";
    import UserService from "../services/User.service";
    import OrderService from "../services/Order.service";
    import HeaderShop from "../components/HeaderShop.vue";
    import Userform from "../components/Userform.vue";
    export default {
      data(){
        return {
             toasts:{
                  title:"Success",
                  msg:"Sửa sản phẩm thành công",
                  type:"success",
                  duration:2000
                  },
            user: null,
            orders:[]
          
        }
      },
        components: {
            // HeaderShop,
            Userform,
            toastsVue
        },
        methods: {
        toastjs,
        async getuser(id) {
                try {
                    this.user= await UserService.get(id);
                  
                    
                } catch (error) {
                    console.log(error);
                    this.$router.push({
                        name: "notfound",
                        params: { pathMatch: this.$route.path.split("/").slice(1) },
                        query: this.$route.query,
                        hash: this.$route.hash,
                    });
                }
            },
            async getorder() {
                try {
                    this.orders= await OrderService.getAll();
                  
                    
                } catch (error) {
                    console.log(error);
                    this.$router.push({
                        name: "notfound",
                        params: { pathMatch: this.$route.path.split("/").slice(1) },
                        query: this.$route.query,
                        hash: this.$route.hash,
                    });
                }
            },
            async updateuserindex(data) {
                try {
                  console.log(this.user.username);
                    await UserService.update(this.user._id,data);
                    this.toastjs();
                }catch(error) {
                    console.log(error);
                        this.toasts.title = "Warning",
                        this.toasts.msg="Tài khoản không phải ADMIN",
                        this.toasts.type = "warn",
                        this.toasts.duration=2000
                        this.toastjs();
                    }
                },  
        },
        created(){
          this.getorder()
        },
        mounted(){
            this.getuser(this.$route.params.id);
        }
    };
    </script>
    <style scoped>
    
    .title:hover{
          background-color: #0d6efd;
            color: azure;
    
     }
    .col{
        border: 1px solid  #dee2e6;
        font-size: 14px;
        
    }
   
  
    .others{
        height:80px;
         font-weight: 600;
        font-size: 14px;
        padding: 18px;
         border: 1px solid #dee2e6;
            background: white;
          
    }
    .name{
         border: 1px solid #dee2e6;
        height: 80px;
        font-size: 14px;
       
        font-weight: 500;
        padding: 10px;
           background: white;
        
    
    } 
    .phone{
        
         border: 1px solid #dee2e6;
        height: 80px;
        font-size: 14px;
       
        font-weight: 500;
        padding: 10px;
           background: white;
    }
    .heading{
        cursor: pointer;
        position: relative;
        border: 1px solid grey;
        background: #eee;
        font-size: 16px;
        display: flex;
       justify-content: center;
       align-items: center;
       height :35px;
       margin: 0 auto;
     
    }
    .address{
        border: 1px solid #dee2e6;
        height: 80px;
        font-size: 14px;
         font-weight: 500;
        /* width: 30%; */
         
          padding: 10px;
             background: white;
    }
    .title{
         border: 1px solid #dee2e6;
        height: 80px;
        font-size: 14px;
         font-weight: 500;
         padding: 10px;
         overflow: hidden;
            background: white;
        
    }
    
    .row-cols-1{
        /* width: 10%; */
        height: 20%;
       
    
    }
    .container{
        display: flex;
      
        max-width: 100%;
    }
    
    </style>
    