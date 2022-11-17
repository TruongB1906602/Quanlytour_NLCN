<script>

import ProductService from "../services/Product.service";
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
                 search:'',
            }
        },   
        props:{
            products:Array,
            refeshlist:Function,
            activeIndex: { type: Number, default: -1 },
        },
       
	emits: ["update:activeIndex"],
  
   
        methods:{
            toastjs,
            async delproduct(id){
                swalert
				.fire({
					title: "Xóa tour",
					icon: "Warning",
					text: "Bạn có muốn xóa tour này?",
					showCloseButton: true,
					showCancelButton: true,
				})
				.then(async (result) => {
					if (result.isConfirmed) {
						try {
                            await ProductService.delete(id);
                            setTimeout(()=>{
                               location.reload();
                             },2000);
						} catch (error) {
							console.log(error);
						}
					}
				});
                },
            updateActiveIndex(index) {
			this.$emit("update:activeIndex", index);
		    },

           
        },
        computed:{
            filterProductsByName() {
                  return this.products.filter(product => {
                  return product.title.toUpperCase().match(this.search.toUpperCase());
                  
                 
                 })
            },
            filterProductsByName() {
                  return this.products.filter(product => {
                    return product.title.toLowerCase().match(this.search.toLowerCase());
                 
                 })
            }
        }
    }
</script>
<template>
    <div >
            <div class="form-search">
                <form action="" class="form-inline">
                    <h5 class="search"> <label for="">Tìm kiếm</label>  </h5>
                    <input type="text" class="form-control" v-model="search">
                  
                </form>
            </div>  


     <div class="container">
                <div class=" row-cols-1">
                    <h4 class="heading" >Tên tour</h4>
                    <div class="title"  v-for="product in filterProductsByName"
                                        :key="product._id"
                    >
                    
                            <span>{{product.title}}</span>
                    </div>
                    
                </div>
               
                    
                    <div class=" row-cols-1" >
                    <h4 class="heading">Ngày đi</h4>
                    <div  class="date" v-for="product in filterProductsByName"
                        :key="product._id"
                    
                    >
                        <span>{{product.startdate}}</span></div>
                    
                    </div>
                    <div class=" row-cols-1" >
                    <h4 class="heading">Số chổ còn</h4>
                    <div  class="sl" v-for="product in filterProductsByName"
                        :key="product._id"
           
                        >
                            <span>{{product.empty}}</span></div>
                        
                        </div>
                        <div class=" row-cols-1" >
                        <h4 class="heading">Ảnh</h4>
                        <div  class="images" v-for="product in filterProductsByName"
                            :key="product._id"
                        
                        >
                                    <img :src=product.img[0] style="width: 110px; height:60px; margin: 0px 5px;" alt="">
                                </div>
                            
                            </div>
                            <div class=" row-cols-1" >
                            <h4 class="heading">Chức năng</h4>
                            <div  class="btn list-group-item product-item d-flex" v-for="(product, index) in filterProductsByName"
                            
                                :key="product._id"
                                @click="updateActiveIndex(index)"
                            
                             >
                                <button class=" btn-outline-danger btn-sm" @click="delproduct(product._id)"><ion-icon name="close-circle-outline"></ion-icon></button>
                            
                                      <button  class=" btn-outline-danger btn-sm">
                                        <router-link
                                    :to="{
                                    name: 'editproduct',
                                    params: { id: product._id },
                                    
                                        }"
                                    >
                                    
                                    <ion-icon name="create-outline"></ion-icon>
            
                                       
                                    </router-link>
                                      </button>
                                </div>
                                </div>
                        </div>
                        </div>
 </template>
<style scoped>
  
 .title:hover{
      background-color: #0d6efd;
        color: azure;

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
.sl{
    height:80px;
    font-weight: 500;
    font-size: 14px;
    padding: 14px;
    width: 100px;
    border: 1px solid #dee2e6;
    background: white;
      
}
.price{
     border: 1px solid #dee2e6;
    height: 80px;
    font-size: 14px;
    width: 100px; 
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
 
}
.date{
    border: 1px solid #dee2e6;
    height: 80px;
    font-size: 14px;
     font-weight: 500;
    /* width: 30%; */
      width: 100px; 
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
.form-search{
    font-weight: 400;
    
    white-space: nowrap;
    text-align: left;
    background: white;
    color: black;
    padding: 5px;
    margin-right: 30px;
    width: 300px;
    float: right;
    border-radius: 0.357rem;
    border: 1px solid #ddd;
   margin-bottom: 20px;
}
.form-inline input{
    width: 70%;
    margin-left: 10px;
    height: 30px;
    display: inline-block; background-color: #f1f1f1;
}
.search{
    display: inline-block;
    font-size: 15px;
   
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