<template>
    <div class="page">
        <div class="container">
            <!-- <h6>Oops, không thể tìm thấy trang. Trở về</h6> -->
                <p style="font-size: 128px; ">404</p>
                <p style="font-size: 64px; padding-top: 6px; padding-bottom: 6px;"> Oops...</p>
                <p style="font-size: 32px; text-align: center; line-height: 1.5;">Trang này có lẽ đang đi du lịch rồi! </p>
                <router-link to="/"> <p>Bạn về Trang chủ nhé!</p></router-link>
             <img src="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_404.svg" alt=""> 
           
        </div>
    </div>
</template>

<style>
    .page{
        height: 15rem;
        margin: 0 auto;
        margin-bottom: 28rem;
    }
    p{
        display: flex;justify-content: center; 
    }
     .container img{
       display: flex;
       margin: 0 auto;
       justify-content: center;
       height: 18rem;
    } 

  

</style>