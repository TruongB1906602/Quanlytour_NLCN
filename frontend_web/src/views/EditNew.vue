<template>
   
    <div>
        <toastsVue></toastsVue>
        <div v-if="news" class="page">
        
            <Newsform
                  :news="news"
                  @submit:news="updateNews"
            />
        </div>
        </div>
    </template>
    
    <script>
    import toastjs from "../assets/js/toasts";
    import toastsVue from "../components/toasts.vue";
    import NewsService from "../services/News.service";

    import Newsform from "../components/Newsform.vue";
    export default {
      data(){
        return {
             toasts:{
                  title:"Success",
                  msg:"Sửa sản phẩm thành công",
                  type:"success",
                  duration:2000
                  },
            news: null,
        }
      },
        components: {
       
            Newsform,
            toastsVue
        },
        methods: {
        toastjs,
        async getnews(id) {
                try {
                    this.news= await NewsService.get(id);
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
            async updateNews(data) {
                try {
                    await NewsService.update(this.news._id,data);
                    this.toastjs();
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
        created(){
            this.getnews(this.$route.params.id);
        }
    };
    </script>
    