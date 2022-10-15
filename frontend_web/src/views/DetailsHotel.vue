<script>
    import HeaderShop from '@/components/HeaderShop.vue'
    import HotelService from '../services/Hotel.service'
    import CartService from '../services/Cart.service'
    import toastsVue from '../components/toasts.vue'
    import toastsjs from '../assets/js/toasts.js'
    import { mapState } from 'pinia'
    import { useAuthStore } from "@/stores/Auth.store";
    export default {
        data(){
            return{
                 detailhotel:[],
                 cartitem:{
                     userId:'',
                     productId : this.$route.params.id,
                     quantity : 1,
                     title:"",
                     img:"",
                     price:"",
                 
                   
                 },
                 carts:[],
                 toasts:{
                    title:"Success",
                    msg:"Thêm vào giỏ hàng thành công rồi",
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
            toastsVue
          
        },
        methods:{
            toastsjs,
            async gethotel(){
                try{
                 
                    this.detailhotel = await HotelService.get(this.$route.params.id);
                    this.cartitem.title = this.detailhotel.title ;
                    this.cartitem.img =this.detailhotel.img[0];
                    this.cartitem.price = this.detailhotel.price; 
                    console.log(this.cartitem);
                      
                
                  
                }catch(error){
                    console.log(error);
                   
                }
            },
            async getidcart(){
                this.cartitem.quantity=this.sub_quantity;
                var exitcart = false;
                
                try{
                    
                    this.carts = await CartService.get(this.currentUser._id);
                    this.cartitem.userId = this.currentUser._id;
                     this.carts.map((cartproduct)=>{
                             if(cartproduct.productId == this.cartitem.productId){
                                 this.cartitem.quantity+=cartproduct.quantity;
                                 CartService.update(cartproduct._id,this.cartitem);
                                 exitcart=true;    
                                 this.toastsjs(); 
                                 setTimeout(()=>{
                                     this.$router.push({name:'CartShop'});
                                 },1000);
                             }
                     })
                        if(exitcart === false){
                        this.cartitem.userId = this.currentUser._id;
                        CartService.create(this.cartitem);
                        this.toastsjs(); 
                        setTimeout(()=>{
                                this.$router.push({name:'CartShop'});
                            },1000);
                       }
                }catch(error){
                    this.toasts.title="Message",
                    this.toasts.msg="Bạn chưa đăng nhập!",
                    this.toasts.type="warn",
                    this.toasts.duration=3000,
                    this.toastsjs(); 
                    console.log(error);
                }
            },
        },
        created() {
            this.gethotel();
        },

    }
</script>
<template>
<div>
    <HeaderShop></HeaderShop>
    <toastsVue></toastsVue>
    <div class="heading">
        <div class="title">
            <nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
                <ol class="breadcrum">
                    <router-link class="breadcrumb-item" to="/"><a href="#">Trang chủ</a></router-link>
                    <router-link class="breadcrumb-item" to="/details/:id"><a href="#">Chi tiết sản phẩm</a></router-link>
                </ol>
            </nav>

        </div>
          <h3 style="font-size: 25px;  margin-left: 180px;font-weight: 600; width: 60%;color: palevioletred;">{{detailhotel.title}}</h3>
    </div>
    <div class="wrapper">
       
            <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
            <button  type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active " aria-current="true" aria-label="Slide 1"></button>
            <button  type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button   type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
       <div class="carousel-item"  v-for="(img,index) in detailhotel.img" :class="{active : index==0}" 
                          :key="img.id"
                        >
                            <img :src="img" class="d-block w-100" alt="..." style="border-radius: 8px;">
                            </div>
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden"><i class="fa-regular fa-chevron-left"></i>Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
            
    
            <div class="hotel-main">
              
                 <!-- <h6 class="name"> {{detailhotel.title}}</h6> -->
                <ul class="item">
                 


                    <li><span class="at"> Giá phòng:</span> <span class="price"> {{Intl.NumberFormat('de-DE',{style: 'currency',currency: 'VND'}).format(detailhotel.price)}}</span> </li>
                       <li style=" border-bottom: solid 1px rgba(0,0,0,.15);"><span  class="at"> Giới thiệu:</span> <span class="as"> {{detailhotel.desc}}</span> </li>
                     <li ><span  class="at"><img style="width: 20px;height: 20px;" src="@/assets/images/address.png" alt=""> Khu vực:</span> <span class="as"> {{detailhotel.area}}</span> </li>
                      <li ><span  class="at"><img style="width: 20px;height: 20px;" src="@/assets/images/send.png" alt=""> Địa chỉ:</span> <span class="as"> {{detailhotel.address}}</span> </li>
                     <li>
                        <span class="at" style="width:130px">Số lượng:</span> <span class="as" style="margin-left:50px;"> <input id="quantity" name="quantity" type="number" v-model="sub_quantity" style="width:30px"/></span>
                    </li>
                 </ul>   
                     <div class="btn_hotel">   
                        <div class="hotline">Hotline:
                            <span style="color:white; font-size: 18px"> 0947471182 </span>tư vấn miễn phí! 
                        </div>
                        <button type="submit" class="btn btn-danger"  @click="getidcart()">Đặt tour ngay</button>
                    
                    
                     </div>
            </div>  
    </div>
    <div class="tab">
          <ul class="nav "  role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Thông tin</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Bảng giá</button>
            </li>
           <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Bình luận</button>
        </li>
     
       
        </ul>
        <div class="tab-content" id="pills-tabContent">
        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0"> 
                <div v-html="detailhotel.infor"></div>

        </div>
        <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">   <div v-html="detailhotel.tableprice"></div></div>
       
        </div>

    </div>
  
   </div>
    
</template>
<style scoped>
.carousel-control-prev-icon {
    background-image: url(https://cdn-icons.flaticon.com/png/512/2985/premium/2985162.png?token=exp=1660294083~hmac=f5fb7fc4c7872a6d2b3d99b7f9508fec);
}
.carousel-control-next-icon {
    background-image: url(https://cdn-icons.flaticon.com/png/512/1549/premium/1549454.png?token=exp=1660294173~hmac=466ed628bf9eb7af31a4a6cc615dd44e);
}

.tab{
     margin-left: 60px;
}
.nav-item .nav-link{
   border-radius: 0;
   
    text-transform: uppercase;
    color: #151515;
    padding: 10px 27px;
    border: none;
    
    font: 400 14px/20px 'Roboto Condensed', sans-serif;
    margin: 0px;
    border-top: 4px solid #ff572200;
    margin-right: 3px;
}
.nav-item .nav-link:hover{
    
    color: #fff!important;
    background-color: #0079dab3!important;
    border: none;
    border-bottom-color: transparent!important;
    margin: 0px;
    border-top: 4px solid #ff5722;
    margin-right: 3px;
}
ul.nav {
    display: flex;
    flex-wrap: wrap;
     padding-left: 0; 
    margin-bottom: 10px;
    list-style: none;
     margin-left:45px ;
   
    
}
   #carouselExampleDark{
    width: 45%;
  
     overflow: hidden;
    margin-right:44px; 
    margin-bottom: 135px;
    
   }
   .wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
   
   }
    .w-100 {
    height: 350px;
    width: 100%!important;
    }
    .price{
        font-weight: 600;
        font-size: 20px;
       
        color: palevioletred;
        margin-left: 15px;
    }
    .btn_hotel{
        margin-top: 130px;
        height: 145px;
        background:linear-gradient(90deg,#ed0080 0,#be3b98 100%);
        padding: 10px; 
        
    }

    .hotline{
        color: white;
        font-size: 15px;
    }
    .at{
        width: 90px;
        float: left;
        font-weight: 700;
        font-size:14px;
    }
    .breadcrumb-item a {
            font-size: 18px;
            color: #333;
    }
   
    a{
        text-decoration: none;
    }
    
    ul.item{
        width: 100%;
        height: 216px;
        color: #333;
        font: 14px;
        padding: 0px 0px  0px 20px;

    }
    .breadcrum{
        display: flex;
        flex-wrap: wrap;
        font-size: 18px;
        padding-top: 5px;
        padding-bottom: 5px;
    
        padding-left: 14%;
    
        background: #fafafa;
        list-style: none;
    
    }
    .as{
         font-size: 15px;
        color: #333;
        margin-left: 2px;
        overflow: hidden;
       
    }
    .name{
        font-size: 18px;
   
    font-weight: 700;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: solid 1px rgba(0,0,0,.15);
    color: palevioletred;
    margin-left: 20px;
    }
    ul.item li{
    padding-bottom: 5px;
    margin-bottom: 8px;
    display: inline-table;
    width: 90%;
    /* border-bottom: solid 1px rgba(0,0,0,.15); */
    }
    .hotel-main{
        display: inline-block;
        width:395px;
        
    }
   
    .size_hotel,.color_hotel{
        display: flex;
        flex-direction: column;
        max-width: 400px;
    }
    .list_btn_size,.list_btn_color{
        margin:0 10px;
        display: flex;
        flex-wrap: wrap;
    }
    .list_btn_size button,.list_btn_color button{
        margin: 10px 5px;
    }
   
   
    .as1{
       color: #fff;
    font-size: 22px;
    font-weight:600 ;
    font-family: Arial;
    margin-bottom: 10px;
    font-weight: 600;
    }
   
    .img_hotel {
      width: 60%;
    
  
    }
    .heading{
        margin: 0px 0px;
    }
   
    .title{
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        height: 50px;
    }
    .sl{
        width: 500px;
    }
    .form-control{
        display: inline-block;
    }
    .btn-danger{
      width: 100%;
    height: 40px;
    background: #008fea;
    color: #fff;
    border: none;
    text-transform: uppercase;
    font-weight: 700;
    -webkit-transition: all .3s linear;
    -o-transition: all .3s linear;
    transition: all .3s linear;
    border-radius: 5px;
    margin-top: 50px;
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
  
</style>