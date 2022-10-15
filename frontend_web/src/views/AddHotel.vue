
<script>
import toastjs from "../assets/js/toasts";
import toastsVue from "../components/toasts.vue";
import HotelService from "../services/Hotel.service";
import HeaderShop from "../components/HeaderShop.vue";
import Hotelform from "../components/Hotelform.vue";
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
    Hotelform,
    toastsVue
    },
	methods: {
    toastjs,
        async addhotel(data) {
            try {
                await HotelService.create(data);
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
<HeaderShop></HeaderShop>
<toastsVue></toastsVue>
	<div class="page">
		<div>
			<h4>Thêm sản phẩm</h4>
			<Hotelform
				:hotel="{img:[]}"
        @submit:hotel="addhotel"
        :resetAfterSubmit="false"
			/>
		</div>
	</div>
  </div>
</template>
