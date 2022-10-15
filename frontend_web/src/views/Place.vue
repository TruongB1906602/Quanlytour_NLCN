<script>
    import SliderShop from '@/components/SliderShop.vue'
 
    import Ad from '@/views/Ad.vue'
    import HeaderShop from '@/components/HeaderShop.vue'
    import ProductService from '../services/Product.service'
    import { mapState } from "pinia";
    import { useAuthStore } from "@/stores/Auth.store";
    import toastsVue from '../components/toasts.vue';
  
import { array } from 'yup/lib/locale'
 
    export default {
       
          props:{
            title:  String,
          },
         data:() =>{
            return {
              
                Products:[],
                  
            }
        },
        components:{
        //   HeaderShop,
        //   SliderShop,
        //      Ad,
            toastsVue,


},
        computed: {
          
            ...mapState(useAuthStore,{
                currentUser: "user",
            }),
           
    },
        methods:{
          
             async retrieveProduct() {
            try {
                this.Products = await ProductService.getAll();
            } catch (error) {
                console.log(error);
                }
            },          
        },
       
        
        mounted() {
        this.retrieveProduct();
        },
    }
</script>
<template>
      <div>
        <div class="header">
        <HeaderShop></HeaderShop>
      </div>
      <toastsVue></toastsVue>
   
    <div class="ad">
        <Ad></Ad>
    </div>  
    




<div>
    
     <div id="products" class="box">
       
		    <div class="main-heading">
                    <p class="heading">Top địa điểm HOT</p>
                    <p class="heading1">Top những nơi nổi bật mới nhất nên khám phá</p>
             </div>
        <div v-if="title ==='Phú Quốc'">   
		<div class="product-list">
           
			<div
				v-for="item in Products"
               :key="item.destination"
                v-show="item.destination === 'Phú Quốc'"
				class="product-list--item"
                
			 >

            
               <div class="product-items">
              
                    <div class="val">
                        <div class="product-item">
                                <div class="btn-arrow">
                                  
                                </div>
                              <div class="wrapper-img">
                               
                                 <div class="image_slider">
                                  
                                     <div class="image_item" v-for="img in item.img"
                                     :key="img"
                                   
                                     >  
                                    
                                     <img :src="img" class="card-img-top" alt="...">
                                   
                        </div>
                         
                    </div>
                </div>
                         
                         
                        <div class="product-item-text">
                            
                               <div class="image">
                            
                               
                                    <h1> {{ item.title }} </h1>
                                     
                                         <div class="rate-price">
                                            <a  class="star" id="ion" >
                                                    <ion-icon name="star"></ion-icon>
                                                    <ion-icon name="star"></ion-icon>
                                                    <ion-icon name="star"></ion-icon>
                                                    <ion-icon name="star"></ion-icon>
                                                    <ion-icon name="star"></ion-icon>
                                                </a>
                                             
                                         </div>  

                                        <div class="city">
                                            <a href="">
                                                 <span class="txt"><img src="@/assets/images/way.png" alt="">
                                                Thành Phố: {{item.destination }}</span>
                                              </a>  
                                        </div>
                                           
                                        
                                </div>
                           
                          
                            </div>
                         
                        
                        </div>
                       
                         <div class="cartadd">
                    
                                <router-link :to="{
                                    name: 'details',
                                    params: { id: item._id },
                                        }">
                                    <button type="button" class="btn btn-outline-dark" @click="nextdetailsproduct">Chi tiết</button>
                                </router-link>
                                 <span class="price">{{item.price }}VNĐ</span>
                         </div>
                        
                       </div>
                   
                 
				
				
			</div>
		</div>
	
	 </div>
     </div>  
    
 
   
       
       
    
   </div>
</div>
 
      </div>
</template>
<style scoped>   
.btn-arrow button ion-icon{
    font-size: 30px;
    color: gray;



}
.btn-arrow button{
    position: absolute; 
    width: 30px;
    height: 30px;
    top: calc(28% - 20px);
    border: none;
    background-color:white ;
    opacity: 90%;
    border-radius: 100%;

   

}
.btn-arrow button:hover{
      display: inline-block;
}
.btn-arrow:active, .btn-arrow:hover{
    outline:none;
    cursor: pointer;
}
.next{
    right: 0;
}
.prev{
    left: 0;
}


.price{
    font-size: 18px;
    font-weight: 600;
    line-height: 21px;
}
.main-heading{
    width:300px;
    margin-left:220px ;
}
.heading{
    color: #1A202C;
    font-family: Mt;
    font-size: 29px;
    font-weight: 600;
    line-height: 29px;
}
.heading1{
    font-weight: 400;
    font-family: Mt;
    color: #4A5568;
    margin: 8px 0;
    font-size: 16px;
    line-height: 17px;
}
.product-list {
	padding: 15px;
	display: flex;
	justify-content: center;
	align-content: center;
	flex-wrap: wrap;
	width: 100%;	
    margin-left: 50px;
		
}

#ion{
    font-size: 20px;
    float: left;
    color: yellow;
    margin-left: 10px;
   
    

}
.product-list--item {
	padding: 10px 0px;
     width:320px; 
	 
}

.product{
    margin-top: 20px;
}

  .product-item-text h1 {
    margin-right: 10px;
    margin-left: 10px;
   font-size: 18px;
    font-family: Mt;
    font-weight: 600;
    line-height: 20px;


   } 
   .product-item-text h2 {
    font-family: Arial, Helvetica, sans-serif;
    color:red  ;
    font-size: 13px;
    font-family: sans-serif;
   margin-bottom: 18px;
    border:1px solid white;

   } 
   .container{
       max-width:900px;
       margin: auto;
       position: relative;
       height: 250px;
      
   }
   .product-items{
    position: relative;
	display: inline-block;
    width: 280px;
    padding: 0px;
    box-sizing: border-box;
    box-shadow: 1px 3px 3px 0px #0000001a; 
    border-radius: 5px; 
    height: 370px;
     
    
   }
   .product-item{
     
        display: inline-block;
        background: #fff;
        text-align: center;
         transition: transform linear 0.1s;
         will-change: transform;
        height:315px;
   }
   #picture{
       width: 100%;
       margin-bottom: 10px;
       height: 180px;   
   }
   .product-item-text{
     font-size: 13px;
      display: block;
       
   }
  
   .product-item .cartadd{
       text-decoration: none;
       text-transform: uppercase;
       text-align: center;
       cursor: pointer;

           color: #fff;
           padding: 10px 0px;
           position: absolute;
           width: 100%; 
           bottom: 46px; 
           transition: 0.25s ease-in-out;
           border: none;
           opacity: 80%;
           
           
   }.rate-price{
    height: 30px!important ;
   }
   .product-item-text .rate-price img{
    height: 20px;
    width: 69px;
    
    
   }
   .product-item:hover > .cartadd{
       bottom: 50px;
       background-color: #ED1C24; 
       right: 0;
       left: 0;
   }
   .rate-price{
    height: 70px;
   
   }
.txt{
    margin-left: 10px;
    display: flex;
    font-size: 14px;
    font-family: sans-serif;
    float: left;
    padding: 2px;
   
}
.product-item-text .image img{
  
    display: inline-block;
    width: 15px;
    height: 15px;
    background-position: -78px -28px;
    vertical-align: middle;
    margin-top: 10x;
    margin-right: 7px;

    color: #1081e0;
    
}
.icon1{
  display: inline-block;
  
}
  
.search-box{
    position: absolute;      
    top: 20px;
    transform: translateX(-100%);
    background: whitesmoke;
    border-radius: 40px;
    padding: 2px; 
    height: 5  0px;
    border: 1px solid gray
 }
 .search-btn{
     color: #e84118;
       float: right; 
     width: 40px;
     height: 40px;
     display: flex;
     justify-content: center;
     align-items: center;
 }
 .search-txt{
     border:none;
     background: none;
     outline: none;
      float: left; 
      padding: 0;
      color: white;
     font-size: 16px;
     transition: 0.4s;
     line-height: 40px;
     width: 0px;

 }
 .header-left{      
    width: 100%;
    height: 50px;
    background-color: #001C40;
}
.header{
 
  display: inline-block;
  z-index: 2;
  width: 100%;
  height: 20px;
  
}
.header-right{
    width: 100%;
    height: 350px;
    display: flex;
    border: 3px solid gold;
}
.header-right ul{
    display: flex;
     margin: 0 0;
     padding: 0 0;

} 
.header-right ul li{
    list-style: none;
    text-decoration: none;
    font-family: sans-serif;
}
a.logo{
    width: 20%;
    height: 90px;
}
.logo img{
   width: 90%;
   height: 90%;
   margin-left:  15px;

}

.header .header-left ul li img{
    height: 20px;
    width: 20px;
    margin-left: 30px;
    margin-top: 12px;  
    margin-right: 10px;
    color: aqua;

}

.header .header-left  ul li a{
     text-decoration: none; 
     position: relative;
     bottom: 5px;
     color: white;
}
.header .header-left  ul{
    margin-left: 20px;
}
.header .header-left ul li{
    display: inline-block;
    margin: 0px 20px 0px 10px;
    color: white;
}
.right-nav{
    width: 700px;
    display: flex; 
    justify-content: center;
    align-items: center;
}
ul.left{
 margin-top: 8px;
 margin-bottom: 0px;
 width: 50%;
 display: inline-block;
}
ul.right{
  float: right;

}
.header .header-left  ul li a{
     text-decoration: none; 
     bottom: 5px;
     color: white;
}
ul.right a.right-1{
  font-size: 16px;
  position: absolute;
  border: 1px solid gray;   
}
ul.right i{
    margin-right: 10px;
    margin: 17px 5px;
}
.header .header-left  ul{
    margin-left: 20px;
  
}
.header .header-left ul li{
    display: inline-block;
    margin: 0px 20px 0px 10px;
    color: white;
}
.price{
   
  font-size: 18px;
  color: red;
  float: right;



}
.nav-right {
    height: 90px;
    background: white;
    box-shadow: 0 3px 15px rgb(0 0 0 / 40%);
    display: flex;
    z-index: 3;
    width: 100%;
    position: fixed;
    top: 40px;
}
.right-nav ul{
    width: 750px;
}
.right-nav li{
     margin: 25px 25px; 
     padding-top: 20px;
}
.header-right ul li a{
    text-decoration: none;
    font-size: 16px;
    font-family: "Josefin Sans"  sans-serif;
    color: #111;
}

 .wrapper-img{
        width: 100%;
        height: 50%;
        overflow: hidden;
    }
    .image_slider{
       display: flex;
       transition: all .8s ease;
       
    }
 /* .image_slider:hover{ 
       transform: translateX(-100%);
    }  */
   .image_item{
       flex: 1 0 100%;
   }
.carousel-item{
    height: 350px;
}
 h6{
    font-size: 16px;
    margin-top: 20px;
    margin-left: 65px;
    
 }  
 .navi-left{
    background: white;
    height: 45px;
    width: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    border-radius: 100px;
    box-shadow: rgb(0 0 0 / 10%) 0px 8px 12px;
    cursor: pointer;
    position: absolute;
    top: 30%;
    transform: translate(-50%, -50%);
    left:13%;
 }
 
 .navi-right{
    background: white;
    height: 45px;
    width: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    border-radius: 100px;
    box-shadow: rgb(0 0 0 / 10%) 0px 8px 12px;
    cursor: pointer;
    position: absolute;
    top: 28%;
    transform: translate(-50%, -50%);
    right:12%;
 }
 .navi-left img{
    margin-left: 35px;
     width: 15px;
    
 }
 
 .navi-right img{
    margin-right: 35px;
     width: 15px;
    
 }
 .carousel-item .col-lg-4{
   
    width: 200px;
    height: 250px;
    
  
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
      
       
    }
   .carousel-item .col-lg-4 img{

    height: 150px;
   
    background: #999;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
   }

.w-100 {
     width: 85%!important; 
}


.row {
  display: flex;
  justify-content: center;
  align-content: center;
}

</style>