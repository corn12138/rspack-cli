<template>
  <div>
    <div class="register-wrapper">
      <div class="register-block">
        <h3 class="register-title">Create an account</h3>
        <p>Quickly &amp; easily create an account using the form below.</p>
        <form action="">
          <input type="email" placeholder="Enter your email" />
          <input type="password" placeholder="Enter your password" />
          <input type="submit" value="Create my account" />
        </form>
      </div>
    </div>
    <div>
      <el-form>
        <el-form-item label="Email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">Submit</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
      <el-input placeholder="Enter your input"></el-input>
      <el-button @click="handleButtonClick">按钮测试</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "OneShow",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    handleButtonClick() {
      this.$tips({
        title: "确认删除",
        message: "您确定要删除这条记录吗？",
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
      })
        .then(() => {
          // 用户点击了确认按钮
          console.log("用户确认删除");
        })
        .catch((action) => {
          // 用户点击了取消按钮或关闭了对话框
          console.log("用户取消或关闭对话框", action);
        });
    },
  },
};
</script>

<style scoped>
/* For Vue 2 */
.el-form ::v-deep .el-form-item__label {
  color: red;
}

.register-wrapper {
  background-image: -webkit-linear-gradient(135deg, #0eeff0 30%, #088f90 90%);
  background-image: linear-gradient(135deg, #0eeff0 30%, #088f90 90%);
  position: relative;
  z-index: 3;
  padding: 100px;
  color: #999;
  font-size: 1rem;
}

.register-wrapper * {
  box-sizing: border-box;
}

.register-wrapper form input {
  display: inline-block;
  /* 将输入框设置为行内块元素，允许在同一行显示但可设置宽高 */
  width: 100%;
  /* 输入框宽度占父元素的100% */
  padding: 0 20px;
  /* 输入框内部左右各添加20px的内边距 */
  line-height: 50px;
  /* 行高设为50px，使文本在输入框中垂直居中 */
  height: 50px;
  /* 输入框高度设为50px */
  background-color: white;
  /* 输入框背景色设为白色 */
  border: solid 1px #e6e6e6;
  /* 输入框边框为1px实线，颜色为浅灰色 */
  border-bottom-width: 3px;
  /* 底部边框加粗至3px，创造立体效果 */
  border-radius: 5px;
  /* 边框圆角设为5px */
  -webkit-transition: all 0.3s ease;
  /* 为Safari浏览器添加过渡效果，持续0.3秒 */
  transition: all 0.3s ease;
  /* 标准过渡效果，使所有属性变化时有平滑动画，持续0.3秒 */
  outline: none;
  /* 移除输入框在焦点状态下的默认轮廓线 */
}

.register-wrapper form input:not(:last-child) {
  margin-bottom: 20px;
}

.register-wrapper form input[type="email"]:focus,
.register-wrapper form input[type="email"]:active,
.register-wrapper form input[type="password"]:focus,
.register-wrapper form input[type="password"]:active {
  border-color: #ccc;
  /* 输入框在焦点状态下的边框颜色设为浅蓝色 */
}

.register-wrapper form input[type="submit"] {
  position: relative;
  /* 重置按钮的定位属性，使其相对于父元素定位 */
  z-index: 1;
  /* 重置按钮的层级，使其在父元素的上方 */
  display: inline-block;
  /* 将按钮设置为行内块元素，允许在同一行显示但可设置宽高 */
  padding: 0 20px;
  /* 按钮内部左右各添加20px的内边距 */
  background-color: #f2395a;
  /* 按钮背景色设为红色 */
  background-size: 20px 20px;
  /* 背景图片大小设置为20px */
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    rgba(0, 0, 0, 0) 25%,
    rgba(0, 0, 0, 0) 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    rgba(0, 0, 0, 0) 75%,
    rgba(0, 0, 0, 0)
  );
  /* 设置按钮背景图片为渐变色 */
  border: solid 1px #f02146;
  /* 按钮边框为1px实线，颜色为深红色 */
  border-bottom-width: 3px;
  color: white;
  /* 按钮文本颜色设为白色 */
  outline: none;
  /* 移除按钮在焦点状态下的默认轮廓线 */
  cursor: pointer;
  /* 鼠标移动到按钮上时显示手型光标 */
  -webkit-transition: all 0.3s ease;
  /* 为Safari浏览器添加过渡效果，持续0.3秒 */
  transition: all 0.3s ease;
  /* 标准过渡效果，使所有属性变化时有平滑动画，持续0.3秒 */
}

.register-wrapper form input[type="submit"]:hover {
  background-size: 40px 40px;
}

.register-title {
  font-size: 1.6rem;
  padding-bottom: 20px;
  margin: 0 0 20px;
  border-bottom: dashed 0.0625rem #e6e6e6 /* 1/16 */;
}

.register-block {
  position: relative;
  display: block;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 30px;
  background: white;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

.register-block::before,
.register-block::after {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  width: 100%;
  height: 100%;
  content: "";
  background: white;
  border: solid 1px #e6e6e6;
  border-radius: 5px;
  -webkit-transform: scale(0.9) translate(0, 0);
  transform: scale(0.9) translate(0, 0);
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.register-block::after {
  transition-delay: 0.05s;
}

.register-block:hover::before {
  -webkit-transform: scale(0.96) translate(0, 16px);
  transform: scale(0.96) translate(0, 16px);
  z-index: -1;
}

.register-block:hover::after {
  -webkit-transform: scale(0.92) translate(0, 32px);
  transform: scale(0.92) translate(0, 32px);
  z-index: -2;
}
</style>