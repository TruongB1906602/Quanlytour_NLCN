<script>

    import HeaderShop from '@/components/HeaderShop.vue'
    import ProductService from '../services/Product.service'
    import CartService from '../services/Cart.service'
    import OrderService from '../services/Order.service'
    import toastsVue from '../components/toasts.vue'
    import toastsjs from '../assets/js/toasts.js'
    import { mapState } from 'pinia'
    import { useAuthStore } from "@/stores/Auth.store";
    
    export default {
        data(){
            return{
                 detailproduct:[],
                 orders:[],
                 cartitem:{
                     userId:"",
                     productId :this.$route.params.id,
                     quantity : 1,
                     title:"",
                     img:"",
                     price:"",
                     newprice:"",
                     childprice:"",
                     adultquantity:"",
                     childquantity:"",
                     empty:"",
                     startdate:""
                
                 },
              
                 carts:[],
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

            async getproduct(){
                try{
                 
                    this.detailproduct = await ProductService.get(this.$route.params.id);
                    this.orders = await OrderService.getAll();
                    console.log(this.orders)
                    this.cartitem.title = this.detailproduct.title;
                    this.cartitem.img =  this.detailproduct.img[0];
                    this.cartitem.price = this.detailproduct.price; 
                    this.cartitem.newprice = this.detailproduct.newprice; 
                    this.cartitem.childprice = this.detailproduct.childprice; 
                    this.cartitem.childquantity = this.detailproduct.childquantity; 
                    this.cartitem.adultquantity = this.detailproduct.adultquantity; 
                    this.cartitem.empty = this.detailproduct.empty; 
                    this.cartitem.startdate = this.detailproduct.startdate; 
                
                  
                }catch(error){
                    console.log(error);
                   
                }
            },
            async getidcart(){
                this.cartitem.quantity=this.sub_quantity;
                var exitcart = false;
                
                
                try{
                    this.carts = await CartService.get(this.currentUser._id);
                  console.log(this.currentUser._id );
                    if(this.carts.length== '0' && this.currentUser){
                            if(this.detailproduct.empty > '0'){
                                console.log(this.carts.userId );
                          this.cartitem.userId= this.currentUser._id;
                           console.log(this.detailproduct.title);
                
                            this.carts.map((cartproduct)=>{
                                    if(cartproduct.productId == this.cartitem.productId ){
                                        this.cartitem.quantity = this.cartitem.quantity + cartproduct.quantity;
                                    
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
                            
                            } else{
                                     this.toasts.title = "Warning",
                                    this.toasts.msg="Số tour đã hết chỗ!Bạn vui lòng đặt tour khác",
                                    this.toasts.type = "warn",
                                    this.toasts.duration=2000
                                    this.toastsjs(); 
                            }
                        
                    } 
                   
                
                        else{
                            this.toasts.title = "Warning",
                            this.toasts.msg="Bạn đang có tour đang được chờ phê duyệt!",
                            this.toasts.type = "warn",
                            this.toasts.duration=2000
                            this.toastsjs();   
                        }
                
                   
                }catch(error){
                        console.log(error);
                        this.toasts.title = "Warning",
                            this.toasts.msg="Bạn chưa đăng nhập!",
                            this.toasts.type = "warn",
                            this.toasts.duration=1000
                            this.toastsjs();   
                        
                }
                
            },
        },
        created() {
            this.getproduct();
        },

    }
</script>
<template>
<div>
    <HeaderShop></HeaderShop>
    <toastsVue></toastsVue>
    <div class="heading">
        <div class="title">
            <nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http:://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
                <ol class="breadcrum">
                    <router-link class="breadcrumb-item" to="/"><a href="#">Trang chủ</a></router-link>
                    <router-link class="breadcrumb-item" to="/details/:id"><a href="#">Chi tiết sản phẩm</a></router-link>
                </ol>
            </nav>

        </div>
          <h3 style="font-size: 22px;  margin-left: 220px;font-weight: 700; width: 60%; margin-top: 3rem;;">{{detailproduct.title}}</h3>
    </div>
    <div class="wrapper">
        <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
            <button  type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active " aria-current="true" aria-label="Slide 1"></button>
            <button  type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button   type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
       <div class="carousel-item"  v-for="(img,index) in detailproduct.img" :class="{active : index==0}" 
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
            <div class="product-main">
              
                 <h5 class="name"> {{detailproduct.title}}</h5>
                <ul class="item">
                    <li><span class="at"> Điểm khởi hành: </span> <span class="as">{{detailproduct.destination}} </span></li>
                    <li><span class="at"> Ngày đi: </span>  <span class="as">{{detailproduct.startdate}} </span></li>
                    <li><span class="at">Ngày về: </span>  <span class="as">{{detailproduct.enddate}}</span></li>
                    <li><span class="at"> Giá cũ:</span> <span class="as"> <del>{{Intl.NumberFormat('de-DE',{style: 'currency',currency: 'VND'}).format(detailproduct.price)}}</del></span> </li>
                    <li> <span class="at">Giá mới: </span>  <span class="as as1"> {{Intl.NumberFormat('de-DE',{style: 'currency',currency: 'VND'}).format(detailproduct.saleprice)}}</span></li>
                     <li> <span class="at">Số tour còn: </span>  <span class="as"> {{detailproduct.empty}}</span></li>
                     <li>
                        <span class="at" style="width:130px">Số lượng:</span> <span class="as" style="margin-left:50px;"> <input id="quantity" name="quantity" type="number" v-model="sub_quantity" style="width:30px"/></span>
                    </li>
                 </ul>   
                     <div class="btn_product">   
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
                <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Tổng Quan</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Lịch Trình</button>
            </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
        <div class="tab-pane fade show active desc" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0"> 
                 <div v-html="detailproduct.desc"></div>
        

        </div>
        <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">   <div v-html="detailproduct.schedule"></div></div>
        <div class="tab-pane fade" id="pills-note" role="tabpanel" aria-labelledby="pills-note-tab" tabindex="0"><div v-html="detailproduct.note"></div>
       
         </div>
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
.desc{
    width:800px;
    margin-left:50px;
}
.tab{
     margin-left: 80px;
     border: none;
     padding: 30px;
     background: #ffffff;
     box-shadow: 0px 8px 8px rgb(0 0 0 / 3%);
     border-radius: 16px;
    
     width: 70%;
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
    height: 360px;
    width: 100%!important;
    }
    .btn_product{
        margin-top: 88px;
        height: 145px;
        background:linear-gradient(90deg,#ed0080 0,#be3b98 100%);
        padding: 20px; 
        
    }
        .hotline{
        color: white;
        font-size: 15px;
    }
    .at{
        width: 130px;
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
        width: 345px;
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
         font-size: 14px;
        color: #333;
        margin-left: 50px;
        overflow: hidden;
    }
    .name{
   font-size: 16px;

    font-weight: 700;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: solid 1px rgba(0,0,0,.15);
    color: palevioletred;
    margin-left: 15px;
    }
    ul.item li{
    padding-bottom: 5px;
    margin-bottom: 8px;
    display: inline-table;
    width: 90%;
    border-bottom: solid 1px rgba(0,0,0,.15);
    }
    .product-main{
         display: inline-block;
         width:335px;
         border-bottom: solid 1px rgba(0,0,0,.15);
         border-right: solid 1px rgba(0,0,0,.15);
         border-left: solid 1px rgba(0,0,0,.15); 
       
    }
   
    .size_product,.color_product{
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
   
    .btn{
        width: 100px;
    }
    .as1{
          color: red;
       font-size: 17px;
    line-height: 40px;
    font-weight: 700;
    margin-right: 5px;
    }
    del{
        color: red;
       font-size: 18px;
    line-height: 40px;
    font-weight: 700;
    margin-right: 5px;

    }
    
    .img_product {
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
    .empty{
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
  
   
  
    
</style>