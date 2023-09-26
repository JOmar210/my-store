const express = require('express');
const CategoriesService = require('../services/categorieService');
const validatorHandler = require('../middlewares/validator.handler');
const {createProductSchema, updateProductSchema, getProductSchema} = require('../schemas/product.schema');

const router = express.Router();
const service = new CategoriesService();

router.get('/',async (req,res)=>{
  const categories=await service.find();
  res.json(categories);
})

router.get('/:id',
  validatorHandler(getProductSchema,'params'),
  async (req,res)=>{
    const {id}=req.params;
    const categorie = await service.findOne(id);
    res.json(categorie);
})
router.post('/',
  validatorHandler(createProductSchema,'body'),
  async (req,res)=>{
    const body = req.body;
    const newcategorie=await service.create(body);
    res.status(201).json(newcategorie);
})
router.patch('/:id',
  validatorHandler(getProductSchema,'params'),
  validatorHandler(updateProductSchema,'body'),
  async (req,res)=>{
    try{
      const {id} = req.params;
      const body = req.body;
      const categorie = await service.update(id,body);
      res.json(categorie)
    }catch(error){
      res.status(404).json({
        message:error.message
      })
    }
})
router.delete('/:id',async (req,res)=>{
  const {id} = req.params;
  const categorie = await service.delete(id);
  res.json(categorie)
})
module.exports=router;
