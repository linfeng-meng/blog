'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const viewsCounter = app.middleware.viewsCounter()
  const { router, controller, jwt } = app;
  const baseRouter = app.config.baseRouter
  // router.get('/', controller.home.index);
  router.post(baseRouter + '/admin/login', controller.admin.adminLogin);
  router.post(baseRouter + '/admin/logout', controller.admin.adminLogout);
  router.resources('articles', baseRouter + '/articles', jwt, controller.articles)
  router.put(
    baseRouter + "/articles/status/:id",
    jwt,
    controller.articles.changeStatus
  ); // 启用，停用
  router.put(
    baseRouter + "/articles/publishStatus/:id",
    jwt,
    controller.articles.changePublishStatus
  ); // 修改发布状态

  router.post(
    baseRouter + "/articles/collectStatus",
    jwt,
    controller.articles.changeCollectStatus
  ); // 一键开启或关闭收藏
  router.resources('tags', baseRouter + '/tags', jwt, controller.tags)
  router.resources('categories', baseRouter + '/categories', jwt, controller.categories)
  router.resources("about", baseRouter + "/about", jwt, controller.about); // 关于
  router.resources("user", baseRouter + "/user", jwt, controller.user); // 
  router.resources("comment", baseRouter + "/comment", jwt, controller.comment); // 评论管理
  router.resources("home",baseRouter + "/config/home",jwt,controller.config.home); // 网页配置-首页配置
  router.resources("hf", baseRouter + "/config/hf", jwt, controller.config.hf); // 网页配置-Header/Footer配置
  router.resources(
    "right_introduction",
    baseRouter + "/config/right/introduction",
    jwt,
    controller.config.right.introduction
  ); // 网页配置-侧栏配置-个人简介

  router.resources(
    "right_ad",
    baseRouter + "/config/right/ad",
    jwt,
    controller.config.right.ad
  ); // 网页配置-侧栏配置-广告设置

  router.resources(
    "right_recommend",
    baseRouter + "/config/right/recommend",
    jwt,
    controller.config.right.recommend
  ); // 网页配置-侧栏配置-推荐设置



  router.post(
    baseRouter + "/upload",
    jwt,
    controller.utils.uploadFiles
  ); // 上传文件到七牛云



  
  router.get("/api/web/header", controller.config.hf.index); 
  router.get("/api/web/home",controller.config.home.index); 
  router.get("/api/web/introduction",controller.config.right.introduction.index); 
  router.get("/api/web/advert",controller.config.right.ad.index); 
  router.get("/api/web/recommend",controller.config.right.recommend.index); 
  router.get("/api/web/archives",controller.articles.index); 
  router.get("/api/web/tags",controller.tags.index); 
  router.get("/api/web/tags/details",controller.tags.getDetails); 
  router.get("/api/web/categories",controller.categories.index); 
  router.get("/api/web/categories/details",controller.categories.getDetails); 
  router.get("/api/web/articles/details",viewsCounter,controller.articles.getDetails); 
  router.post("/api/web/articles/keyword",controller.articles.keyword); 
  router.post("/api/web/comment",controller.comment.create); 
  router.get("/api/web/comment/list",controller.comment.list); 
};

