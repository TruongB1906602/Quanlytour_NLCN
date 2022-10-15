<script>
export default {
	props: {
		products: { type: Object, required: true },
	},
      data() {
        return {
            showModal: true
        };
    },
};
</script>
<template>
 <div id="app">
 
 <Transition name="fade" appear>
  <div class="modal-overlay" v-if="showModal" @click="showModal = false"></div>
 </Transition>
 <transition name="slide" appear>
  <div class="modal" v-if="showModal">
  
    <div class="d-flex">
        
		<div class="p-1 d-fex flex-column img">
			<img :src=" products.img[0]" alt="img" width="100">
		</div>
        <div>
            <div class="p-1">
                <strong>Điểm khởi hành:</strong>
                {{products.destination}}
            </div>
            <div class="p-1">
                <strong>Ngày khởi hành :</strong>
                {{products.date}}
            </div>
            <div class="p-1">
                <strong>Thời gian:</strong>
                {{products.time}}
            </div>
              <div class="p-1">
                <strong>SL tour:</strong>
                {{products.sl}}
            </div>

            <div class="p-1">
                <strong>Giá:</strong>
                {{products.price}}
            </div>
              <router-link
                        :to="{
						name: 'editproduct',
						params: { id: this.products._id },
					}"
                        ><button class="button">
                            <span >
                            <i class="bi bi-pencil-square"></i> Chỉnh sửa</span></button>
             </router-link>
              <button class="button" @click="showModal = false">
                      Close 
            </button>
            
        </div>
	</div> 

  </div>
 </Transition>
</div>
	
</template>


<style lang="scss">

#app {
 position: relative;
 z-index:5;
 justify-content: center;
 align-items: center;
 width: 100%;
 min-height: 100%;
 overflow-x: hidden;
 display: block;
}
.col{
    border: 1px solid grey;
}
.button {
 appearance: none;
 outline: none;
 border: none;
 background: none;
 cursor: pointer;
 margin:3px 5px;
 display: inline-block;
 padding: 5px 10px;
 background-image: linear-gradient(to right, #CC2E5D, #FF5858);
 border-radius: 8px;
 
 color: #FFF;
 font-size: 14px;
 font-weight: 700;
 
 box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
 transition: 0.4s ease-out;
 
 &:hover {
  box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
 }
}
.img{
    width:220px;
}
.img img{
    width:200px;
    height: 200px;
    border-radius: 3%                                               ;
}
.modal-overlay {
  position: absolute;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 z-index: 1;
 background-color: rgba(0, 0, 0, 0.3);
}

.modal {
 position: fixed;
 top: 30%;
 left: 40%;
 width:60%;
  transform: translate(-30%, -30%);
 max-width: 500px;
 height: 250px;
 background-color:#c1efde;
 border-radius: 16px;
 display: inline-block;
 padding: 20px;
 
 h1 {
  color: #222;
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 15px;
 }
 
 p {
  color: #666;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 15px;
 }
}

.fade-enter-active,
.fade-leave-active {
 transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
 opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
 transition: transform .5s;
}

.slide-enter,
.slide-leave-to {
 transform: translateY(-50%) translateX(100vw);
}

</style>