<template>
   <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
         <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
         ></button>
         <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
         ></button>
         <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
         ></button>
      </div>
      <div class="carousel-inner">
         <div class="carousel-item active" data-bs-interval="2000">
            <img
               src="https://bizweb.dktcdn.net/100/379/266/themes/754774/assets/slider_1.jpg?1645597606857"
               class="d-block w-100"
            />
         </div>
         <div class="carousel-item" data-bs-interval="2000">
            <img
               src="https://nucuoimekong.com/wp-content/uploads/vuon-quoc-gia-phong-nha-ke-bang-thuoc-tinh-nao.jpg"
               class="d-block w-100"
            />
         </div>
         <div class="carousel-item" data-bs-interval="2000">
            <img src="@/assets/images/hoian.jpg" class="d-block w-100" />
         </div>
      </div>
      <button
         class="carousel-control-prev"
         type="button"
         data-bs-target="#carouselExampleCaptions"
         data-bs-slide="prev"
      >
         <span class="carousel-control-prev-icon" aria-hidden="true"></span>
         <span class="visually-hidden">Previous</span>
      </button>
      <button
         class="carousel-control-next"
         type="button"
         data-bs-target="#carouselExampleCaptions"
         data-bs-slide="next"
      >
         <span class="carousel-control-next-icon" aria-hidden="true"></span>
         <span class="visually-hidden">Next</span>
      </button>
   </div>
   <section class="form-container" data-aos="zoom-in">
      <form action="">
         <div class="inputBox">
            <span>Địa điểm</span>
            <input type="text" placeholder="search places" />
         </div>

         <div class="inputBox">
            <span>Ngày đến</span>
            <input type="date" />
         </div>

         <div class="inputBox">
            <span>Ngày về</span>
            <input type="date" />
         </div>

         <input type="submit" value="book now" class="btn" />
      </form>
   </section>
</template>
<style scoped>
.form-container form {
   background: #fff;
   box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
   border-radius: 0.5rem;
   padding: 0.4rem;
   padding-left: 1rem;
   padding-right: 1rem;
   display: flex;
   flex-wrap: wrap;
   gap: 1rem;
   align-items: center;
   position: absolute;
   z-index: 2;
   bottom: 400px;
   width: 80%;
   left: 150px;
}

.form-container form .inputBox {
   flex: 1 1 10rem;
}

.form-container form .inputBox span {
   font-size: 1rem;
   color: #666;
}

.form-container form .inputBox input {
   font-size: 1rem;
   color: #4444;
   background: #eee;
   border-radius: 0.5rem;
   margin: 0.4rem 0;
   text-transform: none;
   width: 90%;
   padding: 0.2rem;
}

.form-container form .btn {
   flex: 1 1 15rem;
   margin-top: 1rem;
   display: inline-block;
   padding: 0.5rem;
   font-size: 1.2rem;
   color: #fff;
   background: orange;
   border-radius: 0.5rem;
   cursor: pointer;
   width: 20%;
}

.carousel-control-prev-icon {
   background-image: url();
   line-height: 85px;
   width: 55px;
   height: 55px;
   border: 1px;
}
.carousel-control-next-icon {
   background-image: url();
   line-height: 55px;
   width: 55px;
   height: 65px;
}
#carouselExampleCaptions {
   margin-top: 25px;
   position: relative;
}
.carousel-item img {
   transition: 0.5s ease-in-out left;
}
.carousel-indicators button {
   width: 10px;
   height: 10px;
   border: solid 1px white;
   background: #eee;
   border-radius: 50%;
   -moz-border-radius: 50%;
   -webkit-border-radius: 50%;
}

.carousel-inner {
   height: 480px;

   z-index: 1;
}
.carousel-item img {
   background-repeat: no-repeat;
   height: 480px;
}
</style>
