<script>

    import UserService from "../services/User.service";
    import toastjs from "../assets/js/toasts";
    import { swalert } from "@/mixins/swal.mixin";
    import EditUser from "@/components/EditUser.vue";
  
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
                     showModal: false
                }
            },   
          
            props:{
                users:Array,
                refeshlist:Function,
                activeUser: { type: Number, default: -1 },
            },
            emits:['update:activeUser'],
            components:{
                        EditUser,
            },
            methods:{
                toastjs,
                async deluser(id){
                    swalert
                    .fire({
                
                        showCloseButton: true,
                        showCancelButton: true,
                    })
                    .then(async (result) => {
                        if (result.isConfirmed) {
                            try {
                                await UserService.delete(id);
                                setTimeout(()=>{
                                   location.reload();
                                 },1000);
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
         <div id="app" class="modal-vue">
                        
                        <!-- button show -->
                        <button @click="showModal = true">show</button>
                        
                        <!-- overlay -->
                        <div class="overlay" v-if="showModal" @click="showModal = false">
                       
                        </div>
                        
                        <!-- modal -->
                        <div class="modal" v-if="showModal">
                            <button class="close" @click="showModal = false">x</button>
                            <h3>Title</h3>
                            <p>Description</p>
                            <EditUser></EditUser>
                        
                        </div>
                        
                        </div>

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
           <div class="email" v-for="user in users"  
                :key="user._id"
               
           >
               <span  >{{user.email}}</span>
              
            </div>
              
         </div>
      
         <div class="row-cols-1">
           <h4 class="heading " >Chức năng</h4>
           <div class="btn list-group-item user-item d-flex"
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
         width:  120px;
        height: 65px;
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
        height: 65px;
         font-size: 14px;
        font-weight: 500;
        padding: 15px;
        width: 14rem;
        overflow: hidden;
        background: white;
       
    }
    .email{
        border: 1px solid #dee2e6;
        height: 65px;
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
    .modal-vue .overlay {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
}

.modal-vue .modal {
 
  width: 400px;
  z-index: 9999;
  margin: 0 auto;
  height: 400px;
  padding: 20px 30px;
  background-color: #fff;
}

.modal-vue .close{
  position: absolute;
  top: 10px;
  right: 10px;
}
    </style>