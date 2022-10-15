<script>
export default {
	props: {
		hotels: { type: Object, required: true },
	},
};
</script>
<template>
	<div class="d-flex">
		<div class="p-1 d-fex flex-column">
			<img :src=" hotels.img[0]" alt="img" width="100">
		</div>
        <div>
            <div class="p-1">
                <strong>Tên khách sạn:</strong>
                {{hotels.title}}
            </div>
            <div class="p-1">
                <strong>Giá :</strong>
                {{hotels.price}}
            </div>
            <div class="p-1">
                <strong>Khu vực:</strong>
                {{hotels.area}}
            </div>
              <div class="p-1">
                <strong>Ảnh:</strong>
                {{hotels.img}}
            </div>
            <div class="p-1">
                <strong>Địa chỉ:</strong>
                {{hotels.address}}
            </div>
            <div class="p-1">
                <strong>Mô tả:</strong>
                {{hotels.desc}}
            </div>
              <div class="p-1">
                <strong>Loại:</strong>
                {{hotels.categories}}
            </div>
               <div class="p-1">
                <strong>Giá:</strong>
                {{hotels.price}}
            </div>
           
        </div>
	</div>
</template>
