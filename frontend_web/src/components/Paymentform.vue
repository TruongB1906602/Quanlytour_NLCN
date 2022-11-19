<script>

import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import toastsVue from '../components/toasts.vue'
import toastsjs from '../assets/js/toasts.js'
  
  export default{
      props:{
      
          pay: { type: Object, required: true },
          resetAfterSubmit: { type: Boolean, default: false },
          
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
            /((84|0[3|5|7|8|9])+([0-9]{8})\b)/g,
            "Số điện thoại không hợp lệ."
				),
           
            });
            return {
            
            paydetails:this.pay,
            payform,
      
              
            }
        },

       
       
    components:{
      Form,
      Field,
      ErrorMessage,
      toastsVue,
    },
    emits:['submit:pay'],
      methods:{
        
         
             
           toastsjs,
          submitpay(){
      
          //  this.paydetails.userId = this.currentUser._id;
        
          this.$emit('submit:pay',this.paydetails);
          	if (this.resetAfterSubmit) {
              
				    this.$refs.contactForm.resetForm();
			  }
         
            
      },
        
            
                
             
      }
  }
     
  
  
</script>
<template>
 
<div class="wrapper">

     <Form :validation-schema="payform"  @submit="submitpay" >
      <div class="heading">
          <h4>Thêm khách hàng  </h4>
       </div>
     <div class="left">
     
        
      <div class="form-group">
        <label for="nameproduct">Tên khách</label>
        <Field type="text" class="form-control" id="priceproduct" name="name" placeholder="Nhập vào họ tên" v-model="paydetails.name" />
        <ErrorMessage name="name" class="text-danger"  />
      </div>
  
      <div class="form-group">
        <label for="addressproduct">Địa chỉ</label>
        <Field type="text" class="form-control" id="priceproduct" name="address" placeholder="Nhập vào địa chỉ" v-model="paydetails.address" />
        <ErrorMessage name="address" class="text-danger"  />
      </div>
     
     

      </div>
      <div class="right">
        <div class="form-group">
        <label for="phoneproduct">Phone</label>
        <Field type="number" class="form-control" id="nameproduct" name="phone"  placeholder="Nhập vào sđt" v-model="paydetails.phone"/>
          <ErrorMessage name="phone" class="text-danger" />
      </div>

        <div class="form-group">
        <label for="addressproduct">Email</label>
        <Field type="email" class="form-control" id="priceproduct" name="email" placeholder="Nhập vào địa chỉ" v-model="paydetails.email" />
        <ErrorMessage name="email" class="text-danger"  />
      </div>
          
        
      </div>
      <div class="note">
      
           <textarea  placeholder="@Nội dung bổ sung" cols="152" rows="7"  name="others" v-model="paydetails.others" ></textarea>
          
          </div>
        
          <div class="btn-main">
              <input type="submit" class="btn btn-primary" value="Lưu" />
              <router-link to="/admin" style="margin: 10px">
                 <button class="btn btn-danger">Trở về</button>
              </router-link>
           </div>
     
    </Form>
  
  
</div>
 
</template>
<style scoped>
  
.wrapper{
    width: 1200px;
    border-radius: 8px;
    padding: 22px;
  margin: 0 auto;
  
    background: white;
}
.right{
 
   width: 600px;
   display: inline-block;
}
label{
  margin-bottom: 5px;
}
#othersproduct{
   width: 400px;
   height: 50px;
   display: inline-block;
   
  border: 1px solid grey;
}
   h4{
    
   
      font-weight: 600;
      margin-bottom: 15px;
      color:#333;
     
      padding-bottom: 7px;
}
.left{
   
 margin-right: 30px;
  width:500px;
  display: inline-block;

}
.btnsave{
 
    border-radius: 4px;
    font-weight: 500;
  
   
    width:50px; 
    height: 42px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  
    background: #338dbc;
    color: white;
}
.heading{
    padding-left: 5px;
    width: 96%;
    height: 40px;
   
    margin-bottom: 15px;
    border-left: 7px solid #FFD43B;
    background: #eee;
    padding-bottom: 10px;
    padding-top: 5px;
}
.form-control{
  font: inherit;
    color: currentColor;
   border-bottom: none;
  
    height: 1.1876em;
    margin: 0;
    display: block;
    padding: 6px 0 7px;
   
    background: none;
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
</style>