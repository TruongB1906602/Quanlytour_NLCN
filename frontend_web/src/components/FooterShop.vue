<template>
       <footer class="footer">
            <div class="footer__contact grid wide">

                <div class="footer__contact-name">
                    <span class="footer__contact-text">Hãy giữ liên lac!</span>
                    <h4 class="footer__contact-heading">Liên Hệ với chúng tôi</h4>
                </div>
                <form action="" class="footer__contact-form">
                    <input type="text" name="" id="" class="footer__contact__input">
                    <label for="footer__contact-submit" class="footer__contact-submit-btn">GỬI</label>
                    <input type="submit" value="" hidden id="footer__contact-submit">
                </form>
            </div>

            <div class="footer__inner">
                <div class="grid wide">
                    <div class="row">
                        <div class="col l-6 m-12 c-12">
                            <img src="https://github.com/lucthienphong1120/travel/blob/main/logo.png?raw=true" alt="" class="footer__logo">
                            <p class="footer__desc">Travel Việt - Chơi thật tuyệt!
                               
                            </p>
                            <div class="footer__inner-contact">
                                <a href="#" class="footer__contact-logo"><ion-icon name="logo-facebook"></ion-icon></a>
                                <a href="#" class="footer__contact-logo"><ion-icon name="logo-youtube"></ion-icon></a>
                               
                                <a href="#" class="footer__contact-logo "><ion-icon name="logo-instagram"></ion-icon></a>
                            </div>
                        </div>
                        <div class="col l-2 m-4 c-12">
                            <ul class="footer__list">
                                <h3 class="footer__list-heading"><img src="@/assets/images/place.png" alt="">Điểm đến</h3>
                                <li class="footer__item">
                                  <ion-icon name="chevron-forward-outline"></ion-icon>
                                    <a href="#" class="footer__item-link">Phú Quốc</a>
                                </li>
                                <li class="footer__item">
                               <ion-icon name="chevron-forward-outline"></ion-icon>
                                    <a href="#" class="footer__item-link">Đà Nẵng</a>
                                </li>
                               
                            </ul>
                        </div>
                        <div class="col l-2 m-4 c-12">
                            <ul class="footer__list">
                                <h3 class="footer__list-heading"><ion-icon name="bed-outline"></ion-icon>Khách sạn</h3>
                                <li class="footer__item">
                                  <ion-icon name="chevron-forward-outline"></ion-icon>
                                    <a href="#" class="footer__item-link">Đặt phòng</a>
                                </li>
                                <li class="footer__item">
                                  <ion-icon name="chevron-forward-outline"></ion-icon>
                                    <a href="#" class="footer__item-link">Giải trí</a>
                                </li>
                              
                            </ul>
                        </div>
                        <div class="col l-2 m-4 c-12">
                            <ul class="footer__list">
                                <h3 class="footer__list-heading"><img src="@/assets/images/touring.png" alt="">Đặt tour</h3>
                                <li class="footer__item">
                                  <ion-icon name="chevron-forward-outline"></ion-icon>
                                    <a href="#" class="footer__item-link">Đi chơi</a>
                                </li>
                                <li class="footer__item">
                                   <ion-icon name="chevron-forward-outline"></ion-icon>
                                    <a href="#" class="footer__item-link">Đi phượt</a>
                                </li>
                              
                            </ul>
                        </div>
                    </div>

                </div>

                <div class="footer__copyright">
                    Copyright 2022 &copy; by 
                    <a href="https://www.facebook.com/profile.php?id=100045406261491" style="text-decoration: none;color: #fff;">LTP</a>
                </div>
            </div>
        </footer>
</template>
<style scoped>
  
.grid {
    width: 100%;
    display: block;
    padding: 0;
}

.grid.wide {
    max-width: 1500px;
    margin: 0 auto;
}

.col {
    width: 250px;
    padding-left: 4px;
    padding-right: 4px;
}

.row {
    display: flex;
    flex-wrap: wrap;
    margin-left: -4px;
    margin-right: -4px;
}
.footer {
  background-image: url(https://img.freepik.com/free-photo/beautiful-girl-standing-viewpoint-koh-nangyuan-island-near-koh-tao-island-surat-thani-thailand_335224-1094.jpg?w=1060&t=st=1660191862~exp=1660192462~hmac=e6b7e90de8606899037a0fba51e1943487de24967e73cf37d9ddbad432eacada);
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top:30px;
}
.footer__inner {
    padding: 35px 50px 50px;
    background-color: var(--white-color);
    position: relative;
}
.footer__contact {
  height: 110px;
  padding: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer__contact-name {
  margin-right: 144px;
}

.footer__contact-text {
  font-size: 14px;
  color: #9a9a9a;
}

.footer__contact-heading {
  margin: 24px 0;
  font-size: 1.5rem;
  color:  #555555;
}

.footer__contact__input {
  width: 250px;
  height: 40px;
  padding: 0 18px;
  font-size: 1rem;
  color:#9a9a9a;
  border-radius: 100px;
  outline: none;
  border: none;
}

.footer__contact-submit-btn {
  margin: 0 16px;
  font-size: 1rem;
  background-color: #14b9d5;
  color: #ffffff;
  padding: 8px 24px;
  border-radius: 100px;
  cursor: pointer;
}

.footer__inner {
  
  background-color: #ffffff;
  --blue-color: #14b9d5;
  position: relative;
}

.footer__logo {
  width: 150px;
}

.footer__desc {
  color:#9a9a9a;
  font-size: 1rem;
  letter-spacing: 1px;
 
}

.footer__contact-logo {
  text-decoration: none;
  display: inline-block;
  font-size: 2.2rem;
  color: #555555;
  margin-right: 12px;
}

.footer__list {
  padding-left: 0;
}

.l-6 {
    flex: 0 0 50%;
    max-width: 40%;
}
.footer__list-heading {
 
  font-size: 1.4rem;
  color: #555555;
  font-weight: 600;
  margin: 25px 0 35px;
}

.footer__item {
  font-size: 1.4rem;
  color: #9a9a9a;
  list-style-type: none;
  display: flex;
  align-items: center;
  padding: 6px 0;
  position: relative;
  left: 0;
  transition: all linear 0.2s;
}

.footer__item:hover {
  left: 8px;
}

.footer__item-icon {
  font-size: 1rem;
}

.footer__item-link {
  display: inline-block;
  margin-left: 4px;
  color:#9a9a9a;
  text-decoration: none;
}

.footer__copyright {
  background-color: #14b9d5;
  color:#ffffff;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  font-size: 1rem;
  line-height: 50px;
  text-align: center;
}

</style>