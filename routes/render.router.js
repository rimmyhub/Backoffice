const express = require('express');
const router = express.Router();
const path = require('path');
const RestaurantsRepository = require('../repositories/restaurants.repository');
const restaurantsRepository = new RestaurantsRepository();
const UserController = require('../controllers/users.controller');
const userController = new UserController();
const OrdersController = require('../controllers/orders.controller');
const ordersController = new OrdersController();
const OwnerController = require('../controllers/owners.controller');
const ownerController = new OwnerController();
const RestaurantsController = require('../controllers/restaurants.controller');
const restaurantsController = new RestaurantsController();
const MenusController = require('../controllers/menus.controller');
const menusController = new MenusController();

// 음식점 전체 조회
router.get('/', async (req, res) => {
  // /restaurants?foodName=오리지널 버거 콤보
  const data = await restaurantsRepository.getAllRestaurant();
  res.render('index', { data });
});

// 특정 음식점 조회

//검색할때 쿼리 스트링

// 마이 페이지(유저)
router.get('/my-page-client', async (req, res) => {
  const user = await userController.getUser();
  const orders = await ordersController.getOrderClient();
  res.render('my-page-client', { user, orders });
});

// 마이 페이지(사장님)
router.get('/my-page-owner', async (req, res) => {
  // TO DO :: owner 로 넣으니까 오류가 떠서 일단 client로 작성함
  const user = await ownerController.getUser();
  const orders = await ordersController.getOrderClient();
  const data = await restaurantsController.getRestaurant();
  const get = await menusController.getMenu();
  res.render('my-page-owner', { user, orders, data, get });
});

module.exports = router;
