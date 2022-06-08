const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json({message: `Category Posted`});
  } catch (err) {
    res.status(400).json(err);
  }
});
router.put('/:id', async (req, res) => {
  try {
    Category.update(req.body, {
      where: {id:req.params.id},
  }).then(function(updateCategory) {
  res.json({message: `Category Updated`})
  })
} catch (err) {
  res.status(500).json(err);
}
});
router.delete('/:id',  async (req, res) => {
  try {
    const categoriesData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoriesData) {
      res.status(404).json({ message: 'Category Deleted!' });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
