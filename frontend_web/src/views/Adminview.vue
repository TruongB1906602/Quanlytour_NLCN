<script>

    import ListUser from "../components/ListUser.vue";
    import AdminService from "../services/Admin.service";
    import toastsVue from "../components/toasts.vue";
    import ListProduct from "../components/ListProduct.vue";
    import Listtourguide from "../components/Listtourguide.vue";
    import ListOrder from "@/components/ListOrder.vue";
    import ListHotel from "../components/ListHotel.vue";
    import ListNews from "../components/ListNews.vue";
    import Productcard from "../components/Productcard.vue";
    import Hotelcard from "../components/Hotelcard.vue";
    import Usercard from "../components/Usercard.vue";
    import Paycard from "../components/Paycard.vue";
    import Addcreatepay from "@/views/Addcreatepay.vue";
    import AddProduct from "@/views/AddProduct.vue";

    import EditPay from "../views/EditPay.vue";
    import EditProduct from "../views/EditProduct.vue";
    import toast from "../assets/js/toasts";
    import PayList from "../components/ListPay.vue";
    import Addnews from "@/views/Addnews.vue";
        export default{
            data(){
                return{
                    users:[],
                    products:[],
                    hotels:[],
                    pays:[],
                    orders:[],
                    news:[],
                    activeIndex:-1,
                    activeIndex1:-1,
                    activeUser:-1,
                    activeNews:-1,
                    activeIndexPay:-1,
                    activeIndexOrder:-1,
               
                    toasts:{
                        title:"Warning",
                        msg:"Bạn không phải ADMIN",
                        type:"warn",
                        duration:2000
                     },
                          currentBlock: 4
                        
                }
            },
            computed:{
                 getindex(){
                     if(this.activeIndex!=-1){
                         const list = document.querySelectorAll(".product-item");
                         list.forEach(element => {
                             element.classList.remove("active");
                         });
                         list[this.activeIndex].classList.add("active");
                        return this.products[this.activeIndex];
                     }
                },
                 getindexhotels(){
                     if(this.activeIndex1!=-1){
                         const list = document.querySelectorAll(".hotel-item");
                         list.forEach(element => {
                             element.classList.remove("active");
                         });
                         list[this.activeIndex1].classList.add("active");
                        return this.hotels[this.activeIndex1];
                     }
                },
                  getindexpay(){
                     if(this.activeIndexPay!=-1){
                         const list = document.querySelectorAll(".pay-item");
                         list.forEach(element => {
                             element.classList.remove("active");
                         });
                         list[this.activeIndexPay].classList.add("active");
                        return this.pays[this.activeIndexPay];
                     }
                },
                
                getindexorder(){
                     if(this.activeIndexOrder!=-1){
                         const list = document.querySelectorAll(".order-item");
                         list.forEach(element => {
                             element.classList.remove("active");
                         });
                         list[this.activeIndexOrder].classList.add("active");
                        return this.orders[this.activeIndexOrder];
                     }
                },
                  getindexuser(){
                     if(this.activeUser!=-1){
                         const list = document.querySelectorAll(".user-item");
                         list.forEach(element => {
                             element.classList.remove("active");
                         });
                         list[this.activeUser].classList.add("active");
                            return this.users[this.activeUser];
                    }
                },
                getindexnews(){
                     if(this.activeNews!=-1){
                         const list = document.querySelectorAll(".news-item");
                         list.forEach(element => {
                             element.classList.remove("active");
                         });
                         list[this.activeNews].classList.add("active");
                            return this.news[this.activeNews];
                    }
                }
            },
            components:{
                ListUser,
                ListProduct,
                toastsVue,
                Productcard,
                Usercard,
                ListHotel,
                Hotelcard,
                Listtourguide,
                PayList,
                Paycard,
                ListOrder,
                Addcreatepay,
                AddProduct,
                EditProduct,
                EditPay,
                Addnews,
                ListNews,
},
            methods:{
                   showBlock(number) {
                    this.currentBlock = number;

                },
                show(){
                    var el = document.getElementById("wrapper");
                     var toggleButton = document.getElementById("menu-toggle");
    
                      toggleButton.onclick = function () {
                       el.classList.toggle("toggled");
            };
                },
                toast,
                    async getall(){
                try{
                    const data = await AdminService.getAll();
                        this.products =data.Products;
                        this.hotels = data.Hotels;
                        this.users = data.Users;
                        this.pays =  data.Pays;
                        this.orders = data.Orders;
                        this.news = data.News;
                }catch(error){
                    this.toast();
                        setTimeout(()=>{
                            this.$router.push({name:"ShopMain"});
                        },1000);
                    }
                },
            },
        created(){
            this.getall();
        },
    }
    </script>
    
    <template>
     <div>
            <HeaderShopVue></HeaderShopVue>
            <toastsVue></toastsVue>
            <div class="header text-center">
                    <h2>Quản trị viên</h2>
            </div>
        
              <div class="d-flex" id="wrapper">
            <!-- Sidebar -->
            <div class="bg-white" id="sidebar-wrapper">
                <div class="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom">  
                  
                     <img style="width:50px;margin-bottom: 25px;" src="https://cdn-icons-png.flaticon.com/512/2206/2206248.png" alt="">
                     Admin
                </div>
                <div class="list-group list-group-flush my-3">
                <nav class="nav-bar">

                    <ul class="menu">
                        <li>
                            <label for="" class="first"><i class="fa-solid fa-gauge"></i>Dashboard</label>
                        </li>
                        <li >
                            <label for="btn-3" class="second">  
                                <i class="fa-solid fa-person-military-pointing"></i>
                                Quản lý khách hàng 
                                <span class="fas fa-caret-down"></span>

                            </label>
                            <input type="checkbox" name="" id="btn-3">
                            <ul>
                                <li @click="showBlock(1)"> <a href="#listcustomers" >DS Khách hàng</a></li>
                                <li @click="showBlock(2)"> <a href="#addcustomer" >Thêm khách hàng</a></li>
                            </ul>
                        </li>
                        <!-- <li @click="showBlock(3)" >
                               <a href="#hotels"> <label for="" class="four">
                                    <i class="fa-solid fa-hotel"></i>
                                    Quản lí khách sạn </label></a>
                        </li> -->

                        <li >
                            <label for="btn-4" class="five">
                                 <i class="fa-sharp fa-solid fa-plane"></i>
                                 Quản lí tour 
                                <span class="fas fa-caret-down"></span>
                            </label>
                                <input type="checkbox" name="" id="btn-4">
                            <ul>
                                <li @click="showBlock(4)"><a href="#listtour" ><i class="fa-solid fa-list"></i>Danh sách tour</a>
                                </li>
                                <li @click="showBlock(5)"><a href="#addtour"><i class="fa-sharp fa-solid fa-plus"></i>Thêm Tour mới</a>
                                </li>
            
                            </ul>
                        </li>
                       <li @click="showBlock(6)">
                           <a href="#user"> <label for="" >
                            <i class="fa-solid fa-user"></i>
                            Quản lí người dùng </label></a>
                        </li>

                        <li @click="showBlock(7)">
                            <a href="#tourguide">   <label for="">
                                <img style="width:20px;" src="https://cdn-icons-png.flaticon.com/512/3986/3986295.png" alt="">
                            Quản lí hướng dẫn viên</label></a>
                        </li>

                        <li  @click="showBlock(8)">
                            <a href="#payments">  
                                <label >
                                <i class="fa-solid fa-credit-card"></i>
                                    Quản lý thanh toán
                                </label>
                            </a>
                
                           
                        </li>
                       
                        <li >
                            <label for="btn-5" class="six">
                                <i class="fa-solid fa-newspaper"></i>
                                 Quản lí tin tức
                                <span class="fas fa-caret-down"></span>
                            </label>
                                <input type="checkbox" name="" id="btn-5">
                            <ul>
                                <li @click="showBlock(10)"><a href="#news" ><i class="fa-solid fa-list"></i>Tin tức</a>
                                </li>
                                <li @click="showBlock(9)"><a href="#addnews"><i class="fa-sharp fa-solid fa-plus"></i>Thêm tin mới</a>
                                </li>
            
                            </ul>
                        </li>
                        
                        
                        
                    </ul>
                </nav>
                </div>
            </div>
            <!-- /#sidebar-wrapper -->
    
            <!-- Page Content -->
            <div id="page-content-wrapper">
                <nav class="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                    <div class="d-flex align-items-center">
                        <img  @click="show" style="width:21px; height:24px;margin-right:5px;" src="https://cdn-icons-png.flaticon.com/512/1828/1828765.png"  id="menu-toggle"  alt="">
                    
                        <h2 class="fs-2 m-0">Dashboard</h2>
                    </div>
    
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
    
                   
                </nav>
    
                <div class="container-fluid px-4">
                    <div class="row g-3 my-2">
                        <div class="col-md-3">
                            <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                <div>
                                    <h3 class="fs-2">10</h3>
                                    <p class="fs-5">Tours</p>
                                </div>
                                <i class="fas fa-gift fs-1 primary-text border rounded-full secondary-bg p-3"></i>
                            </div>
                        </div>
    
                        <div class="col-md-3">
                            <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                <div>
                                    <h3 class="fs-2">15</h3>
                                    <p class="fs-5">Sales</p>
                                </div>
                                <i
                                    class="fas fa-hand-holding-usd fs-1 primary-text border rounded-full secondary-bg p-3"></i>
                            </div>
                        </div>
    
                        <div class="col-md-3">
                            <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                <div>
                                    <h3 class="fs-2">20</h3>
                                    <p class="fs-5">Delivery</p>
                                </div>
                                <i class="fas fa-truck fs-1 primary-text border rounded-full secondary-bg p-3"></i>
                            </div>
                        </div>
    
                        <div class="col-md-3">
                            <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                <div>
                                    <h3 class="fs-2">%25</h3>
                                    <p class="fs-5">Increase</p>
                                </div>
                                <i class="fas fa-chart-line fs-1 primary-text border rounded-full secondary-bg p-3"></i>
                            </div>
                        </div>
                    </div>
    
                    <div class="row my-5">
                    
                        <div class="col">   
                        
                            <div class="list_products" v-if= "currentBlock==1">
                                <div class="heading">
                                    <h4>Danh Sách Khách Hàng </h4>
                                </div>
                    
                                <div class="list_item_product d-flex" id="product" >
                                    <PayList :pays="pays" :refeshlist="getall" :getindexpay="getindexpay" v-model:activeIndexPay="activeIndexPay">
                                    
                                    </PayList>
                                
                                    <div class="card_product border border-light border-2 h-100 bg-light text-dark" style="padding: 10px;" v-if="getindexpay">  
                                        <h5>Chi tiết </h5>
                                        <Paycard :pays="getindexpay"></Paycard>     
                                        <router-link
                                            :to="{
                                            name: 'editpay',
                                            params: { id: getindexpay._id },
                                            }"
                                        >
                                            <span class="badge bg-warning text-dark">
                                            <i class="bi bi-pencil-square"></i> Chỉnh sửa</span>
                                        </router-link>
                                    
                                    </div>
                            
                                </div>
                            
                            </div>    
                            <div class="tour-add" v-else-if="currentBlock == 2">
                                <Addcreatepay class="addcreatepay"/>
                            </div> 
                             
                            <div class="list_hotels"  v-if="currentBlock == 3" >
                                <div class="heading">
                                    <h3 class="fs-4 mb-3">Danh sách khách sạn</h3>
                                    <router-link to="/addhotel">
                                        <button class="btn btn-danger"><i class="fa-solid fa-folder-plus"></i> Tạo mới</button>
                                    </router-link>
                                </div> 
                                    <div class="list_item_product d-flex" id="product"  >
                                        <ListHotel :hotels="hotels" :refeshlist="getall" :getindexhotels="getindexhotels"   v-model:activeIndex1="activeIndex1">
                                        </ListHotel>
                                        <div class="card_product border border-light border-2 h-100 bg-light text-dark" style="padding: 10px;" v-if="getindexhotels">  
                                        <h5>Chi tiết khách sạn</h5>
                                        <Hotelcard :hotels="getindexhotels"></Hotelcard> 
                                        <router-link
                                            :to="{
                                            name: 'edithotel',
                                            params: { id: getindexhotels._id },
                                            }"
                                        >
                                        <span class="badge bg-warning text-dark">
                                        <i class="bi bi-pencil-square"></i> Chỉnh sửa</span>
                                        </router-link>
                                    </div>
                                </div>
                                
                            </div>
    
                            <div class="list-tour"  v-else-if="currentBlock == 4" >
                                <div class="heading">
                                    <h3 class="fs-4 mb-3">Danh sách tour</h3>
                                </div>
                                <div class="list_item_product d-flex" id="product" > 
                                    <ListProduct :products="products" :refeshlist="getall" :getindex="getindex" v-model:activeIndex="activeIndex">
                                    </ListProduct>
                                </div>
                                
                            </div>
             
                            <div class="create-tour"  v-else-if="currentBlock == 5" >
                                <AddProduct/>
                            </div>
                          
                          
                          

                            <div style="width:100%"  v-else-if="currentBlock == 6" >
                                <div class="list_users1 w-50" >
                                    <div class="heading">
                                    <h3 class="fs-4 mb-3">Danh sách người dùng</h3>
                                </div>
                                    <div class="list_item_user d-flex" id="user">
                                        <ListUser :users="users"  :refeshlist="getall" v-model:activeUser="activeUser">
                                        </ListUser>
                                      
                                        </div>
                                    </div>
                            </div> 
                            <div v-else-if="currentBlock == 7" >
                                <div  class="list_hotels" >
                                    <div class="heading">
                                    <h3 class="fs-4 mb-3">Danh sách hướng dẫn viên</h3>
                                    </div>
                                
                                    <div class="list_item_product d-flex">
                                            
                                        <Listtourguide :users="users"  :refeshlist="getall" v-model:activeUser="activeUser">
                                        </Listtourguide> 
                                        <div class="card_product border border-light border-2 h-100 bg-light text-dark" style="padding: 10px;" v-if="getindexuser">  
                                            <router-link
                                                :to="{
                                                name: 'edittourguide',
                                                params: { id: getindexuser._id },
                                                }"
                                            >
                                            <span class="badge bg-warning text-dark">
                                                <i class="bi bi-pencil-square"></i> Chỉnh sửa</span>
                                            </router-link>
                                        </div>
                                        
                                
                                    </div>
                                
                                </div>

                            
                            </div> 
                            <div class="tour"  v-else-if="currentBlock == 8 " >
                                <div class="heading">
                                    <h3 class="fs-4 mb-3">Danh sách tour đã đặt</h3>
                                </div>
                                    <div class="list_item_product d-flex" id="product" >
                                        <ListOrder :orders="orders" :refeshlist="getall" :getindexorder="getindexorder" v-model:activeIndexOrder="activeIndexOrder">
                                        </ListOrder>
                                    
                                    </div>
                                
                            </div>
                            <div class="create-tour"  v-else-if="currentBlock ==9" >
                              <Addnews/>
                             </div>

                             <div class="list-tour"  v-else-if=" currentBlock ==10" >
                                <div class="heading">
                                    <h3 class="fs-4 mb-3">Tin Tức</h3>
                                </div>
                                <div class="list_item_news d-flex" id="news" > 
                                    <ListNews :news="news" :refeshlist="getall" :getindexnews="getindexnews" v-model:activeNews="activeNews">
                                    </ListNews>
                                </div>
                                
                            </div> 
    
                            
                        </div>
                    </div>
    
                </div>
            </div>
    </div>
        
    
     </div>
     
                                           
    </template>
    <style scoped>
   
    :root {
      --main-bg-color: #009d63;
      --main-text-color: #009d63;
      --second-text-color: #bbbec5;
      --second-bg-color: #c1efde;
    }
    .card_product{
    
     height:30px;
     z-index:7;
    }
    .list_users1{
        display: block;
       
    }
    .products{
         
          width:100%;
    }
    .bg-white{
        background: rgb(0, 28, 64);
    
    }
    
    .tour-heading{
         margin: 5px 19px;
    }
     .list_hotels{
        
          width:100%;
    } 
     
    .col{
       
        position: relative;
        background: #ffffff;
        border-radius: 0.375rem;
        padding: 20px;
    }
    .heading{
        padding-left: 5px;
        width:96%;
        height: 40px;
        margin-left: 20px;
        margin-bottom: 15px;
        border-left: 7px solid #FFD43B;
        background: #eee; 
        padding-bottom: 10px;
        padding-top: 5px;
    }
    
    .list-group-item:hover{
         color: tomato;
    }
    .primary-text {
     
      color: var(--main-text-color);
    }
    
    .second-text {
      color: var(--second-text-color);
    }
    
    .primary-bg {
      background-color: var(--main-bg-color);
    }
    
    .secondary-bg {
      background-color: var(--second-bg-color);
    }
    
    .rounded-full {
      border-radius: 100%;
    }
    
    #wrapper {
      overflow-x: hidden;
      background-image: linear-gradient(
        to right,
        #baf3d7,
        #c2f5de,
        #cbf7e4,
        #d4f8ea,
        #ddfaef
      );
    }
    
    #sidebar-wrapper {
      min-height: 100vh;
      margin-left: -15rem;
      -webkit-transition: margin 0.25s ease-out;
      -moz-transition: margin 0.25s ease-out;
      -o-transition: margin 0.25s ease-out;
      transition: margin 0.25s ease-out;
    }
    
    #sidebar-wrapper .sidebar-heading {
      padding: 0.875rem 1.25rem;
      font-size: 1.2rem;
    }
    
    #sidebar-wrapper .list-group {
      width: 15rem;
    }
    
    #page-content-wrapper {
      min-width: 100vw;
    }
    
    #wrapper.toggled #sidebar-wrapper {
      margin-left: 0;
    }
    
    #menu-toggle {
      cursor: pointer;
    }
    
    .list-group-item {
      border: none;
      padding: 20px 30px;
      font-size: 15px;
    }
    
    .list-group-item.active {
      background-color: transparent;
      color: var(--main-text-color);
      font-weight: bold;
      border: none;
    }
    
    @media (min-width: 768px) {
      #sidebar-wrapper {
        margin-left: 0;
      }
    
      #page-content-wrapper {
        min-width: 0;
        width: 100%;
      }
    
      #wrapper.toggled #sidebar-wrapper {
        margin-left: -15rem;
      }
    }
 .nav-bar{
  margin-top:20%;
  
   
  width:270px;
  height: 200px;
  line-height: 40px;
  padding: 1px 10px;
 border-radius: 5px;


}
.nav-bar label{
  color: #1b1b1b;
  font-size: 18px;
  display: block;
  cursor:pointer;
  width: 90%;

   font-weight:500;
   border: 1px solid grey;
 

}
.buttondrop span{
  float: right;
  line-height: 35px;

}
nav.nav-bar ul{
   padding: 0px;
  background: white;
  list-style: none;
  margin-top:15px;
 
  width: 90%;
  
  border-radius: 5px;
  display: block;

}
[id^=btn-5]:checked + ul{
  display: block;

}
[id^=btn-4]:checked + ul{
  display: block;
}


[id^=btn-3]:checked + ul {
  display: block;
}
.nav-bar ul li{
  line-height: 40px;
  padding: 6px 0px;
  font-size: 16px;
  cursor: pointer;
   border-bottom: 1px solid rgba(0,0,0,0.2); 
}
.nav-bar ul li label{
    font-size: 16px; 
    width: 100%;
    border: none;

}
.nav-bar ul li a{
  color:white;
  text-decoration: none;
  font-size: 16px;
  display: block;
}
.nav-bar ul ul{
  position: static;
  display: none;
}
.nav-bar ul ul li{
  line-height:30px ;
  padding-left: 30px;
  border-bottom: none;
  font-weight: 500;

}
.nav-bar ul ul li a{
  color: black;
  font-size: 15px;

}
nav.nav-bar ul li span{
  font-size: 18px;
  float: right;
  margin-top: 15px;
  padding: 0 10px;
}
nav.nav-bar .menu:before{
 position: absolute; 
 content: '';
 
 height: 20px;
 width: 20px;
 margin-top: -10px;
 margin-left: 315px;
 
 transform: rotate(180deg);

  z-index: -1; 
}
.fas:hover{
  transform: rotate(185deg);

}
nav.nav-bar ul li a:hover,
nav.nav-bar ul li label:hover{
  color:cyan;
}

input{
  display: none;
}
  </style>