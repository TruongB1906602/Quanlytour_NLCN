<script>
    export default {
        props: {
            pays: { type: Object, required: true },
        },
    };
    </script>
    <template>
        <div class="d-flex">
                 <div>
                <div class="p-1">
                    <strong>Tên khách hàng:</strong>
                    {{pays.name}}
                </div>
                 <div class="p-1">
                    <strong>Thông tin :</strong>
                    {{pays.others}}
                </div> 
                <div class="p-1">
                    <strong>Địa chỉ:</strong>
                    {{pays.address}}
                </div>
                 
              
                <div class="p-1">
                    <strong>Điện thoại:</strong>
                    {{pays.phone }}
                </div>
               
               
            </div>
        </div>
    </template>
    