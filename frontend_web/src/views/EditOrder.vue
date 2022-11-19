<template>
    <div>
        <toastsVue></toastsVue>
    <div>
       
        <div v-if="order" class="page">
        
            <Orderform
                     class="orderform"
                     :order="order"
                     @submit:order="updateOrder"
           />
                <div class="row" 
                v-for="(item,index) in carts"
                :key="item._id"
                v-show="item.userId === this.order.userId"
                >
                <div class="btn">
                    <button @click="deletedcart(index,item._id)" >Xóa giỏ hàng</button>
                </div>
                <hr>          
            </div>
           
      
        </div>
    
    </div> 

    </div>
    </template>
    
    
    <script>
    import toastjs from "../assets/js/toasts";
    import toastsVue from "../components/toasts.vue";
    import OrderService from "../services/Order.service";
    import HeaderShop from "../components/HeaderShop.vue";
    import Orderform from "../components/Orderform.vue";
    
    import CartService from '../services/Cart.service';
    import { mapState } from 'pinia'
    import { useAuthStore } from "@/stores/Auth.store";
    export default {
      data(){
        return {
        
             toasts:{
                  title:"Thông báo!",
                  msg:"Đã thanh toán",
                  type:"success",
                  duration:2000
                  },
            order: null,
            carts:[],
        }
      },
    
        components: {

            Orderform,
            toastsVue,
           
        },
        computed:{
            ...mapState(useAuthStore,{
                currentUser: "user",
            }),
        },
     
        methods: {
        toastjs,
        async getorder(id) {
                try {
                    this.order= await OrderService.get(id);
                    console.log(this.order.userId);
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
            async updateOrder(data) {
                try {
                    await OrderService.update(this.order._id,data);
                    this.toastjs();
                }catch(error) {
                    console.log(error);
                        this.toasts.title = "Warning",
                        this.toasts.msg="Đã xảy ra lỗi rồi! ",
                        this.toasts.type = "warn",
                        this.toasts.duration=2000
                        this.toastjs();
                    }
                }, 
                async getcart() {
                try {
                    this.carts= await CartService.getAll()
                  
                } catch (error) {
                    console.log(error);
                   
                }
            },
            getiduser(){
          const user =  JSON.parse(localStorage.getItem("user"));
          return user._id;
        },
        async getcarts(){
          try{
          this.carts = await CartService.get(this.getiduser());
         
          }catch(error){
            console.log(error);
          }
        },
        async deletedcart(index,id){
            this.$emit("deleted:cartIndex",index)
            await CartService.delete(this.carts[index]._id)
            this.toasts.title = "Thông báo",
                      this.toasts.msg="Xóa ",
                      this.toasts.type = "warn",
                      this.toasts.duration=2000
                       this.toastjs();
                     setTimeout(()=>{
                     location.reload();
                   },1000);
           
            
        },
        async delcart(index){
              this.toasts.title="Deleted",
              this.toasts.msg="Đã xóa sản phẩm",
              this.toasts.type="error",
              this.toasts.duration=1000
           
              await CartService.delete(this.carts[index]._id)
              this.refeshlistcart();  
        },
      
       refeshlistcart(){
         this.getcarts();
       },
            
    },
                
        created(){
            this.getcart();
            this.getorder(this.$route.params.id);
        },
     
     
    }
    </script>
    <style scoped>

    .btn button{
    padding: 5px;
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
    position: absolute;
    right: 42%;
    top:380px;
    border-radius: 5px;

    
    }
   .btn button:hover{
    box-shadow: 0px 8px 8px rgb(0 0 0 / 3%);
   
   }
    .btn img{
    width: 20px;
    height: 18px;

   
   }
    .text{
    font-size: 1px;
    font-weight: 500;
    line-height: 19px;
    color: black;
    margin-bottom: 4px;
      
   }
   .img-fluid {
    width: 120px;
    height: 85px;
    margin-bottom: 10px;
   }
   .title p img{
    width:20px;
   }
   
   .text img{
    width: 15px;

   }
   h6{
    width: 300px;
   }
    </style>