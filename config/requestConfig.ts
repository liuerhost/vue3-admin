import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { dataType } from 'element-plus/es/components/table-v2/src/common';
import { da, pa } from 'element-plus/es/locale';


// 定义响应参数，不含data
interface Result {
    code: number,
    msg: string
}

// 定义响应参数，包含data
interface ResultData<T> extends Result {
    data?: T;
}

const URL: string = 'http://localhost:3000';

enum RequestEnums {
    TIMEOUT = 30000, // 响应超时时间
    OVERDUE = 600, // 登录失效
    FALL = 999, // 请求失败
    SUCCESS = 200, // 请求成功
}

const config = {
    baseURL: URL as string, // 默认地址
    timeout: RequestEnums.TIMEOUT as number,// 请求30s超时
    withCredentials: true // 跨域允许携带cookie凭证
}

if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:3000';
} else if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = 'http://prod.xxx.com';
}


class RequestHttp {
    service: AxiosInstance; // 定义成员变量并指定类型

    public constructor(config: AxiosRequestConfig) {
        this.service = axios.create(config);

        /**
         * 请求拦截器
         * 客户端发送请求-> 请求拦截器 -> 服务器
         * token校验
         */
        this.service.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                const token = localStorage.getItem('token') || '';
                return {
                    ...config,
                    headers: {
                        // 'x-access-token': token,
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }
            },
            (error: AxiosError) => {
                Promise.reject(error);
            }
        );

        /**
         * 响应拦截器
         * 服务器返回信息 -> 拦截器统一处理 -> 客户端收到信息
         */
        this.service.interceptors.response.use(
            (response: AxiosResponse) => {
                const { data, config } = response;
                // 登录信息失效 
                if (data.code === RequestEnums.OVERDUE) {
                    localStorage.setItem('token', '');
                    return Promise.reject(data);
                }
                // 错误信息拦截
                if (data.code && data.code !== RequestEnums.SUCCESS) {
                    ElMessage.error(data);
                    return Promise.reject(data);
                }
                return data;
            },
            (error: AxiosError) => {
                const { response } = error;
                if (response) {
                    this.handleCode(response.status);
                }
                if (!window.navigator.onLine) {
                    ElMessage.error('网络连接失败！');
                    // 也可以跳转到错误页面
                    // return router.replace({
                    //     path: '/404'
                    // })
                }
            }
        )
    }
    handleCode(code: number): void {
        switch (code) {
            case 400:
                ElMessage.error('错误的请求'); break;
            case 401:
                ElMessage.error('未授权，请重新登录'); break;
            case 403:
                ElMessage.error('拒绝访问'); break;
            case 404:
                ElMessage.error('资源未找到'); break;
            default:
                ElMessage.error('请求失败！');
        }
    }

    // 常用封装方法
    get<T>(url: string, params?: object): Promise<ResultData<T>> {
        return this.service.get(url, { params });
    }

    post<T>(url: string, params?: object): Promise<ResultData<T>> {
        return this.service.post(url, params);
    }

    put<T>(url: string, params?: object): Promise<ResultData<T>> {
        return this.service.put(url, params);
    }

    delete<T>(url: string, params?: object): Promise<ResultData<T>> {
        return this.service.delete(url, { params });
    }
}

export default new RequestHttp(config);