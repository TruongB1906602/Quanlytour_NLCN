<script>

  import HeaderShop from '@/components/HeaderShop.vue';
  import CartService from '../services/Cart.service';  
  import OrderService from '../services/Order.service';
  import toastsVue from '../components/toasts.vue';
  import toastsjs from '../assets/js/toasts.js'
  import CartItem from "../components/CartItem.vue";
  
  export default{
   
      data(){
        return{
           orders:[],
            carts:[],
            toasts:{
                title:"",
                msg:"",
                type:"",
                duration:0
                },
                title:"1"
        }
      },
      components:{
           HeaderShop,
           toastsVue,
           CartItem
       },
       methods:{

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
          async deletedorder(){
                  for(var i in this.orders){
                    if(this.orders[i].userId == this.getiduser()){
                      this.orders=  await OrderService.delete(this.orders[i]._id)

                    }
                  }
                  for(var i in this.carts){
                    if(this.carts[i].userId == this.getiduser()){
                      this.carts=  await CartService.delete(this.carts[i]._id)

                    }
                  }

              this.toasts.title="Deleted",
              this.toasts.msg="Đã xóa đơn hàng",
              this.toasts.type="error",
              this.toasts.duration=2000
              this.toastsjs(); 
          
              setTimeout(()=>{
                   location.reload();
                 },2000);
                 this.$router.push("/")
   
        },
        async edittour(){
                  for(var i in this.orders){
                    if(this.orders[i].userId == this.getiduser()){
                      this.$router.push({  params: { id: this.orders[i]._id}, name: 'editorder' });

                    }
                  }
              
              setTimeout(()=>{
                   location.reload();
                 },1000);
  
   
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
         
         toastsjs,
         refeshlistcart(){
           this.getcarts();
         },
       },
       computed: {
            total(){
             var total=0;
             for(var i in this.carts){
                total=total + this.carts[i].price*this.carts[i].quantity;
             }
               return  new Intl.NumberFormat('de-DE',{style: 'currency',currency: 'VND'}).format(total);
          },
          
        
       },
        created(){
          this.getorder()
          this.refeshlistcart();
         
      
        
       },
  }
  </script>
  <template>
     <div>
         
  
    <HeaderShop></HeaderShop>
    <toastsVue></toastsVue>
     <nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
                  <ol class="breadcrum">
                      <router-link class="breadcrumb-item" to="/"><a href="#">Trang chủ</a></router-link>
                     
                       <router-link class="breadcrumb-item" to="/Success"><a href="#">Tour đã đặt</a></router-link>
                  </ol>
              </nav>
       <div class="title-order">
      
        <h1 >    
         <span ><img style="width:40px;" src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt=""></span> 
            Đặt hàng thành công! 
            Đơn hàng của bạn đang chờ được phê duyệt! </h1>
      
       </div>       
  <section class="h-100 h-custom" style="margin:0 100px;">
    <div class="container py-5 h-100" >
      
        <div class="col-12">
          <div class="card " style="width:900px;border-radius: 15px;">
                   
              <div class="row">
                <div class="col-lg-8" >
                  <div class="p-5">
                    <div class="d-flex justify-content-between align-items-center mb-5" style="width:100%">
                     

                      <h6 class="mb-0 text-muted">{{carts.length}} sản phẩm</h6>
                    </div>
                    <hr class="my-4">
                    <CartItem v-bind:title="title" :refeshlistcart="refeshlistcart" :carts="carts"></CartItem>
                    <div class="edittour"
                      v-if="carts.length !=0">
                      <button class="btn-huy" @click="deletedorder">Hủy tour</button>
                      <router-link to="/">
                      <button class="btn-edit" @click="edittour"> Trở về
                      </button>
                      </router-link>
                     
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
  button{
    background: #137cec;
    border: none;
    padding: 5px;
    width: 100px;
    font-size: 19px;
    color: #eae8e8;
    border-radius:5px ;
  }
  h1{
    font-size:25px;
    margin-top: 3rem;
  }
  .title-order{
      display: flex;
      justify-content: center;
  }
   .container{
  
   top:10%;
   height:100%;
  display:flex;
  align-items: center;
  justify-items: center;
          }
  .btn-main{
   text-decoration: none;
   font-size: 1.25rem;
    padding: 20px 50px;
   margin: 32px;
   
  
   position: relative;
  }
  
  .p-5{
    padding-left: 300px;
    width:900px;
  }
  .py-5{
      
      width: 75%;

      padding-top: 0.5rem!important;
      padding-bottom: 0.5rem!important;
  }
 

  

  .breadcrumb-item a {
              font-size: 18px;
              color: #333;
      }
      a{
          text-decoration: none;
      }
      .breadcrum{
          display: flex;
          flex-wrap: wrap;
          font-size: 18px;
          padding-top: 5px;
          padding-bottom: 5px;
          padding-left: 14%;
          background: #fafafa;
          list-style: none;
      }
     .edittour{
      margin-top: 30px;
      display: flex;
    
      justify-content: center;
    
     }
     .btn-edit{
      margin-left:60px;
     }
  </style>