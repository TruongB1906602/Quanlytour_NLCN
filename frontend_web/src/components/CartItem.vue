<script>
import CartService  from '../services/Cart.service';
import toastsVue from '../components/toasts.vue';
import toastsjs from '../assets/js/toasts.js'
import PayService from '../services/Pay.service';
     export default{
        data(){
            return{
                adultquantity:"",
                childquantity:"",
                products:[],
                detailproduct:[],
                toasts:{
              title:"1",
              msg:"",
              type:"",
              duration:0
              },
             
            }
        },
        props:{
            title:String,
            refeshlistcart:Function,
            carts:[],
        },
        emit:[
            "deleted:cartIndex"
        ],
        components:{
            toastsVue,
        },
        methods:{
            async registerproduct(){
        try{
          this.pays =  await PayService.get(this.$route.params.id);
             console.log(this.pays)
          
          }catch(error){
            console.log(error);
          }
       
         if(this.carts.length > 0){
          this.toasts.title = "Thành công",
          this.toasts.msg = "Đã cập nhật",
          this.toasts.type = "success",
          this.toasts.duration=1000
        

              this.$router.push("/Cart/addpay")

        
  
       
         }else{
              this.toasts.title = "Failed",
              this.toasts.msg = "Bạn chưa có sản phẩm",
              this.toasts.type = "error",
              this.toasts.duration=2000,
              this.toastsjs();
         }
       },  
      async getdata(){
        console.log(this.carts)
         for(var i in this.carts){
            this.carts[i]= await  CartService.update(this.carts[i]._id,{childquantity: this.childquantity });
            this.carts[i]=  await CartService.update(this.carts[i]._id,{adultquantity: this.adultquantity });
     
             }
      },
       async deletedcart(index,id){
        var newsl;
            this.$emit("deleted:cartIndex",index)

            console.log(id);
          
            
        },
      
        
       
    },

    computed: {
        priceFormat(){
            var number;
              for(var i in this.carts){
             number=this.carts[i].price;
           }
                return new Intl.NumberFormat('de-DE',{style: 'currency',currency: 'VND'}).format(number);
        },
      
        total(){
           var total=0;
        
           for(var i in this.carts){
              total+=( this.carts[i].price * this.carts[i].adultquantity) + (this.carts[i].childprice* this.carts[i].childquantity);
          
           }
            return  total;
        }   
    },
    
    
}
</script>
<template>
   <div class="row" 
      v-for="(item,index) in carts"
      :key="item._id"

      >
          <div class="col-md-2 col-lg-2 col-xl-2">
            <img :src="item.img"
                class="img-fluid rounded-3" alt="">
            </div>
            <div class="col-md-6 col-lg-6 col-xl-6">
                 <div class="title">
                    <p class="text"><img src="https://cdn-icons-png.flaticon.com/512/8346/8346762.png" alt="">{{item.title}}</p>
                 </div>
                    <div>
                         <p class="text"><img src="https://cdn-icons-png.flaticon.com/512/919/919790.png" alt="">Giá: <span style="font-size: 14px; color:black">{{  Intl.NumberFormat('de-DE',{style: 'currency',currency: 'VND'}).format(item.price) }}/người </span></p>  
                        <p class="text"><img src="https://cdn-icons-png.flaticon.com/512/3127/3127363.png" alt="">Số chổ còn: <span style="font-size: 14px; color:black">{{item.empty}}</span></p> 
                        
                     </div>
            </div>

            
            <div class="delcart">
                <button type="button" @click="deletedcart(index,item.productId)" class="text-muted btn btn-exit"><img src="@/assets/images/del.png" alt=""></button>
            </div>
            <hr>     
            
            
           
         <div class="container"   v-if="this.title !='1' ">
            <h4 class="quote">Bảng giá</h4>
            <div class="row">
                <div class="col title" >Loại khách</div>
                <div class="col title">Số tiền</div>
                <div class="col title">Số khách</div>
                <div class="w-100"></div>
                <div class="col">Người lớn</div>
                <div class="col">{{Intl.NumberFormat('de-DE',{style: 'currency',currency: 'VND'}).format(item.price)}}</div>
                <div class="col"><input type="number" placeholder="Nhập vào số lượng" v-model="adultquantity"></div>
                <div class="w-100"></div>
                <div class="col">Trẻ em</div>
                <div class="col">{{Intl.NumberFormat('de-DE',{style: 'currency',currency: 'VND'}).format(item.childprice)}}</div>
                <div class="col"><input type="number" placeholder="Nhập vào số trẻ em" v-model="childquantity"></div>
            </div>
         </div>
         <div class="container" 
         v-if="this.title=='1'  ">
            <h4 class="quote">Bảng giá</h4>
            <div class="row">
                <div class="col title" >Loại khách</div>
                <div class="col title">Số tiền</div>
                <div class="col title">Số khách</div>
                <div class="w-100"></div>
                <div class="col">Người lớn</div>
                <div class="col">{{Intl.NumberFormat('de-DE',{style: 'currency',currency: 'VND'}).format(item.price)}}</div>
                
                <div class="col"><input type="number" placeholder="Nhập vào số lượng" v-model="item.adultquantity" disabled ></div>
                <div class="w-100"></div>
                <div class="col">Trẻ em</div>
                <div class="col">{{Intl.NumberFormat('de-DE',{style: 'currency',currency: 'VND'}).format(item.childprice)}}</div>
                <div class="col"><input type="number" placeholder="Nhập vào số trẻ em" v-model="item.childquantity" disabled></div>
            </div>
           
         </div>
         
            <div class="total" >
                <h5 class="price">Thành tiền</h5><span style="font-size:25px; font-weight:600;">{{Intl.NumberFormat('de-DE',{style: 'currency',currency: 'VND'}).format(total)}} </span>
                <!-- <ul    v-show="title  == '1'" >
                    <li @click="payment">
                        <input type="radio" id="html" name="fav_language" value="HTML" checked="checked">
                        <label for="html" name="fav_language" value="HTML">Thanh toán chuyển khoản ngân hàng</label>
                        <div  class="payment-box1" style="display:block;">
                                    <p>
                                        Thực hiện thanh toán chuyển khoản ngay vào tài khoản ngân hàng của chúng tôi. Đơn hàng sẽ chuyển giao sau khi tiền đã chuyển tiền thành công.
                                    </p>
                        </div>
                    </li>
                    <li @click="payment1">
                        <input type="radio" id="css" name="fav_language" value="CSS">
                        <label for="css">Trả tiền mặt khi nhận PHIẾU SỬ DỤNG</label>
                        <div class="payment-box2" style="display:none;">
                                    <p>
                                    Trả tiền mặt khi giao hàng, Du lịch Travel Việt sẽ gửi đến bạn phiếu xác nhận đặt tour, chúng tôi sẽ thu phí nhỏ thôi!.
                                    </p>
                        </div>
                    </li>
                    
                </ul> -->
                  
            </div> 
            
            <div class="btn-order" @click="registerproduct"  
               v-show="title !== '1'"
            >
            <button @click="getdata" >Thanh toán</button>
       
        </div>
    </div>      
      
</template>
<style scoped>
.price{
    margin-top: 20px;
   width: 450px;
    
   display: inline-block;
  
}
.quote{
        margin-top: 20px;
    }
    .title{
        font-weight: 500;
    
    }
    .delcart{
        width: 10px;
        display: inline-block;
        margin-left: 140px;
    }
    .btn-order button{
         width: 100%;
        height: 45px;
        line-height: 45px;
        padding: 0 15px;
        outline: none;
        border: 1px solid #3275fc;
        font-weight: 600;
        font-size: 15px;
        background: #3275fc;
        color: white;
       
    }
   .delcart img{
    width: 25px;
    height: 25px;
    
   
   }
   .col{
    padding: 10px;
    height: 50px;
    border: 1px solid grey;
    border-left: none;
    border-right:none ;
   }
    .text{
    font-size: 1apx;
    font-weight: 500;
    line-height: 19px;
    color: black;
    margin-bottom: 4px;
      
   }
   .img-fluid {
    width: 120px;
    height: 85px;
    margin-bottom: 10px;
   }
   .title p img{
    width:20px;
   }
   
   .col-xl-6 {
    flex: 0 0 auto;
    width: 50%;
   }
   .text img{
    width: 15px;

   }
   h6{
    width: 300px;
   }
  
   
</style>