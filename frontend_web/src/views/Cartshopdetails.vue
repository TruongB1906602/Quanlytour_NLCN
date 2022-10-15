<script>
import CartService from '../services/Cart.service';
import toastsVue from '../components/toasts.vue';
import toastsjs from '../assets/js/toasts.js'
import CartItem from "../components/CartItem.vue";
export default{
    data(){
      return{
          carts:[],
          toasts:{
              title:"",
              msg:"",
              type:"",
              duration:0
              },
      }
    },
    components:{
        
         toastsVue,
         CartItem
     },
     methods:{
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
        async delcart(index){
              this.toasts.title="Deleted",
              this.toasts.msg="Đã xóa sản phẩm",
              this.toasts.type="error",
              this.toasts.duration=2000
              this.toastsjs(); 
              await CartService.delete(this.carts[index]._id)
              this.refeshlistcart();  
        },
       toastsjs,
       refeshlistcart(){
         this.getcarts();
       },
       registerproduct(){
         if(this.carts.length > 0){
          this.toasts.title = "Success",
          this.toasts.msg = "Đã cập nhật",
          this.toasts.type = "success",
          this.toasts.duration=1000,
          this.toastsjs();
         }else{
              this.toasts.title = "Failed",
              this.toasts.msg = "Bạn chưa có sản phẩm",
              this.toasts.type = "error",
              this.toasts.duration=2000,
              this.toastsjs();
         }
       },  
        
     },
     computed: {
          total(){
           var total=0;
           for(var i in this.carts){
              total=total + this.carts[i].price*this.carts[i].quantity;
           }
             return  new Intl.NumberFormat('de-DE',{style: 'currency',currency: 'VND'}).format(total);
        }   
     },
      created(){
        this.refeshlistcart();
     },
}
</script>
<template>
  <div>
      
  <toastsVue></toastsVue>
 
 <section class="h-100 h-custom">
<div class="container py-5 h-100">

   <div class="col-12">
     <div class="card card-registration card-registration-2" style="border:none">
     
         <div class="row g-0">
           <div class="col-lg-8">
             <div class="p-5">
              
               <hr class="my-4">
               <CartItem :refeshlistcart="refeshlistcart" :carts="carts" @deleted:cartIndex="delcart"></CartItem>
               <div class="d-flex justify-content-between mb-5">
                 <h5 class="text-uppercase">Tạm tính:</h5>
                 <h5>{{total}}</h5>
               </div>
               <div class="pt-5">
                 <h6 class="mb-0"><router-link to="/" class="text-body"><i
                       class="fas fa-long-arrow-alt-left me-2"></i>Quay lại</router-link></h6>
               </div>
             </div>


           </div>
          
         </div>
   
     </div>
   </div>

</div>
</section>
  </div>
</template>
<style scoped>
@media (min-width: 1025px) {
.h-custom {
height: 100%;
}
}
.p-5{
   width: 700px;



}
h1{
  font-size:25px;
}
       
 .container{

 top:10%;
 height:100%;
display:flex;

        }


.btn-main{
 text-decoration: none;
 font-size: 1.25rem;
  padding: 20px 50px;


 position: relative;
}
.btn-2{
  color:#000;
}
.btn-2::after, .btn-2::before{
  border: 3px solid   #000;
  content:"";
  position: absolute;
  width: calc(150px - 6px);
  height:  calc(50px - 6px);
  left: 30px;
  bottom:10px;
  z-index:1;
  transition:  transform 0.3s ease;

}
.btn-2:hover::after{
  transform:  translate(-5px,-5px);

}
.btn-2:hover::before{
  transform: translate(5px,5px);
}

</style>