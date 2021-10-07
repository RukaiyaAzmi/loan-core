import { pgConnect } from "../../../db/factory/connection.db";
import { FeatureAttrs } from "../interfaces/feature.interface";

export const createFeature = async (f: FeatureAttrs) => {
  const { rows: feature } = await (
    await pgConnect.getConnection("master")
  ).query(
    `
      INSERT INTO role_schema.feature ( 
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
        updated_by) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *;
    `,
    [
      f.featureName,
      f.featureNameBan,
      f.featureCode,
      f.url,
      f.type,
      f.position,
      f.iconId,
      f.parentId,
      f.isActive,
      f.createdBy,
      f.updatedBy,
    ]
  );

  return feature[0];
};

export const checkExistingFeature = async (name: string, code: string) => {
  const { rows: feature } = await (
    await pgConnect.getConnection("master")
  ).query(
    `
        SELECT COUNT(id) 
        FROM role_schema.feature 
        WHERE feature_name = $1 
        OR feature_code = $2;
      `,
    [name, code]
  );

  return parseInt(feature[0].count) >= 1 ? true : false;
};

export const checkExistingFeatureById = async (id: number) => {
  const { rows: feature } = await (
    await pgConnect.getConnection("master")
  ).query(
    `
      SELECT COUNT(id) 
      FROM role_schema.feature
      WHERE id = $1
    `,
    [id]
  );

  return parseInt(feature[0].count) >= 1 ? true : false;
};
export async function deleteFeature(id: number) {
  console.log(id);
  await (
    await pgConnect.getConnection("master")
  ).query(
    "Delete FROM role_schema.feature where id= $1",
    [id]
  );
}

export async function totalFeatures() {
  const result = (await pgConnect.getConnection("slave")).query(
    "select count(feature_name) as total from role_schema.feature"
  );
  return Number((await result).rows[0].total);
}

export async function getfeaturesPagination(page: number, limit: number) {
  const features = (await pgConnect.getConnection("slave")).query(
    "SELECT * FROM role_schema.feature LIMIT $2 OFFSET (($1 - 1) * $2)",
    [page, limit]
  );
  return (await features).rows;
}

//feature service part by Nazmul haque
//
//

export async function IdCheck(id: string) {
  const count_parentID = await (
    await pgConnect.getConnection("master")
  ).query("select count(id) from role_schema.feature where id =$1", [id]);
  return count_parentID.rows[0].count;
}

export async function ParentKeyCheck(parent_id: string) {
  console.log(parent_id);
  const count_parentID = await (
    await pgConnect.getConnection("master")
  ).query("select count(id) from role_schema.feature where id =$1", [
    parent_id,
  ]);
  console.log(`parent check service ${count_parentID.rows[0].count}`);
  return count_parentID.rows[0].count;
}

export async function uniqueCheckUpdate(
  feature_name: string,
  feature_code: string,
  feature_id: number
) {
  const feature_name_count = await (
    await pgConnect.getConnection("master")
  ).query(
    "select count(feature_name) from role_schema.feature where feature_name= $1 and id !=$2",
    [feature_name, feature_id]
  );
  const feature_name_code = await (
    await pgConnect.getConnection("master")
  ).query(
    "select count(feature_code) from role_schema.feature where feature_code= $1 and id !=$2",
    [feature_code, feature_id]
  );
  console.log(feature_name_count.rows[0].count);
  return [feature_name_count.rows[0].count, feature_name_code.rows[0].count];
}

export async function updateFeature(
  id: number,
  feature_name: string,
  feature_name_ban: string,
  feature_code: string,
  url: string,
  type: string,
  position: string,
  icon_id: number,
  parent_id: number,
  is_active: string,
  created_by: string,
  updated_by: string
) {
  console.log("i am in service update function");
  // const querytext_find_id= "select id from role_schema.feature where feature_name=$1"
  // const id= await (await pgConnect.getConnection("master")).query( querytext_find_id,[feature_name]);
  const querytext_update =
    "UPDATE role_schema.feature SET feature_name=$1, feature_name_ban=$2, feature_code=$3,url=$4, type=$5, position=$6,icon_id=$7,parent_id=$8,is_active=$9,created_by=$10,updated_by=$11 WHERE id=$12  RETURNING id";

  const updateNotation = await (
    await pgConnect.getConnection("master")
  ).query(querytext_update, [
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
    id,
  ]);

  return updateNotation.rows[0].id;
}
//
//
//
//
