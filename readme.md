# 商家后台程序

##### 项目使用bower进行包管理

```
npm install bower -g
```

##### 安装依赖

```
bower install
```

##### 发布代码

```
npm install -g fis
npm install -g fis-angular
fisa release -cwL （本地开发通过nginx_cms代理发布）
fisa release -cwd remote （发布到远程或联调环境）
```

### 工程目录结构说明

	`public				       公共模块
	  +-- bower_components     模块依赖包
	  +-- lib				   模块加载器，第三方类库等
	  +-- directives           自建公用ng组件, 如搜索，选项卡等
	  +-- main                 app初始化入口
	  +-- services             http拦截器, 配置常量, 用户信息等
	  +-- styles           	   公共基础样式, 如body, table等
	`business				   业务模块
	  +-- main				   引入所需的业务模块
	  +-- services			   弹窗，接口请求等业务服务
	  +-- directives	 	   搜索，列表等业务组件
	  +-- router			   路由模块
	  +-- mirror               页面，菜单等模块	 

### 代码模块描述

	整个代码是通过angular开发，路由里面通过mod.js加载依赖文件，页面加载顺序是index.html -> public/main/app -> public/main/router -> business/mirror/router -> ......