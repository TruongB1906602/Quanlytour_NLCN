<script>
  import * as yup from 'yup';
  
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import Input from '../views/Input.vue';
  export default {
     props: {
        product: { type: Object, required: true },
        resetAfterSubmit: { type: Boolean, default: false },
     },
  
     data() {
        const productform = yup.object().shape({
           name: yup.string().required('Tên phải có giá trị.').min(3, 'Tên phải ít nhất 3 ký tự.'),
           img: yup.string().required('Hình ảnh phải có giá trị.'),
           price: yup.string().required('Giá sản phẩm phải có giá trị.'),
           empty: yup.string().required('Số chỗ còn lại phải có giá trị.'),
           childprice: yup.string().required('Giá trẻ em có giá trị.'), 
           destination: yup.string().required('Điểm đến phải có giá trị.'), 
         //   childquantity: yup.string(),
         //   adultquantity: yup.string(),
           enddate: yup.string().required('Ngày đi có giá trị.'),
           startdate: yup.string().required('Ngày về có giá trị.'),
           desc: yup.string(),
         
           schedule: yup.string(),
           category: yup.string().required('Loại sản phẩm phải có giá trị.'),
        });
        return {
           productLocal: this.product,
           productform,
           dataCkeditor: this.product.desc,
        };
     },
  
     components: {
        Form,
        Field,
        ErrorMessage,
        Input,
     },
  
     emits: ['submit:product'],
  
     methods: {
        getdata() {
           CKEDITOR.replace('editor2');
        },
        getdata1() {
           CKEDITOR.replace('editor3');
        },
  
        addImge() {
           document.querySelector('#imgproduct2').style.display = 'block';
        },
        submitproduct() {
           this.productLocal.desc = CKEDITOR.instances.editor2.getData();
           this.productLocal.schedule = CKEDITOR.instances.editor3.getData();
           this.$emit('submit:product', this.productLocal);
          //  window.location.href = 'http://localhost:8001/admin';
           if (this.resetAfterSubmit) {
              this.$refs.contactForm.resetForm();
           }
        },
     },
  };
  </script>
  <template>
     <div class="container">
      <div class="heading">
          <h4>Thêm tour mới  </h4>
       </div>
        <Form :validation-schema="productform" @submit="submitproduct">
           <div class="row">
              <div class="col">
                 <div class="form-group">
                    <label for="nameproduct">Tên tour</label>
                    <Field
                       type="text"
                       class="form-control"
                       id="nameproduct"
                       name="name"
                       placeholder="Nhập vào tên tour"
                       v-model="productLocal.title"
                    />
                    <ErrorMessage name="name" class="text-danger" />
                 </div>
              </div>
           </div>
           <div class="row">
              <div class="col">
                 <div class="form-group">
                    <label for="priceproduct">Giá người lớn</label>
                    <Field
                       type="number"
                       class="form-control"
                       id="priceproduct"
                       name="price"
                       placeholder="Nhập vào giá người lớn"
                       v-model="productLocal.price"
                    />
                    <ErrorMessage name="price" class="text-danger" />
                 </div>
              </div>
              <div class="col">
                 <div class="form-group">
                    <label for="categoryproduct">Giá trẻ em</label>
                    <Field
                       type="text"
                       class="form-control"
                       id="categoryproduct"
                       name="childprice"
                       placeholder="Nhập vào giá trẻ em"
                       v-model="productLocal.childprice"
                    />
                    <ErrorMessage name="childprice" class="text-danger" />
                 </div>
              </div>
             
           </div>
         
           <div class="row">
              <div class="col">
                 <div class="form-group">
                    <label for="priceproduct">Ngày đi</label>
                    <Field
                       type="text"
                       class="form-control"
                       id="priceproduct"
                       name="startdate"
                       placeholder="Nhập vào ngày đi"
                       v-model="productLocal.startdate"
                    />
                    <ErrorMessage name="startdate" class="text-danger" />
                 </div>
              </div>
              <div class="col">
                 <div class="form-group">
                    <label for="categoryproduct">Ngày về</label>
                    <Field
                       type="text"
                       class="form-control"
                       id="categoryproduct"
                       name="enddate"
                       placeholder="Nhập vào ngày về"
                       v-model="productLocal.enddate"
                    />
                    <ErrorMessage name="enddate" class="text-danger" />
                 </div>
              </div>
           </div>
          
           <div class="row">
              <div class="col">
                 <div class="form-group">
                    <label for="imgproduct">Hình ảnh</label>
                    <div style="display: flex; flex-direction: row">
                       <Field
                          type="text"
                          class="form-control"
                          id="imgproduct"
                          name="img"
                          placeholder="Nhập vào hình ảnh"
                          v-model="productLocal.img[0]"
                       />
                       <i class="bi bi-file-plus btn_img-add" @click="addImge()"></i>
                    </div>
                    <input
                       type="text"
                       class="form-control"
                       id="imgproduct2"
                       placeholder="Nhập vào link hình ảnh"
                       name="img"
                       style="display: none; margin: 10px 0"
                       v-model="productLocal.img[1]"
                    />
                    <input
                       type="text"
                       class="form-control"
                       id="imgproduct2"
                       placeholder="Nhập vào link hình ảnh"
                       name="img"
                       style=" margin: 10px 0"
                       v-model="productLocal.img[2]"
                    />
                    <ErrorMessage name="img" class="text-danger" />
                 </div>
              </div>
              <div class="col">
                 <div class="form-group">
                    <label for="priceproduct">Số lượng chỗ còn:</label>
                    <Field
                       type="number"
                       class="form-control"
                       id="priceproduct"
                       name="empty"
                       placeholder="Nhập vào số lượng chỗ "
                       v-model="productLocal.empty"
                    />
                    <ErrorMessage name="empty" class="text-danger" />
                 </div>
              </div>
           </div>
           <div class="row">
            <div class="col">
                 <div class="form-group">
                    <label for="categoryproduct">Phân loại</label>
                    <Field
                       type="text"
                       class="form-control"
                       id="categoryproduct"
                       name="category"
                       placeholder="Nhập vào loại tour"
                       v-model="productLocal.categories"
                    />
                    <ErrorMessage name="category" class="text-danger" />
                 </div>
              </div>

              <div class="col">
                 <div class="form-group">
                    <label for="categoryproduct">Điểm đến</label>
                    <Field
                       type="text"
                       class="form-control"
                       id="categoryproduct"
                       name="destination"
                       placeholder="Nhập vào điểm đến"
                       v-model="productLocal.destination"
                    />
                    <ErrorMessage name="destination" class="text-danger" />
                 </div>
              </div>
           </div>
           <div class="row">
              <div class="col">
                 <div class="form-group">
                    <label for="nameproduct">Lịch trình tour</label>
  
                    <textarea
                       @click="getdata1"
                       name="schedule"
                       href="#autosave-feature"
                       id="editor3"
                       class="form-control"
                       rows="3"
                       cols="80"
                       placeholder="@Nhập vào lịch trình tour"
                       :value="productLocal.schedule"
                       @change="(e) => (productLocal.schedule = e.target.value)"
                    >
                    </textarea>
  
                   
                 </div>
              </div>
           </div>
           <div class="row">
              <div class="col">
                 <div class="form-group">
                    <label for="nameproduct">Mô tả tour</label>
  
                    <textarea
                       @click="getdata"
                       name="desc"
                       href="#autosave-feature"
                       id="editor2"
                       class="form-control desc"
                       rows="3"
                       cols="80"
                       placeholder="@Nhập vào mô tả"
                       :value="productLocal.desc"
                       @change="(e) => (productLocal.desc = e.target.value)"
                    >
                    </textarea>
  
                   
                 </div>
              </div>
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
  .wrapper {
     width: 100%;
     margin: 50px 200px;
  }
  .col {
     border: none;
  }
  .container {
     padding: 30px;
  
     background: #ffffff;
     box-shadow: 0px 8px 8px rgb(0 0 0 / 3%);
     border-radius: 16px;
     justify-content: space-between;
  }
  
  .btn_img-add {
     font-size: 30px;
     color: dodgerblue;
  }
  .row{
   margin-bottom: 15px;
  }
  .heading{
    padding-left: 5px;
   
    height: 40px;
   
    margin-bottom: 15px;
    border-left: 7px solid #FFD43B;
    background: #eee;
    padding-bottom: 10px;
    padding-top: 5px;
}
  </style>