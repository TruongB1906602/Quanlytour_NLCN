<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import AuthService from "../services/Auth.service";
    import toast from "../assets/js/toasts";
    import toastsVue from "../components/toasts.vue";
    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
            toastsVue
        },
        data() {
        const Logupform = yup.object().shape({
            name: yup
            .string()
            .required("Tên phải có giá trị.")
            .min(2, "Tên phải ít nhất 2 ký tự."),
            email: yup
            .string()
            .required("Email phải có giá trị.")
            .email("E-mail không đúng.")
            .max(50, "E-mail tối đa 50 ký tự."),
           pwd: yup
            .string()
            .required("Mật khẩu phải có giá trị.")
            });
            return {
            Logupform,
            message:"Đăng ký thành công",
            usernew:{
                username:"",
                email:"",
                password:"",
            },
            toasts:{
              title:"",
              msg:"",
              type:"",
              duration:0
                 },
            };
        },
        methods:{
          toast,
            async postuser(){
                try{
                  await AuthService.createsignup(this.usernew);
                   this.toasts.title="Success",
                  this.toasts.msg="Đăng ký thành công",
                  this.toasts.type="success",
                  this.toasts.duration=2000
                  this.toast();
                  setTimeout(()=>{
                    this.$router.push({name:"login"});
                  },2000);
                }catch(erorr){
                  console.log(erorr);
                  this.toasts.title="Faild",
                  this.toasts.msg="Thông tin bạn nhập đã có",
                  this.toasts.type="error",
                  this.toasts.duration=2000
                  this.toast();
                }
            }
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

    <Form action="" :validation-schema="Logupform">
        <h3>Signin</h3>
          <label class="form-label" for="name">Name Account</label>
         <Field 
                        id="name"
                        name="name"
                        type="text"
                         placeholder="Nhập vào tên"
                        v-model="usernew.username"
                       class="box"
            />
             <ErrorMessage name="name" class="text-danger"/> 
             <label class="form-label" for="email">Email</label>
            <Field 
                       id="email"
                        name="email"
                        type="email"
                         placeholder="Nhập vào email"
                        v-model="usernew.email"
                       class="box"
            />
            <ErrorMessage name="email" class="text-danger"/>
              <label class="form-label" for="pwd">Password</label>
            <Field 
                        id="pwd"
                        name="pwd"
                        type="password"
                        placeholder="Nhập vào mật khẩu"
                        v-model="usernew.password"
                       class="box"
            />
            <ErrorMessage  name="pwd" class="text-danger"/>
            <div class="form-check justify-content-center">
                <input class="form-check-input me-2" type="checkbox" value="" id="form2Example33" checked />
                <label class="form-check-label" for="form2Example33">
                  Subscribe to our newsletter
                </label>
            </div>
           <button type="button" class="btn btn-primary btn-block mb-4" @click="postuser()">
                Sign up
              </button>
              <p>Nếu bạn đã có tài khoản:<router-link to="/login"> Đăng nhập</router-link></p>
           
              
    </Form>

</div>
  </div>
</template>
<style scoped>
    
.login-form-container{
   /* position: fixed; */
  top:-200%; left: 0;
  z-index: 10000;
  min-height: 100vh;
  width:100%;
  background:rgba(0,0,0,.7);
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
    padding: 1.5rem 2rem;
    border-radius: 0.5rem;
    background: #fff;
    width: 30rem;
    height: 32rem;
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






