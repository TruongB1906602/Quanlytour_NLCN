
<script>
    import HotelService from "../services/Hotel.service";
import toastjs from "../assets/js/toasts";
import ListHotel from "../components/ListHotel.vue"

    export default {
     
      data() {
        return{
            title:"",
   }    
      
      },
      components:{
        ListHotel,
      },
      props:{
            hotels:Array,
            refeshlist:Function,
            activeIndex1: { type: Number, default: -1 },
        },
        emits: ["update:activeIndex1"],
  
        computed:{
            filterhotelsByName: function() {
                return this.hotels.filter(hotel => !hotel.title.indexOf(this.title.charAt(0).toUpperCase(0)))
       
 
            },
        }
       
    
    };
    </script>
    
    <template>
      <div class="container">
            <form action="" class="form-inline">
              <h1> <label for="">Tìm kiếm</label>
                <input type="text"  class="form-control" v-model="title">
         
              </h1>

            </form>
            <div class=" row-cols-1">
        <h4 class="heading" >Tên tour</h4>
        <div class="title" v-for="hotel in filterhotelsByName"
			                :key="hotel._id"
		>
        
                <span>{{hotel.title}}</span>
         </div>
           
     </div>
      <div class=" row-cols-1" >
          <h4 class="heading">Giá</h4>
        <div  class="price" v-for="hotel in filterhotelsByName"
			:key="hotel._id"
          
		>
			<span>{{hotel.price}}</span></div>
           
        </div>
        
      
      
         <div class=" row-cols-1" >
         <h4 class="heading">Ảnh</h4>
        <div  class="images" v-for="hotel in filterhotelsByName"
			:key="hotel._id"
         
		>
			    <img :src=hotel.img[0] style="width: 110px; height:60px; margin: 0px 5px;" alt="">
            </div>
           
        </div>
          <div class=" row-cols-1" >
        <h4 class="heading">Chức năng</h4>
        <div  class="btn list-group-item hotel-item d-flex" v-for="(hotel, index) in filterhotelsByName"
        
			:key="hotel._id"
            @click="updateActiveIndex(index)"
           
		>
		  <button class=" btn-outline-danger btn-sm" @click="delhotel(hotel._id)"><ion-icon name="close-circle-outline"></ion-icon></button>
           <button class=" btn-outline-danger btn-sm" @click="updateActiveIndex(hotel._id)"><ion-icon name="create-outline"></ion-icon></button>
           </div>
        </div>
</div>
 </template>
<style scoped>
  
 .title:hover{
      background-color: #0d6efd;
        color: azure;

 }
.col{
    border: 1px solid  #dee2e6;
    font-size: 14px;
    
}

.btn button{
    font-size: 18px;
     border: 1px solid #dee2e6;
     background:#FBE2C5;
     margin: 0 5px;
}
.btn{
     font-weight: 500;
    font-size: 12px;
    padding: 20px;
     border: 1px solid #dee2e6;
        background: white;
      
}
.sl{
    height:80px;
     font-weight: 500;
    font-size: 12px;
    padding: 20px;
     border: 1px solid #dee2e6;
        background: white;
      
}
.price{
     border: 1px solid #dee2e6;
    height: 80px;
    font-size: 14px;
     width: 100px; 
    font-weight: 500;
    padding: 10px;
       background: white;
    

} 
.heading{
    cursor: pointer;
    position: relative;
    border: 1px solid grey;
    background: #eee;
    font-size: 16px;
    display: flex;
   justify-content: center;
   align-items: center;
   height :35px;
 
}
.date{
    border: 1px solid #dee2e6;
    height: 80px;
    font-size: 14px;
     font-weight: 500;
    /* width: 30%; */
      width: 100px; 
      padding: 10px;
         background: white;
}
.title{
     border: 1px solid #dee2e6;
    height: 80px;
    font-size: 14px;
     font-weight: 500;
     padding: 10px;
     overflow: hidden;
        background: white;
    
}
.images{
     border: 1px solid #dee2e6;
    height: 80px;
    font-size: 14px;
    overflow: hidden;
    padding: 10px;
    width: 150px;
    background: white;
    
    
    
    
}
.row-cols-1{
    /* width: 10%; */
    height: 20%;
   

}
.container{
    display: flex;
    margin-left: 50px;
    max-width: 100%;
}

</style> 