import { body } from "express-validator";

export const validateFeature = [
  body("featureName")
    .exists()
    .withMessage("field is required")
    .notEmpty()
    .withMessage("field cannot be null"),
  body("featureNameBan")
    .exists()
    .withMessage("field is required")
    .notEmpty()
    .withMessage("field cannot be null"),
  body("featureCode")
    .exists()
    .withMessage("field is required")
    .notEmpty()
    .withMessage("field cannot be null"),
  body("url")
    .exists()
    .withMessage("field is required")
    .notEmpty()
    .withMessage("field cannot be null"),
  body("iconId")
    .isLength({ max: 10 })
    .withMessage("Icon Id must be less than 11 digit"),
  body("type")
    .exists()
    .withMessage("field is required")
    .notEmpty()
    .withMessage("field cannot be null"),
  body("parentId").exists().withMessage("field is required"),
  body("position")
    .exists()
    .withMessage("field is required")
    .notEmpty()
    .withMessage("field cannot be null"),
  body("isActive")
    .exists()
    .withMessage("field is required")
    .notEmpty()
    .withMessage("field cannot be null"),
];
