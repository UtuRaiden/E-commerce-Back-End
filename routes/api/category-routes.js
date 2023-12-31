const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // it also pulls all the products that are associated with the category
 try{
  const categoryData = await Category.findAll({
    include:[{model: Product }],
  });
  res.status(200).json(categoryData);
 }catch (err) {
  res.status(500).json(err)
}
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
 // it also pulls all the products that are associated with the category
  try{
    const categoryData = await Category.findByPk(req.params.id,{
      include:[{model: Product }],
  });
  if (!categoryData){
    res.status(404).json({message: "No category with that ID!"})
    return;
  }
  res.status(200).json(categoryData);
  }catch (err){res.status(500).json(err)}
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((category)=>{
    res.status(200).json(category);
    console.log('new category created!');
  }).catch((err)=>{
    res.status(400).json(err)}
    )});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name:req.body.category_name,
  },
  {
  where: {
    id:req.params.id
  }}
  ).then((updatedCategory)=>{
    res.json(updatedCategory);
  }).catch((err)=>{
    res.status(400).json(err);
  })
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryDelete = await Category.destroy({
        where: {
            id: req.params.id,
        },
    });
    
    if (!categoryDelete) {
      res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
    
     res.status(200).json(categoryDelete);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
