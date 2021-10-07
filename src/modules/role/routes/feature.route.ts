import express, { Router, Request, Response, NextFunction } from "express";
import { BadRequestError } from "../../../errors/bad-request.error";
import { validateRequest } from "../../../middlewares/validate-request.middle";
import { validateFeature } from "../validators/feature.validator";
import { NotFoundError } from "../../../errors/not-found.error";
import {
  checkExistingFeature,
  checkExistingFeatureById,
  createFeature,
  deleteFeature,
  totalFeatures,
  getfeaturesPagination,
  updateFeature,
} from "../services/feature.service";
import { FeatureAttrs } from "../interfaces/feature.interface";
import { pageCheck } from "../middlewares/pageCheck.middle";
import { IdCheckValidation } from "../middlewares/idcheck.middle";
import { UniqueCheckValidationUpdate } from "../middlewares/uniqueCheck.middle";
import { ParentIdCheckValidation } from "../middlewares/ParentIdCheck.middle";
import { Paginate } from "../../../utils/pagination.utils";

const router: Router = express.Router();

/**
 * Feature Table is Responsible for Application Feature Registration and Management
 * PARENT ID: 1
 */

/**
 * Create Feature
 * CHILD ID: 1.1
 */
router.post(
  "/",
  validateFeature,
  validateRequest,
  async (
    req: Request<unknown, unknown, FeatureAttrs>,
    res: Response,
    next: NextFunction
  ) => {
    // implementation
    const { featureName, featureCode, parentId } = req.body;

    if (await checkExistingFeature(featureName, featureCode)) {
      throw new BadRequestError("Feature exists");
    }

    if (parentId && !(await checkExistingFeatureById(Number(parentId)))) {
      throw new NotFoundError("parentId not found");
    }

    //change later
    const createdBy = "admin";
    const updatedBy = "admin";

    const feature = await createFeature({
      ...req.body,
      createdBy,
      updatedBy,
    });

    res
      .status(201)
      .send({ message: "Feature created successfully", id: feature.id });
  }
);

/**
 * Updtae Feature
 * CHILD ID: 1.2
 */
router.put(
  "/:id",
  IdCheckValidation,
  validateFeature,
  UniqueCheckValidationUpdate,
  ParentIdCheckValidation,
  async (req: Request, res: Response, next: NextFunction) => {
    // implementation
    const {
      feature_name,
      feature_name_ban,
      feature_code,
      url,
      type,
      position,
      icon_id,
      parent_id,
      is_active,
      created_by,
      updated_by,
    } = req.body;

    const id: number = parseInt(req.params.id); // we can use +req.params.id
    const update = await updateFeature(
      id,
      feature_name,
      feature_name_ban,
      feature_code,
      url,
      type,
      position,
      icon_id,
      parent_id,
      is_active,
      created_by,
      updated_by
    );
    return res.status(200).json({
      message: "User Updated Successfully",
      id: update,
    });
  }
);
/**
 * Create Feature
 * CHILD ID: 1.3
 */
router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    // implementation
    const { id } = req.params;
    if (!(await checkExistingFeatureById(Number(id)))) {
      const err = new NotFoundError("Feature not found");
      return res.status(400).json({
        message: err.message,
      });
    }
    try {
      const feature = await deleteFeature(Number(id));
      return res.status(200).json({
        message: "Feature Deleted Successfully",
        id: id,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Can not delete"
      })
    }
  }
);

/**
 * Create Feature
 * CHILD ID: 1.4
 */
router.get(
  "/",
  pageCheck,
  async (req: Request, res: Response, next: NextFunction) => {
    const page: number = Number(req.query.page || "1");
    const limit: number = Number(req.query.limit || "3");
    const count = await totalFeatures();
    //console.log("Total: " + count);
    const featureList = await getfeaturesPagination(page, limit);
    const pagination = new Paginate(count, limit, page);
    return res.status(200).json({
      message: "Request Successfull",
      ...pagination,
      data: featureList,
    });
  }
);

export default router;
// function UpdateValidateFeature(arg0: string, IdCheckValidation: (req: express.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: express.Response<any, Record<string, any>>, next: express.NextFunction) => Promise<...>, UpdateValidateFeature: any, UniqueCheckValidationUpdate: any, ParentIdCheckValidation: any, arg5: (req: Request, res: Response, next: NextFunction) => Promise<express.Response<any, Record<string, any>>>) {
//   throw new Error("Function not implemented.");
// }
