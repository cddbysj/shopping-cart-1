# Vue 2.0实现的简单购物车前端页面
## 说明
- 页面主要是仿照了淘宝的购物车页面
- 除去Vue外，没有使用其他的框架，如bootstrap等
- 通过这个项目熟悉了下列知识点：
    - Vue的常用指令，v-if, v-for, v-bind, v-on, v-model等
    - Vue的计算属性computed和过滤器filters的简单使用
    - 通过Vue的class和style绑定，实现class的切换
    - 使用Vue.set()方法添加临时属性以保持响应
    - 实现购物车中商品的单选与全选的业务逻辑
    - 实现购物车删除商品的业务逻辑
    - 利用Vue的双向数据绑定，实现总价格根据商品数量实时变化
    - 实现鼠标悬停在小图片上，在小图片旁边显示大图的功能
    - 实现限制商品数量的功能：css属性pointer-events设置为none，同时将文字设为透明色
    - 实现了购物车商品的批量删除功能
    - 初步实现收货地址信息页面
    - 收货地址信息页面：做了一个简单的地区选择器组件，省市区三级联动
        + 用到的Vue知识点
        + 简单了解v-model语法糖的实现原理
        + 侦听器watch的简单使用
        + 父子组件之间的通信，子组件通过事件$emit给父组件传递数据
            
## 后续待实现的功能
1. 添加一些过渡效果和动画，如删除时的过渡
2. 实现最下方浮动条的待实现功能：，移入收藏夹，分享等
3. 适配移动端，实现响应式布局
4. 优化资源加载方面的性能（鼠标悬停在商品预览图片上显示的大图，可以在页面加载完成后二次加载）
5. 收货地址页面：用户修改收货地址信息 
6. 收货地址页面：用户添加一个收货地址信息后，将数据发送至后台
7. 用户输入地址信息页面：表单数据校验
8. 设置默认收货地址

## 体验页面请点击下方
[点这里](https://cddbysj.github.io/shopping-cart-1/)
