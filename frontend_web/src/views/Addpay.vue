

<script>

  import toastjs from "../assets/js/toasts";
  import toastsVue from "../components/toasts.vue";
  import PayService from "../services/Pay.service";
  import NewsService from "../services/News.service";
  import Cartshopdetails from "@/views/Cartshopdetails.vue";
  import HeaderShop from '@/components/HeaderShop.vue';
  import Paymentform1 from "../components/Paymentform1.vue";

  export default {
   
    data(){
    
      return {
        news:[],
           toasts:{
                title:"Success",
                msg:"Đặt hàng thành công!",
                type:"success",
                duration:2000
                },
                title:'1',
                
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
           async getnews() {
              try {
                 this.news=  await NewsService.getAll();

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
    mounted(){
      this.getnews();
    }
   
  
  };
  </script>
  <template>
  <div style="color: #1A202C; width: 100%;
      background: #EDF2F7; ">
  <HeaderShop/>
  
  <toastsVue></toastsVue>
  <nav  class="nav-breadcum" style="--bs-breadcrumb-divider: 
  url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
                  <ol class="breadcrum">
                      <router-link class="breadcrumb-item" to="/"><a href="#">Trang chủ</a></router-link>
                      <router-link class="breadcrumb-item" to="/addpay"><a href="#">Thanh toán</a></router-link>
                  </ol>
     </nav>
 
    <div class="page">
     
        <div class="pays"> 
                    <Paymentform1
                            
                              :pay="{}"	
                              @submit:pay="addpay"
                              :resetAfterSubmit="false"
                            
                    />
                  <div class="support">
                      <h3>Hỗ trợ trực tuyến</h3>
                      <ul>
                        <li> 
                              <strong>Đặt tour</strong>
                              <span> Call: 09 474 71181</span>
                              <span>Email: travelviet@gmai.com</span>
                              <p class="social">
                                  <a href="" class="hk-ic hk-f">Facebok</a>

                                  <a href="" class="hk-ic hk-f">Zalo</a>


                              </p>
                        </li>
                        <li> 
                              <strong>Tư vấn du lịch</strong>
                              <span> Call: 09 3245 6748</span>
                              <span>Email: travelviet@gmai.com</span>
                        </li>
                        <li> 
                              <strong> Mọi chi tiết xin liên hệ về địa chỉ:</strong>
                              <span>hotro@gmail.com</span>
                        </li>



                      </ul>
                      <h3>Tin Tức mới</h3>
                      <ul>
                        <li v-for=" item in news"> 
                              <strong> <img :src=item.img[0] style="width: 110px; height:60px; margin: 0px 5px;" alt=""></strong>
                              <span style="font-size: 13px ; width: 15rem; height: 60px;overflow: hidden;">{{item.title}}</span>
                           
                        </li>
                        </ul>

                  </div>
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
    
       margin-left: 11rem;
        display: flex;
        justify-content: center;
        align-items: center;
      
      }
      .support h3:before {
    content: '';
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url(//tadivui.com/wp-content/themes/combodulich/images/front/sprite.png) no-repeat -97px -28px;
    margin-right: 15px;
}
    
.support h3::after {
    content: '';
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url(//tadivui.com/wp-content/themes/combodulich/images/front/sprite.png) no-repeat -97px -28px;
    margin-left: 15px;
}

      .support{
        border: 1px solid #e5e5e5;
        background: #fafafa;
        padding: 20px 0 0;
        margin-bottom: 30rem;
        margin-left: 2rem;
      }
      .support h3{
        background: #169dca;
        margin: 0 -1px -1px;
        font: 600 16px/20px 'Open Sans', sans-serif;
        color: #fff;
        text-transform: uppercase;
        padding: 11px 0 9px;
        text-align: center;
      }
      .support ul li{
        padding: 15px 25px 10px;
        border-top: 1px solid #e5e5e5;
        position: relative;
        list-style: none;
      }
      .support strong{
          font: 400 14px/20px 'Roboto', sans-serif;
          color: #f00;
          text-transform: uppercase;
          display: block;
          margin-bottom: 8px;
      }
      .support span{
        font: 400 14px/20px 'Roboto', sans-serif;
        color: #555;
        display: block;
        margin-bottom: 8px;
      }
      .social{
        overflow: hidden;
        position: absolute;
        right: 10px;
        top: 10px;
      }
      .social a{
        display: inline-block;
        height: 16px;
        margin: 0 4px;
      }
      .nav-breadcum{
        margin-top: 4rem;
      
      }
  </style>