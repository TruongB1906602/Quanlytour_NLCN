

<script>
    import toastjs from "../assets/js/toasts";
    import toastsVue from "../components/toasts.vue";
    import TourguideService from "../services/Tourguide.service";
  
    import HeaderShop from '@/components/HeaderShop.vue';
    import Tourguideform from "../components/Tourguideform.vue";
    
    
    export default {
     
      data(){
       
        return {
      
             toasts:{
                  title:"Success",
                  msg:"Thêm hướng dẫn viên thành công!",
                  type:"success",
                  duration:2000
                  },
                  
        }
      },
      components: {
        HeaderShop,
        Tourguideform,
        toastsVue,
      
        
    },
    
      methods: {
        toastjs,
            async addtourguide(data) {
                try {
                    await TourguideService.create(data);
                    this.toastjs();
  
                     setTimeout(()=>{
                       location.reload();
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
              async gettourguide() {
                try {
                    await TourguideService.get(id);
  
                      setTimeout(()=>{
                         location.reload();
                     },1000);
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
        <div class="tourguides"> 
                    <Tourguideform
                            
                              :tourguide="{}"	
                              @submit:tourguide="addtourguide"
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