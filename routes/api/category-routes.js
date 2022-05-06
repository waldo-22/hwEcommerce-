const router = require('express').Router();
const { Category, Product, Tag} = require('../../models');

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await category.findByPk(req.params.id, {
      include: [{ model: Category, through: Product, as: 'category_product'}]
    });
    if (!categoryData){
      res.status(404).json({ message: 'No category found with this id!'});
      return;
    }
    req.status(200).json(categoryData);
  }
  catch (err) { res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try{
    const categoryData = await Category.update(req.body);
    res.status(200).json(categoryData);    
  }
  catch (err) {res.status(400).json(err)}
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.delete({
      where: {
        id: req.params.id
      }
    });
    if (!tagData){
      res.status(404).json({ message: 'NO TAG'});
      return;
    }
    res.status(200).json(tagData);
  }
  catch (err) {res.status(500).json(err);
  }
});
module.exports = router;
