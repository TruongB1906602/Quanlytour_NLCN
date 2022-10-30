
<script>
import toastjs from "../assets/js/toasts";
import toastsVue from "../components/toasts.vue";
import NewsService from "../services/News.service";
import HeaderShop from "../components/HeaderShop.vue";
import Newsform from "@/components/Newsform.vue";
export default {
  data(){
    return {
         toasts:{
              title:"Success",
              msg:"Thêm sản phẩm thành công",
              type:"success",
              duration:2000
              },
    }
  },
  components: {
    HeaderShop,
    Newsform,
    toastsVue
    },
	methods: {
    toastjs,
        async addnews(data) {
            try {
                await NewsService.create(data);
                this.toastjs();
                setTimeout(()=>{
                  location.reload();
                },2000);
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
<div>

<toastsVue></toastsVue>
	<div class="page">
		<div>
			
			<Newsform
				:news="{img:[]}"
                  @submit:news="addnews"
                 :resetAfterSubmit="false"
			/>
		</div>
	</div>
  </div>
</template>
