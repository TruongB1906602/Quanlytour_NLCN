<script>
   
    import OrderService from '../services/Order.service'
  
    import toastsVue from '../components/toasts.vue'
    import toastsjs from '../assets/js/toasts.js'
    import { mapState } from 'pinia'
    import { useAuthStore } from "@/stores/Auth.store";
    export default {
        data(){
            return{
                 orderdetail:[],
              
                 toasts:{
                    title:"Success",
                    msg:"Thêm vào giỏ hàng thành công!",
                    type:"success",
                    duration:2000
                 },
               
            }
        },
        computed:{
            ...mapState(useAuthStore,{
                currentUser: "user",
            }),
        },
        components:{
          
            toastsVue,
           
        },
        methods:{
            toastsjs,
            async getproduct(){
                try{
                 
                    this.orderdetail= await OrderService.get(this.$route.params.id);
                }catch(error){
                    console.log(error);
                   
                }
            },
          

        
            created() {
                this.getproduct();
            },
        }
    }
</script>
<template>

<div>
  
    <toastsVue></toastsVue>
    <div class="row" 
      v-for="item in orderdetail"
      :key="item._id"
      >
     
            <div class="col-md-6 col-lg-6 col-xl-6">
                <h6 class="text">{{item.name}}</h6>
                 
            </div>
            <div class="col-md-6 col-lg-6 col-xl-6">
                <h6 class="text">{{item.quantity}}</h6>
                 
            </div>
            <div class="col-md-6 col-lg-6 col-xl-6">
                <h6 class="text">{{item.price}}</h6>
                 
            </div>
         
             <!-- <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                <button type="button" @click="deletedcart(index,item.productId)" class="text-muted btn btn-exit"><img src="@/assets/images/del.png" alt=""></button>
            </div> -->
            <hr>          
    </div>      
      </div>
</template>
<style scoped>
   .col-md-1 img{
    width: 25px;
    height: 25px;
   
   }
    .text{
    font-size: 12px;
    font-weight: 500;
    line-height: 19px;
    color: black;
    margin-bottom: 4px;
      
   }
   .img-fluid {
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
   }
   .col-xl-6 {
    flex: 0 0 auto;
    width: 50%;
   }
</style>