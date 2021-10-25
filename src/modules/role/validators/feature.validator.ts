import { body, param, query } from "express-validator";


export const createFeature = [
    body('featureName', "Name must be in range 1 to 50 characters")
        .isLength({ min: 1, max: 50 }).trim(),
    body('featureNameBan', "Name must be in range 1 to 50 characters")
        .isLength({ min: 1, max: 50 }).trim(),
    body('featureCode', "Code must be min 1 character")
        .isLength({ min: 1 }).trim(),
    body('url', "URL must be min 3 character")
        .isLength({ min: 3 }).trim(),
    body('isRoot', "isRoot must be an boolean value")
        .isBoolean(),
    body('type', "Allowed type P, C")
        .isIn(["P", "C"]),
    body('position', "Allowed position SIDE, NAV, CONT")
        .isIn(["SIDE", "NAV", "CONT"]),
    body('iconId', "Icon Id must be min 1 character")
        .isLength({ min: 1 }).trim(),
    body('parentId')
        .isInt({ min: 1 }).optional({ nullable: true }),
    body('isActive')
        .isBoolean()

]

export const getFeatureWithFilter = [
    query('page', "Invalid page number provided")
        .isInt({ min: 1 }),
    query('limit', "Invalid page number provided")
        .optional().isInt({ min: 1 }),
    query('id', "Invalid id number provided")
        .optional().isInt({ min: 1 }),
    query('featureName', "Name must be in range 1 to 50 characters")
        .optional().isLength({ min: 1, max: 50 }).trim(),
    query('featureCode', "Code must be min 1 character")
        .optional().isLength({ min: 1 }).trim(),
    query('url', "URL must be min 3 character")
        .optional().isLength({ min: 3 }).trim().optional(),
    query('isRoot', "isRoot must be an boolean value")
        .optional().isBoolean(),
    query('type', "Allowed type P, C")
        .optional().isIn(["P", "C"]).optional(),
    query('position', "Allowed position SIDE, NAV, CONT")
        .optional().isIn(["SIDE", "NAV", "CONT"]).optional(),
    query('parentId')
        .optional().isInt({ min: 1 }).optional({ nullable: true }),
    query('isActive')
        .optional().isBoolean().optional()
]


export const updateFeature = [
    param('id', "Invalid id number provided")
        .isInt({ min: 1 }),
    body('featureName', "Name must be in range 1 to 50 characters")
        .optional().isLength({ min: 1, max: 50 }).trim(),
    body('featureNameBan', "Name must be in range 1 to 50 characters")
        .optional().isLength({ min: 1, max: 50 }).trim(),
    body('featureCode', "Code must be min 1 character")
        .optional().isLength({ min: 1 }).trim(),
    body('url', "URL must be min 3 character")
        .optional().isLength({ min: 3 }).trim(),
    body('isRoot', "isRoot must be an boolean value")
        .optional().isBoolean(),
    body('type', "Allowed type P, C")
        .optional().isIn(["P", "C"]),
    body('position', "Allowed position SIDE, NAV, CONT")
        .optional().isIn(["SIDE", "NAV", "CONT"]),
    body('iconId', "Icon Id must be min 1 character")
        .optional().isLength({ min: 1 }).trim(),
    body('parentId')
        .optional().isInt({ min: 1 }).optional({ nullable: true }),
    body('isActive')
        .optional().isBoolean()
]


export const deleteFeatrue = [
    param('id', "Invalid id number provided")
        .isInt({ min: 1 })
]