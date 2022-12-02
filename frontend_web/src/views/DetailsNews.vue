<script>

    import HeaderShop from '@/components/HeaderShop.vue'
    import NewsService from '../services/News.service'
    import toastsVue from '../components/toasts.vue'
    import toastsjs from '../assets/js/toasts.js'
    import { mapState } from 'pinia'
    import { useAuthStore } from "@/stores/Auth.store";
    
    export default {
        data(){
            return{
                 detailnews:[],
               
                 toasts:{
                    title:"Success",
                    msg:"Thêm vào giỏ hàng thành công!",
                    type:"success",
                    duration:2000
                 },
                
                sub_quantity:1,
            }
        },
        computed:{
            ...mapState(useAuthStore,{
                currentUser: "user",
            }),
        },
        components:{
            HeaderShop,
            toastsVue,
           
        },
        methods:{
            toastsjs,

            async getnews(){
                try{
                 
                    this.detailnews = await NewsService.get(this.$route.params.id);
                }catch(error){
                    console.log(error);
                   
                }
            },
        },
          
        created() {
            this.getnews();
        },

    }
</script>
<template>
<div>
    <HeaderShop></HeaderShop>
    <toastsVue></toastsVue>
  
   <div class="container">
        <div class="heading">
                <h4> {{detailnews.title}}</h4>
        </div>
        <div class="desc" v-html="detailnews.desc">

        </div>
   </div>
    
  </div>
   
      
</template>
<style scoped>

.carousel-control-prev-icon {
    background-image: url(https://cdn-icons-png.flaticon.com/512/2985/2985162.png);
}
.carousel-control-next-icon {
    background-image: url(https://cdn-icons-png.flaticon.com/512/1549/1549454.png);
}
.carouselbutton{
   
   width: 10px;
   height: 10px;
   border: solid 1px white;
   background: #999;
   border-radius: 50%;
   -moz-border-radius: 50%;
   -webkit-border-radius: 50%;
  }
  
   .wrapper .carousel-indicators button{
         width: 10px;
   height: 10px;
   border: solid 1px white;
   background: #999;
   border-radius: 50%;
   -moz-border-radius: 50%;
   -webkit-border-radius: 50%;
   }
.heading{
    margin-top: 10rem;
    font-size: 13px;
}
.container{
    margin: 0 auto;
}
    
</style>