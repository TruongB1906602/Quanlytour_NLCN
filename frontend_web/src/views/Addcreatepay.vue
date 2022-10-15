
<script>
    import toastjs from "../assets/js/toasts";
    import toastsVue from "../components/toasts.vue";
    import Paymentform from "../components/Paymentform.vue";
    import PayService from "@/services/Pay.service";
    export default {
      data(){
        return {
             toasts:{
                  title:"Success",
                  msg:"Thêm khách hàng thành công",
                  type:"Success",
                  duration:3000
                  },
        }
      },
      components: {
    
        Paymentform,
        toastsVue,
        
    },
    
        methods: {
        toastjs,
            async addcreatepay(data) {
                try {
                    await PayService.create(data);
                    this.toastjs();
                    setTimeout(()=>{
                      location.reload();
                    },1000);
                }catch(error) {
                    console.log(error);
                        this.toasts.title = "Warning",
                        this.toasts.msg="Tài khoản không phải ADMIN",
                        this.toasts.type = "warn",
                        this.toasts.duration=1000
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
    <toastsVue></toastsVue>
        <div class="page">
            <div class="pays"> 
            
                <Paymentform
                    :pay="{}"	
                    @submit:pay="addcreatepay"
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
            
            width:500px;
        
        }
    </style>