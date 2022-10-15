<template>

<HeaderShop></HeaderShop>
<toastsVue></toastsVue>
<div>
    <div v-if="hotel" class="page">
	
		<Hotelform
			  :hotel="hotel"
              @submit:hotel="updateHotel"
		/>
	</div>
    </div>
</template>

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
              msg:"Sửa sản phẩm thành công",
              type:"success",
              duration:2000
              },
        hotel: null,
    }
  },
	components: {
        HeaderShop,
	    Hotelform,
        toastsVue
	},
	methods: {
    toastjs,
    async gethotel(id) {
			try {
				this.hotel = await HotelService.get(id);
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
        async updateHotel(data) {
            try {
                await HotelService.update(this.hotel._id,data);
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
        this.gethotel(this.$route.params.id);
    }
};
</script>
