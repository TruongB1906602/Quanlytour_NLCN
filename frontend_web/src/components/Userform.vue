<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import AuthService from "../services/Auth.service";
    import toast from "../assets/js/toasts";
    import toastsVue from "../components/toasts.vue";
    export default {
        props: {
        user: { type: Object, required: true },
        resetAfterSubmit: { type: Boolean, default: false },
     },
        components: {
            Form,
            Field,
            ErrorMessage,
            toastsVue
        },
        data() {
        const Userform = yup.object().shape({
            name: yup
            .string()
            .required("Tên phải có giá trị.")
            .min(2, "Tên phải ít nhất 2 ký tự."),
            email: yup
            .string()
            .required("Email phải có giá trị.")
            .email("E-mail không đúng.")
            .max(50, "E-mail tối đa 50 ký tự."),
            tourquantity: yup
             .string(),
            Tourguide: yup
             .string(),
        
            });
            return {
            Userform,
            userLocal: this.user,
            message:"Sửa thông tin thành công",
         
            toasts:{
              title:"",
              msg:"",
              type:"",
              duration:0
                 },
            };
        },
        emits:['submit:user'],
        methods:{
          toast,
          submitproduct() {
        
           this.$emit('submit:user', this.userLocal);
          //  window.location.href = 'http://localhost:8001/admin';
           if (this.resetAfterSubmit) {
              this.$refs.contactForm.resetForm();
           }
        },
          
        }
    };
</script>

<template>
  <div>
       
<toastsVue></toastsVue>

<div class="login-form-container" >
     <router-link to="/">
      <ion-icon name="close-circle-outline" id="form-close"></ion-icon>
     </router-link>

    <Form action="" :validation-schema="Userform" @submit="submitproduct">
        <h3>Sửa thông tin</h3>
          <label class="form-label" for="name">Tên người dùng</label>
         <Field 
            id="name"
            name="name"
            type="text"
            placeholder="Nhập vào tên"
            v-model="userLocal.username"
                       class="box"
            />
             <ErrorMessage name="name" class="text-danger"/> 
             <label class="form-label" for="email">Email</label>
            <Field 
                       id="email"
                        name="email"
                        type="email"
                         placeholder="Nhập vào email"
                        v-model="userLocal.email"
                       class="box"
            />
            <ErrorMessage name="email" class="text-danger"/>
          <div  v-if="user.Tourguide==true">
            <label class="form-label" for="email">Số tour nhận</label>
            <Field 
               
                        id="tourquantity"
                        name="tourquantity"
                        type="number"
                        placeholder="Nhập vào số tour đảm nhận"
                        v-model="userLocal.tourquantity"
                       class="box"
            /> 
          
          </div>
         
             <label class="form-label" for="email">Tourguide</label>
            <Field 
                       id="Tourguide"
                        name="Tourguide"
                        type="Tourguide"
                         placeholder="Nhập vào Tourguide"
                        v-model="userLocal.Tourguide"
                       class="box"
            />
          
        
            <div class="btn-main">
              <input type="submit" class="btn btn-primary" value="Lưu" />
              <router-link to="/admin" style="margin: 10px">
                <span>Trở về</span>
              </router-link>
           </div>
             
           
              
    </Form>

</div>
  </div>
</template>
<style scoped>
    
.login-form-container{
   left: 0;
  z-index: 10;
  /* background:rgba(0,0,0,.7); */
  display: flex;
  align-items: center;
  justify-content: center;

}

.login-form-container.active{
  top:0;
}
.mt-4 {
    margin-top: 0.5rem!important;
}
.login-form-container Form{
    margin: 2rem;
    /* padding: 1.5rem 2rem; */
    border-radius: 0.5rem;
    background: #fff;
    width: 30rem;
    height: 25rem;
}

.login-form-container Form h3{
  font-size: 2rem;
  color:#444;

  text-align: center;
  padding:1rem 0;
}

.login-form-container Form .box{
  width:100%;
  padding:0.3rem;
  font-size:0.8rem;
  color:#333;
  margin:.6rem 0;
  border:.1rem solid rgba(0,0,0,.3);
  text-transform: none;
}

.login-form-container Form .box:focus{
  border-color:  #ffa500;
}

.login-form-container Form #remember{
  margin:2rem 0;
}

.login-form-container Form label{
  font-size: 1rem;
}

.login-form-container Form .btn{
  display: inline-block;
  width:100%;
}

.login-form-container Form p{
 
  font-size: 1rem;
  color:#666;
}

.login-form-container Form p a{
  color: #ffa500;
}

.login-form-container Form p a:hover{
  color: grey;
  text-decoration: underline;
}

.login-form-container #form-close{
  position: absolute;
  top:2rem; right:3rem;
  font-size: 5rem;
  color:#fff;
  cursor: pointer;
}


.btn {
    display: block;
    margin-top: 0.5rem;
    background: #ffa500;
    color: #fff;
    padding: 0.3rem 3rem;
    border: 0.2rem solid;
    cursor: pointer;
    font-size: 1.2rem;
}
</style>






