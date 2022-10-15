

<script>
  import toastjs from "../assets/js/toasts";
  import toastsVue from "../components/toasts.vue";
  import PayService from "../services/Pay.service";
  import Cartshopdetails from "@/views/Cartshopdetails.vue";
  import HeaderShop from '@/components/HeaderShop.vue';
  import Paymentform1 from "../components/Paymentform1.vue";
  
  
  export default {
    props:{

    },
    data(){
     
      return {
    
           toasts:{
                title:"Success",
                msg:"Đặt hàng thành công!",
                type:"success",
                duration:2000
                },
                
      }
    },
    components: {
      HeaderShop,
      Paymentform1,
      toastsVue,
      Cartshopdetails,
      
  },
  
    methods: {
      toastjs,
          async addpay(data) {
              try {
                  await PayService.create(data);
                  this.toastjs();

                   setTimeout(()=>{
                     location.reload();
                   },2000);
                   setTimeout(()=>{
                     this.$router.push("/Success");
                   },1000);
              }catch(error) {
                  console.log(error);
                      this.toasts.title = "Warning",
                      this.toasts.msg="Lỗi",
                      this.toasts.type = "warn",
                      this.toasts.duration=2000
                       this.toastjs();
                  }
                 
            },  
            async getpay() {
              try {
                  await PayService.get(id);

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
   
  
  };
  </script>
  <template>
  <div style="color: #1A202C; width: 100%;
      background: #EDF2F7;">
  <HeaderShop/>
  <nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
                  <ol class="breadcrum">
                      <router-link class="breadcrumb-item" to="/"><a href="#">Trang chủ</a></router-link>
                    
                         <router-link class="breadcrumb-item" to="/addpay"><a href="#">Thanh toán</a></router-link>
                  </ol>
              </nav>
  <toastsVue></toastsVue>
    <div class="page">
      <div class="pays"> 
                  <Paymentform1
                          
                            :pay="{}"	
                            @submit:pay="addpay"
                            :resetAfterSubmit="false"
                          
                  />
      </div>
     
        
        
      </div>
    </div>
    
     
    
  </template>
  <style scoped>
  
  .breadcrumb-item a {
              font-size: 18px;
              color: rgb(22, 15, 15);
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
          padding-left: 10%;
          background: #fafafa;
          list-style: none;
          
      }
      .order{
         
          width:620px;
          margin-left: 20px;
      }
      .page{
  
          background: white;
      }
      .pays{
          margin-left:30px;
        
      
      }
  </style>