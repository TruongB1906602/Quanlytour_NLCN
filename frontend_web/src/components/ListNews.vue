<script>

   import NewsService from "../services/News.service";
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
                news:Array,
                refeshlist:Function,
                activeNews: { type: Number, default: -1 },
            },
        emits: ["update:activeNews"],
            methods:{
                toastjs,
                async delnews(id){
                    try{
                        await NewsService.delete(id);
                        this.refeshlist();
                        this.toasts.title = "Success",
                        this.toasts.msg="Đã xóa bài viết",
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
                updateActiveNews(index) {
                this.$emit("update:activeNews", index);
               
                },
            }
        }
    </script>
    <template>
    
         <div class="container">
       
        
             <div class=" row-cols-1" >
             <h4 class="heading">Tên tiêu đề</h4>
            <div  class="title" v-for="new1 in news"
                :key="new1._id"
               
            >
                <span>{{new1.title}}</span></div>
               
            </div>

         
            <div class=" row-cols-1" >
                 <h4 class="heading">Ảnh</h4>
                <div  class="images" v-for="new1 in news"
                        :key="new1._id"
                            
                            >
                     <img :src=new1.img[0] style="width: 110px; height:60px; margin: 0px 5px;" alt="">
                </div>
                                
             </div>
           
          
            
              <div class=" row-cols-1" >
            <h4 class="heading">Chức năng</h4>
            <div  class="btn list-group-item news-item d-flex" v-for="(new1, index) in news"
            
                :key="new1._id"
                @click="updateActiveNews(index)"
               
            >
              <button class=" btn-outline-danger btn-sm" @click="delnews(new1._id)"><ion-icon name="close-circle-outline"></ion-icon></button>
                    <button  class=" btn-outline-danger btn-sm">
                            <router-link
                                :to="{
                                name: 'editnews',
                                params: { id: new1._id },
                                                    
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

    .images{
         border: 1px solid #dee2e6;
        height: 80px;
        font-size: 14px;
        overflow: hidden;
        padding: 10px;
        width: 150px;
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
    .desc{
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
    
    .row-cols-1{
        /* width: 10%; */
        height: 20%;
       
    
    }
    .container{
        display: flex;
      
        max-width: 100%;
    }
    
    </style> 