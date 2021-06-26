<template>
  <div id="publish-order">
    <my-header></my-header>
    <el-form
        :model="orderForm"
        ref="orderInfo"
        :rules="rules"
        class="w order-form"
    >
      <el-form-item prop="publisherContact" label="手机号码(仅对接单人可见)">
        <el-input v-model.number="orderForm.publisherContact"></el-input>
      </el-form-item>
      <el-form-item prop="orderCategoryId" label="派单类型">
        <el-select v-model="orderForm.orderCategoryId" placeholder="请选择">
          <el-option
              v-for="c in orderCategory"
              :key="c.id"
              :label="c.name"
              :value="c.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="takeAddress" label="取货地址">
        <el-input v-model="orderForm.takeAddress"></el-input>
      </el-form-item>
      <el-form-item prop="sendAddress" label="送货地址">
        <el-input v-model="orderForm.sendAddress"></el-input>
      </el-form-item>
      <el-form-item prop="orderNote" label="备注">
        <el-input
            type="textarea"
            :rows="3"
            v-model="orderForm.orderNote"
            placeholder="说说你还需要什么..."
        ></el-input>
      </el-form-item>
      <el-form-item prop="price" label="价格">
        <el-input v-model.number="orderForm.price">
          <template #append>元</template>
        </el-input>
      </el-form-item>
      <el-form-item class="submit">
        <el-button type="primary" @click="onSubmit">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import MyHeader from "components/content/MyHeader";
import {useStore} from "vuex";
import {reactive, ref, toRefs} from "vue";
import {checkPhone} from "@/utils/formRules.js";
import {publishOrder} from "network/order.js";
import {useRouter} from "vue-router";

export default {
  name: "PublishOrder",
  components: {MyHeader},
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      orderCategory: store.state.orderCategory,
      orderForm: {
        publisherId: store.state.user.userId,
        publisherContact: null,
        orderCategoryId: 1,
        takeAddress: "",
        sendAddress: "",
        orderNote: "",
        price: "",
      },
      rules: {
        publisherContact: [{validator: checkPhone, trigger: "blur"}],
        takeAddress: [
          {required: true, message: "取货地址不能为空", trigger: "blur"},
        ],
        sendAddress: [
          {required: true, message: "送货地址不能为空", trigger: "blur"},
        ],
        price: [
          {required: true, message: "价格不能为空"},
          {type: 'number', message: "请输入正确的数字"},
          {
            validator: (rules, value, callback) => {
              if (value <= 0) {
                return callback(new Error("价格不能低于0元"));
              } else callback();
            }
          }
        ],
      },
    });
    const orderInfo = ref(null);
    const onSubmit = () => {
      orderInfo.value.validate((valid) => {
        if (valid) {
          orderInfo.value = state.orderForm;
          publishOrder(orderInfo.value).then((res) => {
            if (res.code == 200) {
              router.push({name: 'MyPublished'});
            }
          });
        }
      });
    };
    return {
      ...toRefs(state),
      store,
      orderInfo,
      onSubmit,
    };
  },
};
</script>

<style scoped>
.order-form {
  box-sizing: border-box;
  padding: 60px 200px;
  font-weight: 700;
  font-size: 1.1em;
}

.submit {
  margin: 40px 250px;
  width: 150px;
}
</style>