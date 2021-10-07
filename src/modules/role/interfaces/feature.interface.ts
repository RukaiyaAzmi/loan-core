export interface FeatureAttrs {
  id?: number;
  featureName: string;
  featureNameBan: string;
  featureCode: string;
  url: string;
  type: string;
  position: string;
  iconId?: string;
  parentId?: string;
  isActive: string;
  createdBy?: string;
  createDate: Date;
  updatedBy?: string;
  updateDate?: Date;
}
