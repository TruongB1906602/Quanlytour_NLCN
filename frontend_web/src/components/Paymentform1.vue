<script>
  import * as yup from "yup";
  import { Form, Field, ErrorMessage } from "vee-validate";
  import CartItem from "@/components/CartItem.vue";
  import { mapState } from 'pinia'
  import { useAuthStore } from "@/stores/Auth.store";
  import CartService from '../services/Cart.service'
  import ProductService from '../services/Product.service'
  import OrderService from '../services/Order.service'
  import toastsVue from '../components/toasts.vue'
  import toastsjs from '../assets/js/toasts.js'
    
    export default{
        props:{
        
            pay: { type: Object, required: true },
            resetAfterSubmit: { type: Boolean, default: false },
            refeshlist:Function,
             carts:[],
            
           
        },
     
           computed:{
            total(){
           var total=0;
           for(var i in this.carts){
              total=total + this.carts[i].price*this.carts[i].quantity;
           }
             return  new Intl.NumberFormat('de-DE',{style: 'currency',currency: 'VND'}).format(total);
        }   ,
              ...mapState(useAuthStore,{
                  currentUser: "user",
              }),
          },
       data() {
        
          const payform = yup.object().shape({ 
              name: yup
              .string()
              .required("Tên phải có giá trị."),   
              
              others: yup
              .string(),
            
        
              userId: yup
              .string(""),
              
              address: yup
              .string()
              .required("Địa chỉ phải có giá trị."),
            
              email: yup
              .string()
              .required("Email phải có giá trị."),
              phone: yup
            .string()
            .required("Điện thoại không có giá trị!")
            .matches(
              /((09|03|07|08|05)+(\d{8})\b)/g,
              "Số điện thoại không hợp lệ."
                  ),
             
              });
              return {
                title:"1",
                carts:[],
                products:[],
              paydetails:this.pay,
              payform,
              paydetails:{
               
                name:"",
                phone:"",
                address:"",
                email:"",
                others:"",
              
  
              },
                cartItem:[],
                 orderitem:{
                      userId:"",
                       quantity:"",
                       title:"",
                       price:"",
                       name:"",
                       phone:"",
                       email:"",
                       address:"",
                       adultquantity:"",
                       childprice:"",
                       childquantity:"",
                       startdate:""
                     
                       
                    
                  },
                 
                   toasts:{
                      title:"Thông báo",
                      msg:"Đặt hàng thành công!",
                      type:"success",
                      duration:2000
                   },
  
                   
                
              }
          },
  
         
         
      components:{
        Form,
        Field,
        ErrorMessage,
        toastsVue,
        CartItem,
      },
      emits:['submit:pay'],
        methods:{
            getiduser(){
          const user =  JSON.parse(localStorage.getItem("user"));
          return user._id;
        },
        async getcarts(){
          try{
          this.carts = await CartService.get(this.getiduser());
          }catch(error){
            console.log(error);
          }
        },
        async getproducts(){
          try{
          this.products = await ProductService.getAll();
          console.log(this.products)
        
          }catch(error){
            console.log(error);
          }
        },
        async delcart(index){
              this.toasts.title="Deleted",
              this.toasts.msg="Đã xóa sản phẩm",
              this.toasts.type="error",
              this.toasts.duration=2000
              this.toastsjs(); 
              await CartService.delete(this.carts[index]._id)
              this.getcarts(); 
        },
       toastsjs,
 
       registerproduct(){
         if(this.carts.length > 0){
          this.toasts.title = "Thông báo",
          this.toasts.msg = "Đã cập nhật",
          this.toasts.type = "success",
          this.toasts.duration=1000,
          this.toastsjs();
         }else{
              this.toasts.title = "Failed",
              this.toasts.msg = "Bạn chưa có sản phẩm",
              this.toasts.type = "error",
              this.toasts.duration=2000,
              this.toastsjs();
         }
       },  
        
            submitpay(){
             
             this.paydetails.userId = this.currentUser._id;
             this.orderitem.name = this.paydetails.name;
             this.orderitem.phone = this.paydetails.phone;
             this.orderitem.email = this.paydetails.email;
             this.orderitem.address = this.paydetails.address;

            this.$emit('submit:pay',this.paydetails);
                if (this.resetAfterSubmit) {
                     
                      this.$refs.contactForm.resetForm();
                     
                }     
        },
           
               toastsjs,
               async getidcart() {
                var quantity1=0
                  try{
                    this.cartItem=  await CartService.get(this.currentUser._id)
                        this.orderitem.userId = this.currentUser._id;
        
                       for(var i in this.cartItem){
                          console.log(this.cartItem[i].adultquantity + this.cartItem[i].childquantity )
                               quantity1 = this.cartItem[i].adultquantity + this.cartItem[i].childquantity 
                           this.orderitem.price = this.cartItem[i].price;
                           this.orderitem.title = this.cartItem[i].title;
                           this.orderitem.quantity = this.cartItem[i].quantity;
                           this.orderitem.childquantity = this.cartItem[i].childquantity;
                           this.orderitem.adultquantity = this.cartItem[i].adultquantity;
                           this.orderitem.childprice = this.cartItem[i].childprice;
                           this.orderitem.startdate = this.cartItem[i].startdate;
                         
                        for(var j in this.products){
                          if(this.products[j]._id == this.cartItem[i].productId){
                            console.log(this.products[j]._id)
                            console.log(this.cartItem[i].productId)
                            var quantitynew= this.products[j].empty- quantity1
                              this.products[j]=  ProductService.update(this.cartItem[i].productId,{empty: quantitynew })}
                              console.log(quantitynew)
                          
                        }

                        OrderService.create(this.orderitem);
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
        created(){
          this.getproducts()
          this.getcarts();
      },
    }
       
    
    
  </script>
  <template>
   
  <div class="wrapper">
  
       <Form :validation-schema="payform"  @submit="submitpay"  >
          
        <div class="contact">
          <h4>Thông tin đặt tour</h4>
            <div class="left">
       
                    
                    <div class="form-group">
                    <label for="nameproduct">Tên khách hàng</label>
                    <Field type="text"  class="form-control" id="name" name="name" placeholder="Nhập vào họ tên" v-model="paydetails.name" />
                    <ErrorMessage name="name" class="text-danger"  />
                    </div>

                <div class="form-group">
                <label for="phoneproduct">Số điện thoại</label>
                <Field type="text" class="form-control" id="phone" name="phone"  placeholder="Nhập vào số điện thoại" v-model="paydetails.phone"/>
                    <ErrorMessage name="phone" class="text-danger" />
                </div>
              
  
              </div>
            <div class="right">
              <div class="form-group">
                <label for="addressproduct">Email</label>
                <Field type="email" class="form-control" id="email" name="email" placeholder="Nhập vào email" v-model="paydetails.email" />
                <ErrorMessage name="email" class="text-danger"  />
                </div>

                <div class="form-group">
                <label for="addressproduct">Địa chỉ</label>
                <Field type="text" class="form-control" id="address" name="address" placeholder="Nhập vào địa chỉ" v-model="paydetails.address" />
                <ErrorMessage name="address" class="text-danger"  />
                </div>
            </div>

            <div class="note">
              
                <textarea  id="others" cols="84" rows="6" placeholder="@Nội dung bổ sung" name="others" v-model="paydetails.others" ></textarea>
            
                </div>
           </div>
    
      <div>
      
      <toastsVue></toastsVue>
     
     <section class="h-100 h-custom">
    <div class="container py-5 h-100">
    
       <div class="col-12">
         <div class="card card-registration card-registration-2" style="border:none">
         
             <div class="row g-0">
               <div class="col-lg-8">
                 <div class="p-5">
                  
                   <hr class="my-4">
                   <CartItem v-bind:title="title"  :refeshlistcart="refeshlistcart" :carts="carts" @deleted:cartIndex="delcart"></CartItem>
                
                   <div class="btn"  @click="getidcart()">
                             <button  type="submit" 
                  
                              @click="getpay"  class="btnsave btn-primary">Đặt tour</button>
                            
                    </div>
                
                   <div class="pt-5">
                     <h6 class="mb-0"><router-link to="/" class="text-body"><i
                           class="fas fa-long-arrow-alt-left me-2"></i>Quay lại</router-link></h6>
                   </div>
                 </div>
    
    
               </div>
              
             </div>
       
         </div>
       </div>
    
    </div>
    </section>
      </div>
       
      </Form>
    
    
  </div>
   
  </template>
  <style scoped>
  .wrapper{
 
      
      border-radius: 8px;
      display: flex;
      justify-content: center;
      padding: 22px;
    
     background: white;
  }
  .right{
    width: 300px;
    display: inline-block;

  }
  #othersproduct{
     width: 400px;
     height: 50px;
     display: inline-block;
     
    border: 1px solid grey;
  }
  .after-order{
     display: none; 
    
  }
  h4{
      font-size: 18px;
      font-weight: 600;
      line-height: 21px;
     
      font-weight: 600;
      margin-bottom: 15px;
      color:#333;
      border-bottom: 1px solid #006bbf;
      padding-bottom: 7px;
     
  }
  .btn{
    display:block;
  
  
  }
  .left{
     
   margin-right: 30px;
    width:300px;
  display: inline-block;
  
  }
  .p-5 {
    padding: 1rem!important;
    width: 700px;
}
  .btnsave{
   
      border-radius: 4px;
      font-weight: 500;
      width:20%;
      float:right;
      margin-right:10px;
      height: 45px;
      text-align: center;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
      position: relative;
      background: #3275fc;
      color: white;
  }
  .contact{
   
    width:90%;
    margin-left: 20px;
  }
  .form-control{
    font: inherit;
      color: currentColor;
      width: 100%;
    
      height: 1.1876em;
      margin: 0;
      display: block;
      padding: 6px 0 7px;
      min-width: 0;  background: none;
      box-sizing: content-box;
      animation-name: mui-auto-fill-cancel;
      letter-spacing: inherit;
      animation-duration: 10ms;
   
  
  }
  .form-group{
   
      margin-bottom: 15px;
      border-bottom: 1px solid grey;
  }
  .btn_img-add{
   font-size: 30px; 
   color: dodgerblue;
  }
  .py-5 {
    padding-top: 1rem!important;
    padding-bottom: 1rem!important;
}
  </style>