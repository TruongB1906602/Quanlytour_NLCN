<script>
    import UserService from "../services/User.service";
    import toastjs from "../assets/js/toasts";
    import { swalert } from "@/mixins/swal.mixin";
  
        export default{
            data(){
                return{
                    toasts:{
                        title:"",
                        msg:"",
                        type:"",
                        duration:0
                     },
                     user1: null,
                }
            },   
          
            props:{
                users:Array,
                refeshlist:Function,
                activeUser: { type: Number, default: -1 },
            },
            emits:['update:activeUser'],
            methods:{
                toastjs,
                async deluser(id){
                    swalert
                    .fire({
                        title: "Xóa hướng dẫn viên",
                        icon: "Warning",
                        text: "Bạn có muốn xóa hướng dẫn viên?",
                        showCloseButton: true,
                        showCancelButton: true,
                    })
                    .then(async (result) => {
                        if (result.isConfirmed) {
                            try {
                                await UserService.delete(id);
                                setTimeout(()=>{
                                   location.reload();
                                 },2000);
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    });
                    },
                 
                  
    
                updateuserindex(index){
                    this.$emit("update:activeUser",index)
                },
            
            },
          
        }
    </script>
    <template>

        <div class="container " > 
         <div class=" row-cols-1">
           <h4 class="heading" >Tên người dùng</h4>
           <div class="title user-item" v-for="user in users"  
                :key="user._id"
             
           >
               <span >{{ user.username}}</span>
              
            </div>
              
         </div>
    
         <div class=" row-cols-1">
           <h4 class="heading" >Email</h4>
           <div class="title" v-for="user in users"  
                :key="user._id"
               
           >
               <span  >{{user.email}}</span>
              
            </div>
              
         </div>
      
         <div class="row-cols-1">
           <h4 class="heading " >Chức năng</h4>
           <div class="title user-item" 
                 v-for="user in users"  
                :key="user._id"
    
                @click="updateuserindex(index)"
           >
          
                <button  class=" btn-outline-danger btn-sm" @click="deluser(user._id)"><ion-icon name="close-circle-outline"></ion-icon>
                </button>
             
             
                 <button   class=" btn-outline-danger btn-sm" >
                 <router-link
                                        :to="{
                                        name: 'edituser',
                                        params: { id: user._id }, 
                                        }"
                                        >
                                        
                                        <ion-icon name="create-outline"></ion-icon>
                
                                           
                                     </router-link>
                
                </button> 
               
               
    
            </div> 
              
         </div> 
      
            </div>   
               
    </template>
    <style scoped>
    
    .list-group{
        width: 300px;
        
    }
    .list-group-item:hover{
            background-color: #0d6efd;
            color: azure;
        }
    .fa-solid.fa-circle-xmark{
        font-size:25px;
        color:tomato;
    }.title:hover{
         background-color: #0d6efd;
        color: azure;
    
    }
    .col{
       border: 1px solid  #dee2e6;
       font-size: 14px;
    }
     button{
       font-size: 15px;
        border: 1px solid #dee2e6;
        background:#FBE2C5;
        margin: 0 5px;
    }
    .btn{
        font-weight: 500;
       
        padding: 15px;
        border: 1px solid #dee2e6;
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
    
    .title{
        border: 1px solid #dee2e6;
        height: 55px;
         font-size: 14px;
        font-weight: 500;
        padding: 15px;
        overflow: hidden;
        background: white;
       
    }
    
    .container{
       display: flex;
       max-width: 100%;
    }
    
    </style>