import { ChangeEvent } from "react";
import { Query } from "../../../../commons/types/generated/types";

export interface IProductNewUIProps {
  onChangeSeller: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeName: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeDetail: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangePrice: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickSubmit: () => void;
  onClickUpdate: () => void;
  data?: Pick<Query, "fetchProduct">;
  isActiveBtn: boolean;
  isEdit: boolean;
}

export interface IproductNewProps {
  data?: Pick<Query, "fetchProduct">;
  isEdit: boolean;
}

export interface IUpdateProductInput {
  name?: string;
  detail?: string;
  price?: number;
}

export interface ISubmitBtnProps {
  isActiveBtn: boolean;
}
