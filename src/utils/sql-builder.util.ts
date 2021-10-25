import { toSnakeKeys } from 'keys-transform'
import lo from 'lodash';


/**
 * build where condition dynamically
 */
export function buildWhereSql(
    sql: string,
    filter: Object,
    skip: number,
    limit: number,
    injectionFilter: Function,
    operator: "AND" | "OR" = "AND"
): {
    sql: string,
    params: any[]
} {
    let where: string = " WHERE";
    let params: any[] = [];
    let index = 0;
    for (let [key, value] of Object.entries(filter)) {
        const newKey = injectionFilter(key);
        if (index === lo.size(filter) - 1) where += ` ${newKey} = $${index + 1}`;
        else where += ` ${newKey} = $${index + 1} ${operator}`;
        params.push(value);
        index++;
    }
    sql += where;
    sql += ` ORDER BY id ASC LIMIT $${lo.size(filter) + 1} OFFSET $${lo.size(filter) + 2};`;
    params.push(limit, skip);
    return { sql, params };
}


/**
 * build aggregate where condition dynamically
 */
export function buildWhereAggrSql(
    sql: string,
    filter: Object,
    injectionFilter: Function,
    operator: "AND" | "OR" = "AND"
): {
    sql: string,
    params: any[]
} {
    let where: string = " WHERE";
    let params: any[] = [];
    let index = 0;
    for (let [key, value] of Object.entries(filter)) {
        const newKey = injectionFilter(key);
        if (index === lo.size(filter) - 1) where += ` ${newKey} = $${index + 1}`;
        else where += ` ${newKey} = $${index + 1} ${operator}`;
        params.push(value);
        index++;
    }
    sql += where + ";";
    return { sql, params };
}

/**
 * build insert statement dynamically
 */
export function buildInsertSql(tableName: string, data: Object): {
    sql: string,
    params: any[]
} {
    let attrs = "";
    let paramsStr = "";
    let sql = `INSERT INTO ${tableName} `;
    const snakeObject = toSnakeKeys(data);
    const params: any[] = [];
    let counter = 0;
    for (const [k, v] of Object.entries(snakeObject)) {
        attrs = attrs + `${k},`;
        paramsStr = paramsStr + `$${++counter},`
        params.push(v);
    }
    sql += `(${attrs.slice(0, -1)})` + " VALUES " + `(${paramsStr.slice(0, -1)})`;
    sql += ` RETURNING *;`

    return { sql, params }
}


/**
 * build update statement dynamically
 */
export function buildUpdateSql(tableName: string, id: number, data: Object): {
    sql: string,
    params: any[]
} {
    let attrs = "";
    let sql = `UPDATE ${tableName} SET `;
    const snakeObject = toSnakeKeys(data);
    const params: any[] = [];
    let counter = 0;
    for (const [k, v] of Object.entries(snakeObject)) {
        attrs += `${k} = $${++counter},`
        params.push(v);
    }
    sql += attrs.slice(0, -1);
    sql += ` WHERE id = $${++counter}`
    sql += ` RETURNING *;`
    params.push(id);

    return { sql, params }
}




