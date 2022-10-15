<script>
   import PayService from "../services/Pay.service";
    import toastjs from "../assets/js/toasts";
        export default{
            data(){
                return{
                    toasts:{
                        title:"",
                        msg:"",
                        type:"",
                        duration:0
                     },
                }
            },   
            props:{
                pays:Array,
                refeshlist:Function,
                activeIndexPay: { type: Number, default: -1 },
            },
        emits: ["update:activeIndexPay"],
            methods:{
                toastjs,
                async delpay(id){
                    try{
                        await PayService.delete(id);
                        this.refeshlist();
                        this.toasts.title = "Success",
                        this.toasts.msg="Đã xóa người dùng",
                        this.toasts.type = "success",
                        this.toasts.duration=2000
                        this.toastjs();
                    }catch(error){
                        console.log(error);
                        this.toasts.title = "Warning",
                        this.toasts.mqsg= "Bạn chưa đăng nhập hoặc bạn không phải ADMIN",
                        this.toasts.type = "warn",
                        this.toasts.duration=2000
                        this.toastjs();
                    }
                },
                updateActivePay(index) {
                this.$emit("update:activeIndexPay", index);
                console.log(this.pays)
                },
            }
        }
    </script>
    <template>
    
         <div class="container">
         <div class=" row-cols-1">
            <h4 class="heading" >Tên khách hàng</h4>
            <div class="title" v-for="pay in pays"
                :key="pay._id"
              
            >
            
                <span>{{pay.name}}</span></div>
               
            </div>
          <div class=" row-cols-1" >
              <h4 class="heading">Sđt</h4>
            <div  class="phone" v-for="pay in pays"
                :key="pay._id"
              
            >
                <span>{{pay.phone}}</span></div>
               
            </div>
            <div class=" row-cols-1" >
              <h4 class="heading">Ngày đặt</h4>
            <div  class="date" v-for="pay in pays"
                :key="pay._id"
              
            >
                <span>{{pay.updatedAt}}</span></div>
               
            </div>
             <div class=" row-cols-1" >
             <h4 class="heading">Địa chỉ</h4>
            <div  class="address" v-for="pay in pays"
                :key="pay._id"
               
            >
                <span>{{pay.address}}</span></div>
               
            </div>
          
            
              <div class=" row-cols-1" >
            <h4 class="heading">Chức năng</h4>
            <div  class="btn list-group-item pay-item d-flex" v-for="(pay, index) in pays"
            
                :key="pay._id"
                @click="updateActivePay(index)"
               
            >
              <button class=" btn-outline-danger btn-sm" @click="delpay(pay._id)"><ion-icon name="close-circle-outline"></ion-icon></button>
               <button class=" btn-outline-danger btn-sm" @click="updatePay(pay._id)"><i class="fa-solid fa-folder-plus"></i></button>
               </div>
            </div>
    </div>
     </template>
    <style scoped>

     .title:hover{
          background-color: #0d6efd;
            color: azure;
    
     }
    .col{
        border: 1px solid  #dee2e6;
        font-size: 14px;
        
    }
    .btn button{
       
     
        font-size: 18px;
       
         border: 1px solid #dee2e6;
         background:#FBE2C5;
         margin: 0 5px;
    }
    .btn{
         font-weight: 500;
        font-size: 12px;
        padding: 20px;
         border: 1px solid #dee2e6;
            background: white;
          
    }
    .others{
        height:80px;
         font-weight: 600;
        font-size: 14px;
        padding: 18px;
         border: 1px solid #dee2e6;
            background: white;
          
    }
    .date{
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
    .images{
         border: 1px solid #dee2e6;
        height: 80px;
        font-size: 14px;
        overflow: hidden;
        padding: 10px;
        width: 150px;
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