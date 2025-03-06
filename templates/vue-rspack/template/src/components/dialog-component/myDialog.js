import Vue from "vue";
import MyDialog from "./myDialog.vue";


const MyDialogs = Vue.extend(MyDialog);

MyDialog.install = function (data,propsData) {
    let instance = new MyDialogs({data,propsData}).$mount();
    document.body.appendChild(instance.$el);
    Vue.nextTick(() => {
        instance.visible = true;
    });
}

export default MyDialog;