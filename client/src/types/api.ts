import { AxiosResponse } from "axios";

export interface Response<T, D = any> extends AxiosResponse<{ status: number } & T, D> {

}