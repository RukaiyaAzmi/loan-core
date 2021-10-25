import express, { Router, Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import { validates } from '../../../middlewares/express-validation.middle';
import { wrap } from '../../../middlewares/wraps.middle';
import { IFeatureAttrs } from '../interfaces/feature.interface';
import devAuth from '../middlewares/dev-auth.middle';
import FeatureService from '../services/feature.service';
import {
    createFeature,
    deleteFeatrue,
    getFeatureWithFilter,
    updateFeature
} from '../validators/feature.validator';
import lo from 'lodash';
import BadRequestError from '../../../errors/bad-request.error';
import { authConf } from '../../../configs/auth.config';
import { IPaginationResponse } from '../../../types/interfaces/pagination.interface';



const router: Router = express.Router();


/**
 * Create Feature
 */
router.post('/',
    [devAuth, validates(createFeature)],
    wrap(async (req: Request, res: Response, next: NextFunction) => {
        const featureService: FeatureService = Container.get(FeatureService);
        const result: IFeatureAttrs | undefined = await featureService.create({
            ...req.body,
            createdBy: req.user.username
        });

        res.status(201).json({
            message: "Request Successful",
            data: {
                id: result?.id ?? null
            }
        });
    })
)

/**
 * Get Feature with filter
 */
router.get('/',
    [devAuth, validates(getFeatureWithFilter)],
    wrap(async (req: Request, res: Response, next: NextFunction) => {
        const featureService: FeatureService = Container.get(FeatureService);
        const filter = lo.omit(req.query, ['page', 'limit']);
        const result = await featureService.get(
            req.query.page as any,
            req.query.limit as any,
            filter
        )
        return res.status(200).json({
            message: "Request Successful",
            data: result
        })
    })
)


/**
 * Update feature attributes by id
 */
router.put('/:id',
    [devAuth, validates(updateFeature)],
    wrap(async (req: Request, res: Response, next: NextFunction) => {
        const featureService: FeatureService = Container.get(FeatureService);
        if (lo.size(req.body) > 0) {
            const result: IFeatureAttrs = await featureService.update(
                parseInt(req.params.id),
                { ...req.body, updatedBy: req.user.username, updateDate: new Date() }
            )
            return res.status(200).json({
                message: "Request Successful",
                data: {
                    id: result.id ?? null
                }
            })
        }
        next(new BadRequestError("No update field provided"))
    })
)


/**
 * Delete feature by id
 */
router.delete('/:id',
    [devAuth, validates(deleteFeatrue)],
    wrap(async (req: Request, res: Response, next: NextFunction) => {
        const featureService: FeatureService = Container.get(FeatureService);
        const result: IFeatureAttrs = await featureService.delete(parseInt(req.params.id));
        return res.status(200).json({
            message: "Request Successful",
            data: result.id ?? null
        })
    })
)

/**
 * Init features
 */
router.post('/init',
    [devAuth],
    wrap(async (req: Request, res: Response, next: NextFunction) => {
        const features: IFeatureAttrs[] = authConf.features;
        const featureService: FeatureService = Container.get(FeatureService);
        for (let f of features) {
            // inserting the roots
            if (f.parentId === null) {
                const result: IFeatureAttrs | undefined = await featureService.create({
                    ...f,
                    createdBy: req.user.username
                });
            }
            // inserting the childrens
            else {
                const parentRes: IPaginationResponse = await featureService.get(1, 1,
                    { featureName: f.parentId?.toString() }
                );
                const parent: IFeatureAttrs = parentRes.data[0];
                const result: IFeatureAttrs | undefined = await featureService.create({
                    ...f,
                    parentId: parent.id,
                    createdBy: req.user.username
                });

            }
        }

        return res.status(200).json({
            message: "Request Successful",
            data: null
        })

    })
)



export default router;