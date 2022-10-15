<template>
     
 <div class="center">
 <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
 
  <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="10000">
        <div class="row">
            <div class="col-lg-4">
                    <img src="https://postumtravel.vn/wp-content/uploads/2022/04/Tour-Ha-Noi-Nha-Trang.png" class="d-block w-100" alt="...">
                  
            </div>
             <div class="col-lg-4">
                    <img src="https://postumtravel.vn/wp-content/uploads/2022/04/Tour-Ha-Noi-Nha-Trang-Mui-Ne.png" class="d-block w-100" alt="...">
                  
            </div>
        </div>
      
    
    </div>
    <div class="carousel-item" data-bs-interval="20000">
      <div class="row">
            <div class="col-lg-4">
                    <img src="https://postumtravel.vn/wp-content/uploads/2022/04/TOUR-Ha-Noi-Phu-Quoc.png" class="d-block w-100" alt="...">
                    
            </div>
             <div class="col-lg-4">
                    <img src="https://postumtravel.vn/wp-content/uploads/2022/04/Tour-Ha-Noi-Hue-Hoi-An.png" class="d-block w-100" alt="...">
                   
            </div>
        </div>
      
      
    </div>
    <div class="carousel-item">
      <div class="row">
            <div class="col-lg-4">
                    <img src="https://postumtravel.vn/wp-content/uploads/2022/04/Tour-Ha-Noi-Ly-Son-Quang-Ngai.png" class="d-block w-100" alt="...">
                  
            </div>
             <div class="col-lg-4">
                    <img src="https://postumtravel.vn/wp-content/uploads/2022/04/Tour-Ha-Noi-Nha-Trang-Da-Lat.png" class="d-block w-100" alt="...">
                  
            </div>
      </div>
      
      
    </div>
  </div>
  <div class="navi-left">
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <img src="@/assets/images/left-arrow.png" alt="">
  </button>
   </div>
   <div class="navi-right">
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <img src="@/assets/images/right-arrow.png" alt="">
  </button>
 </div>
</div>
</div>




</template>
<style scoped>
.carousel-item{
    height: 250px;
}
 h6{
    font-size: 16px;
    margin-top: 20px;
    margin-left: 85px;
    
 }  
 .navi-left{
    background: white;
    height: 45px;
    width: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    border-radius: 100px;
    box-shadow: rgb(0 0 0 / 10%) 0px 8px 12px;
    cursor: pointer;
    position: absolute;
    top: 60%;
    transform: translate(-50%, -50%);
    left:10%;
 }
 
 .navi-right{
    background: white;
    height: 45px;
    width: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    border-radius: 100px;
    box-shadow: rgb(0 0 0 / 10%) 0px 8px 12px;
    cursor: pointer;
    position: absolute;
    top: 55%;
    transform: translate(-50%, -50%);
    right:7%;
 }
 .carousel-inner{
    overflow: hidden;

 }
 .navi-left img{
    margin-left: 35px;
     width: 15px;
    
 }
 .row{
    display: flex;
    justify-content: center;
    margin-top:30px;
    margin-left: 30px;
 }
 
 .navi-right img{
    margin-right: 35px;
     width: 15px;
    
 }
 .carousel-item .col-lg-4{

    width: 570px!important;
    height: 250px;
    border-radius: 10%;
  
    
   
      
    }
.carousel-item .col-lg-4 img{
    height: 190px;
     width: 95%!important;
    background: #999;
    border-radius: 10%;
   border: 1px dashed rgba(255, 18, 132, 0.5);
   display: flex;
   
    background: rgba(255, 18, 132, 0.05);
    box-shadow: 0px 0px 8px rgb(0 0 0 / 5%), 0px 8px 8px rgb(0 0 0 / 5%);
    border-radius: 8px;
    flex-direction: column;
   }

.w-100 {
     width: 585px!important; 
}


</style>