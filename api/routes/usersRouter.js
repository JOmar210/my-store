const express = require('express');
const UsersService = require('../services/userService');
const validatorHandler = require('../middlewares/validator.handler');
const {createProductSchema, updateProductSchema, getProductSchema} = require('../schemas/product.schema');

const router = express.Router();
const service = new UsersService();

router.get('/',async (req,res)=>{
  const users=await service.find();
  res.json(users);
})

router.get('/:id',
  validatorHandler(getProductSchema,'params'),
  async (req,res)=>{
    const {id}=req.params;
    const user = await service.findOne(id);
    res.json(user);
})
router.post('/',
  validatorHandler(createProductSchema,'body'),
  async (req,res)=>{
    const body = req.body;
    const newUser=await service.create(body);
    res.status(201).json(newUser);
})
router.patch('/:id',
  validatorHandler(getProductSchema,'params'),
  validatorHandler(updateProductSchema,'body'),
  async (req,res)=>{
    try{
      const {id} = req.params;
      const body = req.body;
      const user = await service.update(id,body);
      res.json(user)
    }catch(error){
      res.status(404).json({
        message:error.message
      })
    }
})
router.delete('/:id',async (req,res)=>{
  const {id} = req.params;
  const user = await service.delete(id);
  res.json(user)
})
module.exports=router;
