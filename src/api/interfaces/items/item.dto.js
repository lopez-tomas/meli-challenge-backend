import Joi from 'joi'

const id = Joi.string();
const title = Joi.string();
const price = Joi.object({
  currency: Joi.string(),
  amount: Joi.number(),
  decimals: Joi.number()
});
const picture = Joi.string();
const condition = Joi.bool();
const free_shipping = Joi.bool();
const sold_quantity = Joi.number();
const description = Joi.string();

const getItemSchema = Joi.object({
  id: id.required(),
})

export {
  getItemSchema,
}
