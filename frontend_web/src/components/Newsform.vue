<script>

  import * as yup from 'yup';  
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import Input from '../views/Input.vue';
  export default {
     props: {
        news: { type: Object, required: true },
        resetAfterSubmit: { type: Boolean, default: false },
     },
  
     data() {
        const productform = yup.object().shape({
         
         title: yup.string().required('Giá trẻ em có giá trị.'), 
         destination: yup.string().required('Điểm đến phải có giá trị.'), 
         desc: yup.string(),
         img: yup.string(),
      
        });
        return {
           productLocal: this.news,
           productform,
           dataCkeditor: this.news.desc,
        };
     },
  
     components: {
        Form,
        Field,
        ErrorMessage,
        Input,
     },
  
     emits: ['submit:news'],
  
     methods: {
        getdata() {
           CKEDITOR.replace('editor2');
        },
       
  
        addImge() {
           document.querySelector('#imgproduct2').style.display = 'block';
        },
        submitproduct() {
           this.productLocal.desc = CKEDITOR.instances.editor2.getData();
       
           this.$emit('submit:news', this.productLocal);
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
        <h5 class="heading">Thêm tin tức</h5>
        <Form :validation-schema="productform" @submit="submitproduct">
           <div class="row">
              <div class="col">
                 <div class="form-group">
                    <label for="nameproduct">Tiêu đề</label>
                    <Field
                       type="text"
                       class="form-control"
                       id="nameproduct"
                       name="title"
                       placeholder="Nhập vào tên tour"
                       v-model="productLocal.title"
                    />
                    <ErrorMessage name="title" class="text-danger" />
                 </div>
              </div>

             
              
              <div class="col">
                 <div class="form-group">
                    <label for="nameproduct">Địa điểm</label>
                    <Field
                       type="text"
                       class="form-control"
                       id="nameproduct"
                       name="destination"
                       placeholder="Nhập vào tên tour"
                       v-model="productLocal.destination"
                    />
                    <ErrorMessage name="destination" class="text-danger" />
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
                   
                    <ErrorMessage name="img" class="text-danger" />
                 </div>
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
  </style>