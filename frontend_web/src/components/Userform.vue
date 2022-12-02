<script>
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
import AuthService from '../services/Auth.service';
import toast from '../assets/js/toasts';
import toastsVue from '../components/toasts.vue';
export default {
   props: {
      user: { type: Object, required: true },
      resetAfterSubmit: { type: Boolean, default: false },
   },
   components: {
      Form,
      Field,
      ErrorMessage,
      toastsVue,
   },
   data() {
      const Userform = yup.object().shape({
         name: yup.string().required('Tên phải có giá trị.').min(2, 'Tên phải ít nhất 2 ký tự.'),
         email: yup
            .string()
            .required('Email phải có giá trị.')
            .email('E-mail không đúng.')
            .max(50, 'E-mail tối đa 50 ký tự.'),

         roleId: yup.string(),
      });
      return {
         Userform,
         userLocal: this.user,
         message: 'Sửa thông tin thành công',

         toasts: {
            title: '',
            msg: '',
            type: '',
            duration: 0,
         },
      };
   },
   emits: ['submit:user'],
   methods: {
      toast,
      submituser() {
         this.$emit('submit:user', this.userLocal);
         window.location.href = 'http://localhost:8001/admin';
         if (this.resetAfterSubmit) {
            this.$refs.contactForm.resetForm();
         }
      },
   },
};
</script>

<template>
   <div class="container">
      <toastsVue></toastsVue>

      <div class="wrapper">
         <Form :validation-schema="Userform" @submit="submituser">
            <h4>Thông tin người dùng</h4>
            <div class="left">
               <div class="form-group">
                  <label for="nameproduct">Tên người dùng</label>
                  <Field
                     type="text"
                     class="form-control"
                     id="email"
                     name="name"
                     placeholder="Nhập vào họ tên"
                     v-model="userLocal.username"
                  />
                  <ErrorMessage name="name" class="text-danger" />
               </div>

               <div class="form-group">
                  <label for="email">Email</label>
                  <Field
                     type="text"
                     class="form-control"
                     id="email"
                     name="email"
                     placeholder="Nhập vào địa chỉ"
                     v-model="userLocal.email"
                  />
                  <ErrorMessage name="email" class="text-danger" />
               </div>
            </div>
            <div class="form-group">
               <label class="form-label" for="email">Id người dùng</label>
               <Field
                  id="Tourguide"
                  name="Tourguide"
                  type="Tourguide"
                  placeholder="Nhập vào Id người dùng"
                  v-model="userLocal.roleId"
                  class="form-control"
               />
            </div>

            <div class="btn-main">
               <input type="submit" class="btn btn-primary" value="Lưu" />
               <router-link to="/admin" style="margin: 10px">
                  <button class="btn btn-danger">Trở về</button>
               </router-link>
            </div>
         </Form>
      </div>
   </div>
</template>
<style scoped>
.container {
   display: flex;
   justify-content: center;
   margin-top: 3rem;
}
.wrapper {
   width: 550px;
   border-radius: 8px;
   padding: 22px;
   background: #ffffff;
   box-shadow: 0px 12px 12px rgb(0 0 0 / 3%);
   border-radius: 16px;
   background: white;
}
.right {
   width: 600px;
   display: inline-block;
}
label {
   margin-bottom: 5px;
}
#Tourguide {
   width: 500px;
}
#othersproduct {
   width: 400px;
   height: 50px;
   display: inline-block;

   border: 1px solid grey;
}
h4 {
   font-size: 18px;
   font-weight: 600;
   line-height: 21px;

   font-weight: 600;
   margin-bottom: 15px;
   color: #333;

   padding-bottom: 7px;
}
.left {
   margin-right: 30px;
   width: 500px;
   display: inline-block;
}
.btnsave {
   border-radius: 4px;
   font-weight: 500;

   width: 50px;
   height: 42px;
   text-align: center;
   cursor: pointer;
   transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
   background: #338dbc;
   color: white;
}

.form-control {
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
   margin-bottom: 15px;
   border-bottom: 1px solid grey;
}

.btn_img-add {
   font-size: 30px;
   color: dodgerblue;
}
</style>
