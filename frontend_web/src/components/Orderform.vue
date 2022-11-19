<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import toastsVue from '../components/toasts.vue'
    import toastsjs from '../assets/js/toasts.js'
    import { mapState } from 'pinia'
    import UserService from "../services/User.service";
      import { useAuthStore } from "@/stores/Auth.store";
    export default{
        props:{
        
            order: { type: Object, required: true },
            resetAfterSubmit: { type: Boolean, default: false },
            
        },
          
       data() {
          const orderform = yup.object().shape({ 
            name: yup
            .string()
            .required("Tên phải có giá trị."),  

           userId:yup
           .string(),

            price: yup
            .string()
            .required("Giá phải có giá trị."), 

            childprice: yup
            .string()
            .required("Giá trẻ em phải có giá trị."), 

            childquantity: yup
            .string()
            .required("Số lượng trẻ em phải có giá trị."), 

            status: yup
            .string(""),
            nametourguide: yup
            .string(""),
    
            title: yup
            .string("")
            .required("Tên tour phải có giá trị."), 

            quantity: yup
            .string("")
            .required("Số lượng phải có giá trị."), 
              
            address: yup
            .string()
            .required("Địa chỉ phải có giá trị."),
            phone: yup
            .string()
            .required("Điện thoại phải có giá trị!")
            .matches(
              /((84|0[3|5|7|8|9])+([0-9]{8})\b)/g,
              "Số điện thoại không hợp lệ."
                  ),
             
              });
              return {
              user:[],
              orderdetails:this.order,
              orderform,
        
                
              }
          },
  
         
          computed:{
            ...mapState(useAuthStore,{
                currentUser: "user",
            }),
        },
      components:{
        Form,
        Field,
        ErrorMessage,
        toastsVue,
      },
      emits:['submit:order'],
        methods:{
        
             toastsjs,
            submitorder(){
              this.orderdetails.status="Đã thanh toán"
              this.$emit('submit:order',this.orderdetails);
                    if (this.resetAfterSubmit) {
                          this.$refs.contactForm.resetForm();
                    }   
             },
          async getuser(){
            try {
                    this.order= await OrderService.getAll();
                    console.log(this.order.userId);
                } catch (error) {
                    console.log(error);
                    this.$router.push({
                        name: "notfound",
                        params: { pathMatch: this.$route.path.split("/").slice(1) },
                        query: this.$route.query,
                        hash: this.$route.hash,
                    });
                }
          }
       
        },
        computed:{
            ...mapState(useAuthStore,{
                currentUser: "user",
            }),
        },
      }
  </script>
<template>
  
<div class="container">
  <h5 style="color:#1b78e4"> Thông tin đặt tour</h5>
   <Form :validation-schema="orderform"  @submit="submitorder" >
  <div class="row">
    <div class="col">
      <div class="form-group">
      <label for="nameproduct">Tên tour</label>
      <Field type="text" class="form-control" id="priceproduct" name="title" placeholder="Nhập vào tên" v-model="orderdetails.title" />
      <ErrorMessage name="title" class="text-danger"  />
    </div>
    </div>
    
  </div>
  <div class="row">
    <div class="col">
      <div class="form-group">
         <label for="addressproduct">Giá tour người lớn</label>
         <Field type="text" class="form-control" id="priceproduct" name="price" placeholder="Nhập vào giá" v-model="orderdetails.price" />
         <ErrorMessage name="price" class="text-danger"  />
    </div>
    </div>
    <div class="col">
      <div class="form-group">
          <label for="phoneproduct">Giá tour trẻ em</label>
          <Field type="number" class="form-control" id="nameproduct" name="childprice"  placeholder="Nhập vào số lượng " v-model="orderdetails.childprice"/>
          <ErrorMessage name="quantity" class="text-danger" />
    </div>
    </div>
   
   
  </div>
  <div class="row" >

    <div class="col">
      <div class="form-group">
          <label for="phoneproduct">Id hướng dẫn viên</label>
          <Field type="text" class="form-control" id="nameproduct" name="nametourguide"  placeholder="Nhập vào Id hướng dẫn viên" v-model="orderdetails.tourguideId"/>
          <ErrorMessage name="quantity" class="text-danger" />
    </div>
    </div>
  </div>

  <div class="row">
    
    <div class="col">
        <div class="form-group">
        <label for="phoneproduct">Trạng thái</label>
         <Field type="text" class="form-control" id="namestatus" name="status"  placeholder="Nhập vào số lượng " v-model="orderdetails.status"/>
        <ErrorMessage name="status" class="text-danger" />
       </div>
    </div>
   

  </div>
  <div class="row">
    <div class="col">
      <div class="form-group">
          <label for="phoneproduct">Số lượng người lớn</label>
          <Field type="number" class="form-control" id="nameproduct" name="quantity"  placeholder="Nhập vào số lượng " v-model="orderdetails.quantity"/>
          <ErrorMessage name="quantity" class="text-danger" />
    </div>
    </div>
    <div class="col">
        <div class="form-group">
        <label for="phoneproduct">Số lượng trẻ em( từ 5 đến 11 tuổi)</label>
         <Field type="number" class="form-control" id="childquantity" name="childquantity"  placeholder="Nhập vào số trẻ em " v-model="orderdetails.childquantity"/>
        <ErrorMessage name="childquantity" class="text-danger" />
       </div>
    </div>
   

  </div>
   <div class="total">
    <h5>Tổng tiền: {{  Intl.NumberFormat('de-DE',{style: 'currency',currency: 'VND'}).format((orderdetails.price*orderdetails.adultquantity) + (orderdetails.childprice * orderdetails.childquantity))  }}</h5>
   </div>
   <div class="row">
    <div class="col">
      <h5 style="color:#1b78e4">Thông tin khách hàng</h5>
        <div class="form-group">
          <label for="nameproduct">Tên khách</label>
          <Field type="text" class="form-control" id="priceproduct" name="name" placeholder="Nhập vào họ tên" v-model="orderdetails.name" />
          <ErrorMessage name="name" class="text-danger"  />
        </div>
    </div>
   
  </div>
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="addressproduct">Địa chỉ</label>
          <Field type="text" class="form-control" id="priceproduct" name="address" placeholder="Nhập vào địa chỉ" v-model="orderdetails.address" />
          <ErrorMessage name="address" class="text-danger"  />
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label for="phoneproduct">Số điện thoại</label>
          <Field  type=" text" class="form-control" id="nameproduct" name="phone"  placeholder="Nhập vào sđt" v-model="orderdetails.phone"/>
            <ErrorMessage name="phone" class="text-danger" />
        </div>
      </div>

  </div>
  
   <div class="btn-main">
      
        <button type="submit" class="btn btn-primary">Xác nhận thanh toán</button>
       <router-link to="/admin" style="margin: 10px;">
            <button class="btn btn-danger">Trở về</button>
        </router-link>
        
       </div>

  </Form>
</div>
    


</template>
<style scoped>


.col{
  border:none;
}
.container{
    padding: 20px;
    background: #ffffff;
    box-shadow: 0px 8px 8px rgb(0 0 0 / 3%);
    border-radius: 16px;
    justify-content: space-between;
   
}
.total{
  margin:30px 0;
}
.btn_img-add{
 font-size: 30px; 
 color: dodgerblue;
}
.btn-main {
 display: flex;
 justify-content: center;
 align-items: center;
  
}


</style>