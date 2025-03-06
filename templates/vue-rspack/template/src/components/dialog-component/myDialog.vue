<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :width="width"
    :close-on-click-modal="closeOnClickModal"
    @close="handleClose"
  >
    <span>{{ message }}</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">{{ cancelButtonText }}</el-button>
      <el-button type="primary" @click="handleConfirm">{{ confirmButtonText }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'MyDialog',
  props: {
    title: {
      type: String,
      default: '提示'
    },
    message: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '30%'
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    confirmButtonText: {
      type: String,
      default: '确定'
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    handleConfirm() {
      this.visible = false
      this.$emit('confirm')
    },
    handleCancel() {
      this.visible = false
      this.$emit('cancel')
    },
    handleClose() {
      this.$emit('close')
    },
    show() {
      this.visible = true
    }
  }
}
</script>
