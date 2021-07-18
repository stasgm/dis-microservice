export interface DisResponse {
  resultCode: string;
  resultDescription?: string;
  disUid?: string;
}

export interface Document {
  number: string;
  date: Date;
  docType?: string;
  creator?: string;
  uid?: string;
  status?: string;
}

export interface DisApprovalResult {
  sourceUid?: string;
  disUid: string;
  result: string;
  reason?: string;
  regN?: string;
  regDate?: string;
  regTypeName: string;
}
