
import { Service } from "typedi";
import { toSnakeCase } from 'keys-transform'
import { IFeatureAttrs } from "../interfaces/feature.interface";
import db from '../../../db/connection.db';
import { getPaginationDetails } from "../../../utils/pagination.util";
import { IPaginationResponse } from "../../../types/interfaces/pagination.interface";
import BadRequestError from "../../../errors/bad-request.error";
import { 
    buildInsertSql, 
    buildUpdateSql, 
    buildWhereAggrSql, 
    buildWhereSql 
} from "../../../utils/sql-builder.util";

@Service()
export default class FeatureService {
    constructor(
    ) { }
    // create a feature
    async create(data: IFeatureAttrs): Promise<IFeatureAttrs> {
        const { sql, params } = buildInsertSql('role.feature', { ...data });
        const pool = db.getConnection("master");
        const result = await pool.query(sql, params);
        return result.rows[0]
    }

    // get feature with pagination
    async get(page: number, limit: number, filter: IFeatureAttrs): Promise<IPaginationResponse> {
        const pool = db.getConnection("slave");
        const filterKeys = Object.keys(filter);
        if (filterKeys.length > 0) {

            //build where condition dynamically to get updated count value after filtering
            const { sql: countSql, params: countParams } = buildWhereAggrSql(
                "SELECT COUNT(*) AS total FROM role.feature",
                filter,
                this.injectionFilter
            )

            const totalCount = await (await pool.query(countSql, countParams)).rows[0].total;
            const pagination = getPaginationDetails(page, totalCount, limit);
            if (pagination === undefined) throw new BadRequestError("Page out of limit");

            //build where condition dynamically to get data after filtering
            const { sql, params } = buildWhereSql(
                "SELECT * FROM role.feature",
                filter,
                pagination.skip,
                pagination.limit,
                this.injectionFilter
            )
            const result = await pool.query(sql, params);
            return {
                limit: limit,
                currentPage: page,
                totalPages: pagination.total ?? 0,
                count: totalCount,
                data: result.rows
            }
        }
        else {
            const countRes = await pool.query("SELECT COUNT(*) AS total FROM role.feature");
            const totalCount: number = countRes.rows[0].total;
            const pagination = getPaginationDetails(page, totalCount, limit);

            if (pagination === undefined) throw new BadRequestError("Page out of limit");
            const sql = `
                SELECT * FROM role.feature 
                LIMIT $1 
                OFFSET $2
            `;
            const result = await pool.query(sql, [pagination.limit, pagination.skip]);
            return {
                limit: limit,
                currentPage: page,
                totalPages: pagination.total ?? 0,
                count: totalCount,
                data: result.rows
            }

        }
    }

    // update feature by id
    async update(id: number, data: IFeatureAttrs): Promise<IFeatureAttrs> {
        const { sql, params } = buildUpdateSql('role.feature', id, { ...data });
        const pool = db.getConnection("master");
        const result = await pool.query(sql, params);
        return result.rows[0]
    }

    // delete feature by id
    async delete(id: number): Promise<IFeatureAttrs> {
        const sql = `DELETE FROM role.feature WHERE id = $1 RETURNING *`;
        const pool = db.getConnection("master");
        const result = await pool.query(sql, [id]);
        return result.rows[0]
    }

    // keys injection filter
    injectionFilter(key: string): string {
        return toSnakeCase(key);
    }


}