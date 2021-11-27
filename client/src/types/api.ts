import { AxiosResponse } from "axios";

export interface Response<T, D = any> extends AxiosResponse<{ status: 1 } & T, D> {

}