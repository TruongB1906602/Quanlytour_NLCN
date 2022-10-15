<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import { mapActions } from "pinia";
    import { useAuthStore } from "@/stores/Auth.store";
    import toast from "../assets/js/toasts";
    
    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        data() {
        const Loginform = yup.object().shape({
            username: yup
            .string()
            .required("Tên phải có giá trị.")
            .min(2, "Tên phải ít nhất 2 ký tự."),
           password: yup
            .string()
            .required("Mật khẩu phải có giá trị.")
            });
            return {
            Loginform,
            toasts:{
                    title:"Warning",
                    msg:"Tên đăng nhập hoặc tài khoản không đúng!",
                    type:"warn",
                    duration:1000
                 },
            }
        },
        methods:{
            toast,
              animation(){
                                      
                    let formBtn = document.querySelector('#login-btn');
                    let loginForm = document.querySelector('.login-form-container');
                    let formClose = document.querySelector('#form-close');
                    window.scrollTo = () =>{
                      
                        loginForm.classList.remove('active');
                    }


                    formBtn.addEventListener('click', () =>{
                        loginForm.classList.add('active');
                    });

                    formClose.addEventListener('click', () =>{
                        loginForm.classList.remove('active');
                    });


                                  
                },
            showPwd(){
            if(document.querySelector("#checkpwd").checked == true){
                  document.querySelector("#pwd").type = 'text';
            }else{
                  document.querySelector("#pwd").type = 'password';
            }
          },
          	...mapActions(useAuthStore, ["login"]),
            async handleLogin(user) {
              try {
                await this.login(user);

                location.href='http://localhost:8001/';
              } catch (error) {
                this.toast();
                console.log(error);
              }
            },
        },
    };
</script>
<template>
      
<div class="login-form-container" >
     <router-link to="/">
      <ion-icon name="close-circle-outline" id="form-close"></ion-icon>
   </router-link>

    <Form action="" :validation-schema="Loginform" @submit="handleLogin">
        <h3>login</h3>
         <Field 
                id="name"
                placeholder="Enter a valid account name"
                name="username"
                type="text"
                class="box"
            />
            <ErrorMessage name="username" class="text-danger" />
         <Field 
                id="pwd"
                placeholder="Enter password"
                name="password"
                type="password"
                class="box"
            />
            <ErrorMessage name="password" class="text-danger"/>
       
          <div class="d-flex justify-content-between align-items-center">
            <!-- Checkbox -->
            <div class="form-check mb-0">
              <input class="form-check-input me-2" type="checkbox" value="" id="checkpwd" @click="showPwd()" />
              <label class="form-check-label" for="checkpwd">
                Show Password
              </label>
            </div>
          </div>
          <div class="text-center tex t-lg-start mt-4 pt-2">
              <button class="btn"
              >Login
            </button>
            <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <router-link to="/logup"
                class="link-danger">Register</router-link></p>
          </div>
    </Form>

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
    height: 26rem;
}

.login-form-container Form h3{
  font-size: 2rem;
  color:#444;
  text-transform: uppercase;
  text-align: center;
  padding:1rem 0;
}

.login-form-container Form .box{
  width:100%;
  padding:0.3rem;
  font-size: 1rem;
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
  padding:.5rem 0;
  font-size: 1rem;
  color:#666;
}

.login-form-container Form p a{
  color: #ffa500;
}

.login-form-container Form p a:hover{
  color:#333;
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
    padding: 0.8rem 3rem;
    border: 0.2rem solid;
    cursor: pointer;
    font-size: 1rem;
}



</style>

