<script>
  import * as yup from "yup";
  import { Form, Field, ErrorMessage } from "vee-validate";




  export default{
      props:{
          hotel: { type: Object, required: true },
          resetAfterSubmit: { type: Boolean, default: false },
      },
     
       
    
     data() {
     
        const hotelform = yup.object().shape({
            name: yup
            .string()
            .required("Tên phải có giá trị.")
            .min(2, "Tên phải ít nhất 2 ký tự."),
             img: yup
            .string(),
           
            price: yup
            .string()
            .required("Giá sản phẩm phải có giá trị."),
            address: yup
            .string()
            .min(10, "Tên phải ít nhất 10 ký tự."),
            area: yup
            .string()
            .min(5, "Tên phải ít nhất 5 ký tự."),
             desc: yup
            .string(),
            
               
            category: yup
            .string()
            .required("Loại sản phẩm phải có giá trị."),
            
            });
            return {
            hotelLocal:this.hotel,
            hotelform,
            }
        },
        
    components:{
    Form,
    Field,
    ErrorMessage,
  
  
},
    
    emits:['submit:hotel'],
    methods:{
    
      addImge(){
        document.querySelector("#imghotel2").style.display = "block";
      },
      submithotel(){
          this.$emit('submit:hotel',this.hotelLocal);
          	if (this.resetAfterSubmit) {
				    this.$refs.contactForm.resetForm();
			  }
      },
    },
    
  }
</script>
<template>
<div class="container">
  <h5>Chỉnh sửa thông tin khách sạn</h5>
   <Form :validation-schema="hotelform"  @submit="submithotel" >
  <div class="row">
    <div class="col">
     <div class="form-group">
        <label for="namehotel">Tên khách sạn</label>
        <Field type="text" class="form-control" id="nameproduct" name="name" placeholder="Enter name product" v-model="hotelLocal.title" />
        <ErrorMessage name="name" class="text-danger" />
      </div>
    </div>
    
  </div>
  <div class="row">
    
    <div class="col">
         <div class="form-group">
        <label for="priceproduct">Price</label>
        <Field type="number" class="form-control" id="priceproduct" name="price" placeholder="Enter product price" v-model="hotelLocal.price" />
        <ErrorMessage name="price" class="text-danger"  />
      </div>
    </div>
    <div class="col">
      <div class="form-group">
        <label for="areahotel">Area</label>
        <Field type="text" class="form-control" id="priceproduct" name="area" placeholder="Enter address" v-model="hotelLocal.area" />
        <ErrorMessage name="area" class="text-danger"  />
      </div>
    </div>
    
  </div>

    <div class="row">
      <div class="col">
         <div class="form-group">
        <label for="imageproduct">Hình ảnh</label>
        <div style="display: flex; flex-direction: row;">
        <Field type="text" class="form-control" id="imgproduct" name="img" placeholder="Enter link product image" v-model="hotelLocal.img[0]"/>
         <i class="bi bi-file-plus btn_img-add" @click="addImge()"></i>
        </div>
        <input type="text" class="form-control" id="imghotel2" placeholder="Enter link product image" name="img" style="display:none; margin: 10px 0;" v-model="hotelLocal.img[1]">
        <!-- <ErrorMessage name="img" class="text-danger"  /> -->
      </div>
      </div>
      <div class="col">
           <div class="form-group">
        <label for="categoryproduct">Category</label>
        <Field type="text" class="form-control" id="categoryproduct" name="category" placeholder="Enter product categrogy" v-model="hotelLocal.categories"/>
          <ErrorMessage name="category" class="text-danger" />
      </div>
      </div>
    
  </div>
  <div class="row">
      <div class="col">
     <div class="form-group">
        <label for="priceproduct">Address</label>
        <Field type="text" class="form-control" id="priceproduct" name="address" placeholder="Enter address" v-model="hotelLocal.address" />
        <ErrorMessage name="address" class="text-danger"  />
      </div>
      </div>
  </div>
  <div class="row">
    <div class="col">
       <div class="form-group">
        <label for="nameproduct">Hotel Description</label>
       
         <textarea  name="desc" id="editor2" class="form-control " placeholder="Enter product description" v-model="hotelLocal.desc" > </textarea>
        
         <ErrorMessage name="desc" class="text-danger" />  
      </div>
      </div>
  </div>
  <div class="btn-main">
    <button type="submit" class="btn btn-primary">Lưu</button>
       <router-link to="/admin" style="margin: 10px;">
            <button class="btn btn-danger">Trở về</button>

        </router-link>
        </div>
  </Form>
</div>
    
  
</template>
<style scoped>

.btn-main .btn{
  background: #338dbc;
    color: white;
}
h5{
  text-align: left;
    border-bottom: 1px solid #ddd;
    padding-bottom: 12px;
    padding-top: 10px;
    font-size: 20px;
    color: black;
}
.btn-main{
  margin-top: 5px;
}
.container{
    width: 50%;
   padding: 20px;
     border: 1px solid #EDF2F7;
   
    background: #ffffff;
    box-shadow: 0px 8px 8px rgb(0 0 0 / 3%);
    border-radius: 16px;
    justify-content: space-between;
}


.btn_img-add{
 font-size: 30px; 
 color: dodgerblue;
}
.col {
     border: none;
}
</style>