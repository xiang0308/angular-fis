### ry-upload-btn

* 上传按钮组件

#### config配置

| 属性          | 类型     | 描述         |
| ------------- | -------- | ------------ |
| config        |          | object       |
| -> pattern    | string   | 后缀         |
| -> size       | int      | 大小         |
| -> width      | int      | 宽度         |
| -> height     | int      | 高度         |
| -> index      | int      | 索引         |
| -> ratio      | bool     | 按比率       |
| -> lock       | bool     | 是否锁死宽高 |
| -> onUpload   | function | 上传完毕掉用 |
| -> onError    | function | 上传失败     |
| -> onProgress | function | 上传进度条   |
|               |          |              |


#### code
```html
<ry-upload-btn config="{
    pattern: '.xls',
    size: '10MB',
    onUpload: vm.onUpload,
    onProgress: vm.onProgress
}">
    <a href="" class="btn btn-primary">
        导入模板
    </a>
</ry-upload-btn>
```

```javascript
vm.progress = {}
vm.onUpload = onUpload
vm.onProgress = onProgress

/**
 * [onUpload 上传完毕]
 * @param  {[type]} src   [description]
 * @param  {[type]} index [description]
 * @return {[type]}       [description]
 */
function onUpload(src, index) {
    vm.src = src;
}

/**
 * [onProgress 进度条]
 * @param  {[object]} obj   [{show: true, val: 90}]
 * @param  {[type]} index [description]
 * @return {[type]}       [description]
 */
function onProgress(obj, index) {
    vm.progress = obj;
}
```
