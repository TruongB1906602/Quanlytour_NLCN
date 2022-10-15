<template> 
    <div class="container">
                    <div class="main">
                             <img src="@/assets/images/captreo.jpg" class="img-feature" alt="">
                            <div class="control prev">Prev</div>
                            <div class="control next">Next</div>
                        

                        </div>
                        <div class="list-image">
                             <div > <img src="@/assets/images/captreo.jpg" alt=""></div>  
                             <div class="active" @click="getdata"> <img src="@/assets/images/phan_thiet.jpg" alt=""></div> 
                             <div> <img src="@/assets/images/caumucdem.jpg" alt=""></div> 
                             <div> <img src="@/assets/images/caumucdem.jpg" alt=""></div> 
                             <div> <img src="@/assets/images/caumucdem.jpg" alt=""></div> 
                             <div> <img src="@/assets/images/caumucdem.jpg" alt=""></div> 

                    </div>

            </div>

</template>
<script>
  export default {
      
       
        methods:{
            
           
          getdata(){
         var imgFeature = document.querySelector('.img-feature')
var listImg = document.querySelectorAll('.list-image img')
var prevBtn = document.querySelector('.prev');
var nextBtn = document.querySelector('.next');



var currentIndex=0;

  listImg.forEach((imgElement,index) => {

    imgElement.addEventListener('click', e=> {
        imgFeature.style.opacity= '0'
      
        setTimeout(() =>{
            document.querySelectorAll('.list-image div').forEach(item =>{
                item.classList.remove('active')
            })
              currentIndex= index;
              imgFeature.src=  listImg[index].getAttribute('src')
              listImg[index].parentElement.classList.add('active');
            imgFeature.style.opacity= '1'
        },400)
    })


  })
  prevBtn.addEventListener('click',e=> {
    imgFeature.style.animation
            if(currentIndex ==0){
                currentIndex = listImg.length -1
            }else{
                currentIndex--
            }
            document.querySelectorAll('.list-image div').forEach(item =>{
                item.classList.remove('active')
            })
            index=currentIndex
              imgFeature.src=  listImg[index].getAttribute('src')
              listImg[index].parentElement.classList.add('active');
            imgFeature.style.animation= ''
            setTimeout(() =>{
            
                imgFeature.style.animation= 'slideLeft 1s ease-in-out forwards'
            },200)
  })
  nextBtn.addEventListener('click',e=> {
    if(currentIndex == listImg.length -1){
        currentIndex = 0
    }else{
        currentIndex++
    }
    document.querySelectorAll('.list-image div').forEach(item =>{
        item.classList.remove('active')
    })
      index=currentIndex
      imgFeature.src=  listImg[index].getAttribute('src')
      listImg[index].parentElement.classList.add('active');
}) 
document.querySelectorAll('.list-image div').forEach(item =>{
    item.classList.remove('active')
})
  index=0;
  imgFeature.src=  listImg[index].getAttribute('src')
  listImg[index].parentElement.classList.add('active');


    
             },
        

                
    
              
        }
  }
</script>

<style scoped>  
        .container{
            width: 100%;
            height: 100%;
            margin: 50px auto;

        }
        .main{
            width: 500px;
            height: 300px;
            position: relative;
          
            overflow: hidden;
            
        }
        .list-image{
            width: 40%;
            height: 10%;
            justify-content: center;
            display: flex;
        }
        .list-image div{
            flex:1;
            padding: 5px;
        }
       
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;

        }
        .img-feature{
          
            width: 500px;
        
        }
        .control{
            position: absolute;
            top: 50%;
            font-size: 50px;
            color: white;
            transform: translateY(-50%);
        }
        .prev{
            left: 10px;
        }
        .next{
            right: 10px;
        }
        .active{
            border:1px solid red;
        }
        /* @keyframes slideLeft{
            0%{
                transform: translateX(100%);
            }
            100%{
                transform: translateX(0);
            }
        } */

</style>