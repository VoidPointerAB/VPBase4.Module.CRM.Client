/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getVp_Template_Basics
// ====================================================

export interface getVp_Template_Basics_vp_Template_Basics {
  __typename: "VP_Template_BasicListType";
  /**
   * The id of the VP_Template_Basic.
   */
  vP_Template_BasicId: string;
  /**
   * The title of the VP_Template_Basic.
   */
  title: string;
}

export interface getVp_Template_Basics {
  vp_Template_Basics: getVp_Template_Basics_vp_Template_Basics[] | null;
}
