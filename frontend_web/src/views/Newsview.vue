<script>
    import SliderShop from '@/components/SliderShop.vue'

    import HeaderShop from '@/components/HeaderShop.vue'
    import { mapState } from "pinia";
    import { useAuthStore } from "@/stores/Auth.store";
    import toastsVue from '../components/toasts.vue';
    import NewsService from "../services/News.service";
    import { array } from 'yup/lib/locale'
    import { list } from 'postcss';

    
    
    export default {
         data:() =>{
            return {
              news:[],

            }
        },
        components:{
            HeaderShop,
            SliderShop,
        

            toastsVue,

},
        computed: {
            ...mapState(useAuthStore,{
                currentUser: "user",
            }),
    },
        methods:{
            async getnews(){
                try {
                    this.news=  await NewsService.getAll();
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
            
        },
        mounted() {
            this.getnews();
        },
       
        
      
    }
</script>
<template>
<div>
    <div class="header">
        <HeaderShop></HeaderShop>
      </div>
      
      <toastsVue></toastsVue>
     <div class="slider">
        <SliderShop/>
    </div>  
     <div class="heading">
            <h3 class="title">Tin Tức Du Lịch</h3>
     </div>
     <div v-for="new1 in news"
        :key="new1._id"
        class="details"
        >
            <router-link :to="{
                        name: 'news',
                        params: { id: new1._id },
                            }">
                <strong style="display: inline-block;">
                    <img :src=new1.img[0] style="width: 200px;margin: 0px 10px;border-radius: 15% ;height: 140px; " alt="">
                </strong>     
                <span style="margin-top: 20px; width: 25rem;height:70px;display: inline-block;color:#3d1552 ;font: 400 13px/18px 'Roboto', sans-serif;">{{new1.title}}</span>
            
                    
            </router-link>

    </div>

    

        
        
 </div>
</template>  
<style scoped>
.title{
   
    text-transform: uppercase;
    color: #8ed13d;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
}
.details{
   margin-top: 4rem;
   display:flex;
    width: 50rem;
    height: 180px;
    overflow: hidden;
    margin-left: 3rem;


   
}
span:hover{
    color: #8ed13d;
}



</style>